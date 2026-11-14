import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  DisplayMode,
  LetterTiming,
  ThemeId,
  VIDEO_DURATION_SEC,
  VIDEO_THEMES,
  formatTimecode,
  getPlaybackPhase,
} from '../core/alphabet-data';
import { renderAlphabetFrame } from '../core/alphabet-renderer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-alphabet-stage',
  imports: [MatIconModule],
  template: `
    <section
      aria-label="Lecteur vidéo de l'alphabet anglais"
      class="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5"
    >
      <div
        #stageFrame
        class="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200/80 bg-stone-100"
      >
        <canvas
          #videoCanvas
          data-testid="alphabet-canvas"
          width="1280"
          height="720"
          class="block h-full w-full object-cover"
        ></canvas>

        @if (isLoadingVoice()) {
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-xs"
            role="status"
            aria-live="polite"
          >
            <mat-icon class="animate-spin text-emerald-700">autorenew</mat-icon>
            <p class="text-sm font-medium text-slate-800">
              Préparation de la voix apaisante en anglais…
            </p>
          </div>
        }
      </div>

      <!-- Transport & Scrubbing Controls -->
      <div class="mt-4 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <span
            class="w-12 shrink-0 text-xs font-semibold text-slate-700 tabular-nums"
            data-testid="timecode-current"
          >
            {{ formattedCurrentTime() }}
          </span>

          <div class="relative flex flex-1 items-center">
            <input
              type="range"
              min="0"
              [max]="durationSec"
              step="0.05"
              [value]="currentTimeSec()"
              (input)="onScrubInput($event)"
              aria-label="Position temporelle de la vidéo sur 30 secondes"
              class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            />
          </div>

          <span
            class="w-12 shrink-0 text-right text-xs font-medium text-slate-500 tabular-nums"
          >
            {{ formattedTotalTime }}
          </span>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="togglePlay.emit()"
              [disabled]="isLoadingVoice()"
              data-testid="play-pause-btn"
              class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
            >
              <mat-icon>{{ isPlaying() ? 'pause' : 'play_arrow' }}</mat-icon>
              <span>{{ isPlaying() ? 'Mettre en pause' : 'Lire la vidéo' }}</span>
            </button>

            <button
              type="button"
              (click)="restart.emit()"
              aria-label="Recommencer la vidéo depuis le début"
              class="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
            >
              <mat-icon>replay</mat-icon>
              <span class="hidden sm:inline">Recommencer</span>
            </button>

            @if (activeLetterItem(); as item) {
              <button
                type="button"
                (click)="speakActiveLetter.emit(item)"
                [disabled]="isLoadingVoice() || isLoadingSingleLetter() === item.letter"
                [attr.aria-label]="'Lire uniquement la voix de la lettre ' + item.letter"
                data-testid="speak-single-btn"
                class="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2.5 text-sm font-medium text-emerald-900 transition-colors duration-150 hover:bg-emerald-100/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                <mat-icon [class]="isLoadingSingleLetter() === item.letter ? 'animate-spin' : ''">
                  {{ isLoadingSingleLetter() === item.letter ? 'autorenew' : 'record_voice_over' }}
                </mat-icon>
                <span>Écouter {{ item.letter }}</span>
              </button>
            }
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="toggleMusic.emit()"
              [attr.aria-pressed]="musicEnabled()"
              aria-label="Activer ou couper la berceuse douce"
              class="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
            >
              <mat-icon>{{ musicEnabled() ? 'music_note' : 'music_off' }}</mat-icon>
              <span>{{ musicEnabled() ? 'Berceuse' : 'Sans musique' }}</span>
            </button>

            <button
              type="button"
              (click)="toggleFullscreen()"
              aria-label="Afficher le lecteur en plein écran"
              class="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 shrink-0"
            >
              <mat-icon>fullscreen</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Quiet unboxed metadata caption line (Zero-Pill Rule) -->
      <div
        class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600"
      >
        <div class="flex items-center gap-2" data-testid="stage-caption">
          <span class="font-semibold text-slate-800">{{ currentPhaseCaption() }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ theme().label }}</span>
          <span aria-hidden="true">·</span>
          <span class="tabular-nums">Format 16:9 HD · 30s</span>
        </div>

        <div class="flex items-center gap-2 text-slate-500" data-testid="stage-voice-status">
          @if (isLoadingSingleLetter(); as loadingL) {
            <span class="font-medium text-emerald-800">Préparation de la lettre {{ loadingL }}…</span>
          } @else if (speakingSingleLetter(); as speakingL) {
            <span class="font-medium text-emerald-800">Lecture seule : lettre {{ speakingL }}</span>
          } @else if (voiceSource() === 'gemini-tts') {
            <span>Voix anglaise apaisante Gemini prête</span>
          } @else if (voiceSource() === 'fallback') {
            <span class="text-amber-700">Mode berceuse et synthèse locale actif</span>
          } @else {
            <span>Appuyez sur Lire ou cliquez une lettre</span>
          }
        </div>
      </div>

      @if (voiceError()) {
        <p class="mt-2 break-words text-xs text-amber-700" role="status">
          {{ voiceError() }}
        </p>
      }
    </section>
  `,
})
export class AlphabetStage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly currentTimeSec = input.required<number>();
  readonly isPlaying = input.required<boolean>();
  readonly isLoadingVoice = input.required<boolean>();
  readonly voiceSource = input.required<'idle' | 'gemini-tts' | 'fallback'>();
  readonly voiceError = input<string | null>(null);
  readonly timings = input.required<LetterTiming[]>();
  readonly themeId = input.required<ThemeId>();
  readonly displayMode = input.required<DisplayMode>();
  readonly musicEnabled = input.required<boolean>();
  readonly activeLetterItem = input<LetterTiming | null>(null);
  readonly isLoadingSingleLetter = input<string | null>(null);
  readonly speakingSingleLetter = input<string | null>(null);

  readonly togglePlay = output<void>();
  readonly restart = output<void>();
  readonly seek = output<number>();
  readonly toggleMusic = output<void>();
  readonly speakActiveLetter = output<LetterTiming>();

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('videoCanvas');
  private readonly stageFrameRef = viewChild<ElementRef<HTMLDivElement>>('stageFrame');

  readonly durationSec = VIDEO_DURATION_SEC;
  readonly formattedTotalTime = formatTimecode(VIDEO_DURATION_SEC);

  private readonly loadedImages = signal<Partial<Record<ThemeId, HTMLImageElement>>>({});

  readonly theme = computed(() => VIDEO_THEMES[this.themeId()]);
  readonly formattedCurrentTime = computed(() => formatTimecode(this.currentTimeSec()));

  readonly currentPhaseCaption = computed(() => {
    const p = getPlaybackPhase(this.timings(), this.currentTimeSec(), VIDEO_DURATION_SEC);
    if (p.phase === 'intro') {
      return 'Introduction · The English Alphabet';
    }
    if (p.phase === 'outro') {
      return 'Conclusion · A to Z';
    }
    if (p.item) {
      return `Lettre ${p.item.letter} ${p.item.lowercase} · ${p.item.word}`;
    }
    return 'The English Alphabet';
  });

  constructor() {
    if (this.isBrowser) {
      this.preloadBackdrops();
    }

    effect(() => {
      const timeSec = this.currentTimeSec();
      const timings = this.timings();
      const theme = this.theme();
      const displayMode = this.displayMode();
      const images = this.loadedImages();
      const canvas = this.canvasRef()?.nativeElement;

      if (!this.isBrowser || !canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      renderAlphabetFrame(ctx, canvas.width, canvas.height, {
        timeSec,
        timings,
        theme,
        displayMode,
        backdropImage: images[theme.id] ?? null,
      });
    });
  }

  private preloadBackdrops(): void {
    (Object.keys(VIDEO_THEMES) as ThemeId[]).forEach((id) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        this.loadedImages.update((prev) => ({ ...prev, [id]: img }));
      };
      img.src = VIDEO_THEMES[id].imagePath;
    });
  }

  onScrubInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    if (!Number.isNaN(value)) {
      this.seek.emit(value);
    }
  }

  toggleFullscreen(): void {
    if (!this.isBrowser) return;
    const el = this.stageFrameRef()?.nativeElement;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (el.requestFullscreen) {
      void el.requestFullscreen();
    }
  }

  async renderFramesForExport(fps = 6): Promise<string[]> {
    if (!this.isBrowser) return [];
    const offscreen = document.createElement('canvas');
    offscreen.width = 1280;
    offscreen.height = 720;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return [];

    const totalFrames = VIDEO_DURATION_SEC * fps;
    const timings = this.timings();
    const theme = this.theme();
    const displayMode = this.displayMode();
    const backdrop = this.loadedImages()[theme.id] ?? null;

    const frames: string[] = [];
    for (let f = 0; f < totalFrames; f++) {
      const t = f / fps;
      renderAlphabetFrame(ctx, 1280, 720, {
        timeSec: t,
        timings,
        theme,
        displayMode,
        backdropImage: backdrop,
      });
      frames.push(offscreen.toDataURL('image/jpeg', 0.82));
      if (f % 15 === 0) {
        await new Promise((r) => setTimeout(r, 0));
      }
    }
    return frames;
  }
}
