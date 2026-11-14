import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AlphabetGrid } from './components/alphabet-grid';
import { AlphabetStage } from './components/alphabet-stage';
import { PhonicsExplorer } from './components/phonics-explorer';
import { StudioDeck } from './components/studio-deck';
import { AlphabetAudio } from './core/alphabet-audio';
import {
  DisplayMode,
  LetterTiming,
  ThemeId,
  VIDEO_DURATION_SEC,
  VoiceId,
  getLetterCenterTime,
  getPlaybackPhase,
} from './core/alphabet-data';
import {
  CourseId,
  PHONICS_COURSES,
  PhonicsWord,
  getPhonicsCourse,
} from './core/phonics-courses';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [MatIconModule, AlphabetStage, StudioDeck, AlphabetGrid, PhonicsExplorer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly audio = inject(AlphabetAudio);

  private readonly stageRef = viewChild(AlphabetStage);

  readonly currentTimeSec = signal(1.45);
  readonly isPlaying = signal(false);
  readonly themeId = signal<ThemeId>('meadow');
  readonly voiceId = signal<VoiceId>('Kore');
  readonly displayMode = signal<DisplayMode>('letter-word');
  readonly musicEnabled = signal(true);
  readonly musicVolume = signal(0.25);

  readonly isExporting = signal(false);
  readonly exportStatus = signal('Préparation de la vidéo…');
  readonly exportError = signal<string | null>(null);
  readonly lastExportUrl = signal<string | null>(null);

  readonly activeIndex = computed(() => {
    const phase = getPlaybackPhase(
      this.audio.timings(),
      this.currentTimeSec(),
      VIDEO_DURATION_SEC,
    );
    return phase.activeIndex;
  });

  readonly activeLetterItem = computed(() => {
    const phase = getPlaybackPhase(
      this.audio.timings(),
      this.currentTimeSec(),
      VIDEO_DURATION_SEC,
    );
    return phase.item;
  });

  readonly activeSection = signal<'alphabet' | CourseId>('alphabet');
  readonly phonicsCourses = PHONICS_COURSES;
  readonly selectedLessonByCourse = signal<Record<CourseId, string>>({
    A: 'a-magic-e',
    E: 'e-ee',
    I: 'i-magic-e',
    O: 'o-magic-e',
    U: 'u-magic-e',
    Y: 'y-beginning',
  });

  readonly activePhonicsCourse = computed(() => {
    const section = this.activeSection();
    return getPhonicsCourse(section === 'alphabet' ? 'A' : section);
  });

  readonly activePhonicsLessonId = computed(() => {
    const course = this.activePhonicsCourse();
    return this.selectedLessonByCourse()[course.id];
  });

  private rafId: number | null = null;
  private playStartPerfMs = 0;
  private playStartOffsetSec = 0;

  constructor() {
    if (this.isBrowser) {
      const params = new URLSearchParams(window.location.search);
      const courseParam = params.get('course')?.toUpperCase();
      if (
        courseParam === 'A' ||
        courseParam === 'E' ||
        courseParam === 'I' ||
        courseParam === 'O' ||
        courseParam === 'U' ||
        courseParam === 'Y'
      ) {
        this.activeSection.set(courseParam);
      } else if (params.get('autostart') === '1') {
        setTimeout(() => {
          void this.startFromBeginning();
        }, 120);
      }
    }
  }

  ngOnDestroy(): void {
    this.stopRaf();
    this.audio.stopPlayback();
    const prevUrl = this.lastExportUrl();
    if (this.isBrowser && prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
  }

  async onTogglePlay(): Promise<void> {
    if (this.isPlaying()) {
      this.pausePlayback();
      return;
    }

    const startOffset =
      this.currentTimeSec() >= VIDEO_DURATION_SEC - 0.15 ? 0 : this.currentTimeSec();
    await this.playFrom(startOffset);
  }

  async startFromBeginning(): Promise<void> {
    this.currentTimeSec.set(0);
    await this.playFrom(0);
  }

  async onRestart(): Promise<void> {
    await this.startFromBeginning();
  }

  async onSeek(seconds: number): Promise<void> {
    const clamped = Math.max(0, Math.min(VIDEO_DURATION_SEC, seconds));
    const wasPlaying = this.isPlaying();
    this.currentTimeSec.set(clamped);

    if (wasPlaying) {
      await this.playFrom(clamped);
    } else {
      this.audio.stopSingleLetter();
    }
  }

  async onSelectLetter(item: LetterTiming): Promise<void> {
    this.pausePlayback();
    const target = Math.min(VIDEO_DURATION_SEC - 0.1, getLetterCenterTime(item));
    this.currentTimeSec.set(target);
    await this.audio.playSingleLetter(item.letter, this.voiceId());
  }

  async onSpeakActiveLetter(item: LetterTiming): Promise<void> {
    this.pausePlayback();
    await this.audio.playSingleLetter(item.letter, this.voiceId());
  }

  onSelectSection(section: 'alphabet' | CourseId): void {
    if (this.activeSection() === section) return;
    this.pausePlayback();
    this.activeSection.set(section);
  }

  onOpenCoursesMenu(): void {
    if (this.activeSection() === 'alphabet') {
      this.onSelectSection('A');
    }
  }

  onSelectPhonicsLesson(lessonId: string): void {
    const courseId = this.activePhonicsCourse().id;
    this.audio.stopPhonics();
    this.selectedLessonByCourse.update((prev) => ({ ...prev, [courseId]: lessonId }));
  }

  async onSpeakPhonicsWord(payload: {
    key: string;
    word: string;
    spokenText: string;
  }): Promise<void> {
    this.pausePlayback();
    await this.audio.speakPhonicsText(payload.key, payload.spokenText, this.voiceId(), 'word');
  }

  async onSpeakPhonicsRule(payload: { key: string; spokenText: string }): Promise<void> {
    this.pausePlayback();
    await this.audio.speakPhonicsText(payload.key, payload.spokenText, this.voiceId(), 'rule');
  }

  async onSpeakPhonicsException(payload: { key: string; spokenText: string }): Promise<void> {
    this.pausePlayback();
    await this.audio.speakPhonicsText(payload.key, payload.spokenText, this.voiceId(), 'exception');
  }

  async onPlayAllPhonicsExamples(words: PhonicsWord[]): Promise<void> {
    this.pausePlayback();
    const items = words.map((item) => ({
      key: `word:${item.word}`,
      word: item.word,
      spokenText: item.spokenText ?? item.word,
    }));
    await this.audio.playPhonicsSequence(items, this.voiceId(), () => undefined);
  }

  onStopPhonicsAudio(): void {
    this.audio.stopPhonics();
  }

  onSelectTheme(id: ThemeId): void {
    this.themeId.set(id);
  }

  async onSelectVoice(id: VoiceId): Promise<void> {
    if (this.voiceId() === id) return;
    const wasPlaying = this.isPlaying();
    this.pausePlayback();
    this.voiceId.set(id);
    if (this.activeSection() === 'alphabet') {
      await this.audio.ensureLoaded(id, true);
      if (wasPlaying) {
        await this.playFrom(this.currentTimeSec());
      }
    }
  }

  async onRegenerateVoice(): Promise<void> {
    const wasPlaying = this.isPlaying();
    this.pausePlayback();
    await this.audio.ensureLoaded(this.voiceId(), true);
    if (wasPlaying) {
      await this.playFrom(this.currentTimeSec());
    }
  }

  onSelectDisplayMode(mode: DisplayMode): void {
    this.displayMode.set(mode);
  }

  onToggleMusic(): void {
    const next = !this.musicEnabled();
    this.musicEnabled.set(next);
    this.audio.updateMusicMix(next, this.musicVolume());
  }

  onChangeMusicVolume(volume: number): void {
    this.musicVolume.set(volume);
    if (volume > 0 && !this.musicEnabled()) {
      this.musicEnabled.set(true);
    }
    this.audio.updateMusicMix(this.musicEnabled(), volume);
  }

  async onExportMp4(): Promise<void> {
    if (!this.isBrowser || this.isExporting()) return;

    if (this.activeSection() !== 'alphabet') {
      this.onSelectSection('alphabet');
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const stage = this.stageRef();
    if (!stage) return;

    this.isExporting.set(true);
    this.exportError.set(null);

    try {
      this.exportStatus.set('Préparation de la voix…');
      await this.audio.ensureLoaded(this.voiceId());

      this.exportStatus.set('Rendu des images (30s)…');
      const frames = await stage.renderFramesForExport(6);
      if (frames.length === 0) {
        throw new Error('Impossible de générer les images vidéo.');
      }

      this.exportStatus.set('Encodage MP4 HD…');
      const response = await fetch('/api/alphabet/export-mp4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          frames,
          fps: 6,
          voice: this.voiceId(),
          includeMusic: this.musicEnabled(),
          musicVolume: this.musicVolume(),
        }),
      });

      if (!response.ok) {
        const errBody = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(errBody.error || `Erreur d'export MP4 (${response.status})`);
      }

      const blob = await response.blob();
      const prevUrl = this.lastExportUrl();
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
      const url = URL.createObjectURL(blob);
      this.lastExportUrl.set(url);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'english-alphabet-30s.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      this.exportError.set(
        err instanceof Error ? err.message : "Échec de l'exportation vidéo.",
      );
    } finally {
      this.isExporting.set(false);
    }
  }

  private async playFrom(offsetSec: number): Promise<void> {
    if (!this.isBrowser) return;

    this.audio.stopSingleLetter();
    await this.audio.ensureLoaded(this.voiceId());
    this.stopRaf();

    this.playStartOffsetSec = offsetSec;
    this.playStartPerfMs = performance.now();
    this.isPlaying.set(true);
    this.audio.startPlayback(offsetSec, this.musicEnabled(), this.musicVolume());

    const tick = (nowMs: number) => {
      if (!this.isPlaying()) return;
      const elapsedSec = (nowMs - this.playStartPerfMs) / 1000;
      const nextTime = this.playStartOffsetSec + elapsedSec;

      if (nextTime >= VIDEO_DURATION_SEC) {
        this.currentTimeSec.set(VIDEO_DURATION_SEC);
        this.pausePlayback();
        return;
      }

      this.currentTimeSec.set(nextTime);
      const phase = getPlaybackPhase(this.audio.timings(), nextTime, VIDEO_DURATION_SEC);
      if (phase.phase === 'letter') {
        this.audio.maybeSpeakFallbackLetter(phase.activeIndex, phase.item);
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private pausePlayback(): void {
    this.isPlaying.set(false);
    this.stopRaf();
    this.audio.stopPlayback();
  }

  private stopRaf(): void {
    if (this.isBrowser && this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
