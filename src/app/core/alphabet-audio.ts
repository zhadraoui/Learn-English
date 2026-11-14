import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import {
  LetterTiming,
  VIDEO_DURATION_SEC,
  VoiceId,
  alignTimingsToOnsets,
  buildUniformTimings,
} from './alphabet-data';

interface AudioApiResponse {
  voice: VoiceId;
  source: 'gemini-tts' | 'fallback';
  voiceWavBase64: string | null;
  lullabyWavBase64: string;
  onsetsSec: number[];
  durationSec: number;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AlphabetAudio {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly isLoadingVoice = signal(false);
  readonly voiceSource = signal<'idle' | 'gemini-tts' | 'fallback'>('idle');
  readonly voiceError = signal<string | null>(null);
  readonly timings = signal<LetterTiming[]>(buildUniformTimings(VIDEO_DURATION_SEC));
  readonly isLoadingSingleLetter = signal<string | null>(null);
  readonly speakingSingleLetter = signal<string | null>(null);
  readonly isLoadingPhonics = signal<string | null>(null);
  readonly speakingPhonics = signal<string | null>(null);
  readonly isPlayingPhonicsSequence = signal(false);

  private voiceAudio: HTMLAudioElement | null = null;
  private lullabyAudio: HTMLAudioElement | null = null;
  private singleAudio: HTMLAudioElement | null = null;
  private phonicsAudio: HTMLAudioElement | null = null;
  private voiceUrl: string | null = null;
  private lullabyUrl: string | null = null;
  private readonly singleLetterUrlCache = new Map<string, string>();
  private readonly phonicsUrlCache = new Map<string, string>();
  private loadedVoiceId: VoiceId | null = null;
  private lastSpokenFallbackIndex = -1;
  private singleAbortController: AbortController | null = null;
  private singleRequestToken = 0;
  private phonicsAbortController: AbortController | null = null;
  private phonicsRequestToken = 0;

  private createWavUrl(base64: string): string {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  private clearAudioUrls(): void {
    this.stopPlayback();
    if (this.voiceUrl) {
      URL.revokeObjectURL(this.voiceUrl);
      this.voiceUrl = null;
    }
    if (this.lullabyUrl) {
      URL.revokeObjectURL(this.lullabyUrl);
      this.lullabyUrl = null;
    }
    this.voiceAudio = null;
    this.lullabyAudio = null;
  }

  async ensureLoaded(voice: VoiceId, forceReload = false): Promise<void> {
    if (!this.isBrowser) return;
    if (!forceReload && this.loadedVoiceId === voice && (this.voiceAudio || this.lullabyAudio)) {
      return;
    }

    this.isLoadingVoice.set(true);
    this.voiceError.set(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const res = await fetch('/api/alphabet/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voice }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur audio (${res.status})`);
      }

      const data = (await res.json()) as AudioApiResponse;
      this.clearAudioUrls();

      if (data.lullabyWavBase64) {
        this.lullabyUrl = this.createWavUrl(data.lullabyWavBase64);
        this.lullabyAudio = new Audio(this.lullabyUrl);
        this.lullabyAudio.preload = 'auto';
      }

      if (data.voiceWavBase64 && data.source === 'gemini-tts') {
        this.voiceUrl = this.createWavUrl(data.voiceWavBase64);
        this.voiceAudio = new Audio(this.voiceUrl);
        this.voiceAudio.preload = 'auto';
        this.voiceSource.set('gemini-tts');
        this.voiceError.set(null);
        this.timings.set(
          data.onsetsSec.length === 26
            ? alignTimingsToOnsets(data.onsetsSec, VIDEO_DURATION_SEC)
            : buildUniformTimings(VIDEO_DURATION_SEC),
        );
      } else {
        this.voiceAudio = null;
        this.voiceSource.set('fallback');
        this.voiceError.set(
          data.error
            ? `Mode berceuse et synthèse locale actif (${data.error}).`
            : 'Mode berceuse et synthèse vocale locale actif.',
        );
        this.timings.set(buildUniformTimings(VIDEO_DURATION_SEC));
      }

      this.loadedVoiceId = voice;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur de chargement audio';
      this.voiceSource.set('fallback');
      this.voiceError.set(msg);
      this.timings.set(buildUniformTimings(VIDEO_DURATION_SEC));
    } finally {
      clearTimeout(timeoutId);
      this.isLoadingVoice.set(false);
    }
  }

  async playSingleLetter(letter: string, voice: VoiceId): Promise<void> {
    if (!this.isBrowser) return;

    this.stopPlayback();
    const token = ++this.singleRequestToken;
    const cacheKey = `${voice}:${letter}`;
    let url = this.singleLetterUrlCache.get(cacheKey);

    if (!url) {
      this.isLoadingSingleLetter.set(letter);
      const controller = new AbortController();
      this.singleAbortController = controller;
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      try {
        const res = await fetch('/api/alphabet/letter-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ letter, voice }),
          signal: controller.signal,
        });

        if (token !== this.singleRequestToken) return;

        if (res.ok) {
          const data = (await res.json()) as {
            source?: 'gemini-tts' | 'fallback';
            wavBase64?: string | null;
          };
          if (token !== this.singleRequestToken) return;
          if (data.wavBase64 && data.source === 'gemini-tts') {
            url = this.createWavUrl(data.wavBase64);
            this.singleLetterUrlCache.set(cacheKey, url);
          }
        }
      } catch {
        if (token !== this.singleRequestToken) return;
      } finally {
        clearTimeout(timeoutId);
        if (token === this.singleRequestToken) {
          this.isLoadingSingleLetter.set(null);
          this.singleAbortController = null;
        }
      }
    }

    if (token !== this.singleRequestToken) return;

    if (url) {
      const audio = new Audio(url);
      audio.volume = 1.0;
      this.singleAudio = audio;
      this.speakingSingleLetter.set(letter);

      audio.onended = () => {
        if (this.singleAudio === audio) {
          this.speakingSingleLetter.set(null);
          this.singleAudio = null;
        }
      };
      audio.onerror = () => {
        if (this.singleAudio === audio) {
          this.speakingSingleLetter.set(null);
          this.singleAudio = null;
        }
      };

      try {
        await audio.play();
        return;
      } catch {
        if (this.singleAudio === audio) {
          this.singleAudio = null;
        }
        if (token !== this.singleRequestToken) return;
      }
    }

    this.speakSingleLetterFallback(letter, token);
  }

  private speakSingleLetterFallback(letter: string, token: number): void {
    if (!this.isBrowser || !('speechSynthesis' in window)) {
      if (token === this.singleRequestToken) {
        this.speakingSingleLetter.set(null);
      }
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(letter);
      utter.lang = 'en-US';
      utter.rate = 0.78;
      utter.pitch = 1.04;
      utter.volume = 0.95;

      this.speakingSingleLetter.set(letter);
      const cleanup = () => {
        if (token === this.singleRequestToken) {
          this.speakingSingleLetter.set(null);
        }
      };
      utter.onend = cleanup;
      utter.onerror = cleanup;
      window.speechSynthesis.speak(utter);
      setTimeout(cleanup, 1600);
    } catch {
      if (token === this.singleRequestToken) {
        this.speakingSingleLetter.set(null);
      }
    }
  }

  stopSingleLetter(): void {
    this.singleRequestToken++;
    if (this.singleAbortController) {
      this.singleAbortController.abort();
      this.singleAbortController = null;
    }
    if (this.singleAudio) {
      this.singleAudio.onended = null;
      this.singleAudio.onerror = null;
      this.singleAudio.pause();
      this.singleAudio = null;
    }
    this.isLoadingSingleLetter.set(null);
    this.speakingSingleLetter.set(null);
  }

  startPlayback(offsetSec: number, musicEnabled: boolean, musicVolume: number): void {
    if (!this.isBrowser) return;
    this.stopPlayback();
    this.lastSpokenFallbackIndex = -1;

    const clampedOffset = Math.max(0, Math.min(VIDEO_DURATION_SEC - 0.05, offsetSec));

    if (this.voiceAudio) {
      this.voiceAudio.currentTime = clampedOffset;
      this.voiceAudio.volume = 1.0;
      void this.voiceAudio.play().catch(() => undefined);
    }

    if (this.lullabyAudio) {
      this.lullabyAudio.currentTime = clampedOffset;
      this.lullabyAudio.volume = musicEnabled ? Math.max(0, Math.min(1, musicVolume * 0.65)) : 0;
      void this.lullabyAudio.play().catch(() => undefined);
    }
  }

  updateMusicMix(musicEnabled: boolean, musicVolume: number): void {
    if (!this.lullabyAudio) return;
    this.lullabyAudio.volume = musicEnabled ? Math.max(0, Math.min(1, musicVolume * 0.65)) : 0;
  }

  maybeSpeakFallbackLetter(activeIndex: number, item: LetterTiming | null): void {
    if (!this.isBrowser || this.voiceAudio || !item) return;
    if (activeIndex === this.lastSpokenFallbackIndex) return;
    this.lastSpokenFallbackIndex = activeIndex;

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(item.letter);
        utter.lang = 'en-US';
        utter.rate = 0.78;
        utter.pitch = 1.04;
        utter.volume = 0.9;
        window.speechSynthesis.speak(utter);
      } catch {
        // Ignore in headless environments
      }
    }
  }

  async speakPhonicsText(
    key: string,
    spokenText: string,
    voice: VoiceId,
    kind: 'word' | 'rule' | 'exception' = 'word',
  ): Promise<void> {
    if (!this.isBrowser) return;
    this.stopPlayback();
    const token = ++this.phonicsRequestToken;
    await this.playPhonicsItemAndAwait(key, spokenText, voice, kind, token);
  }

  async playPhonicsSequence(
    items: { key: string; word: string; spokenText: string }[],
    voice: VoiceId,
    onFocusWord: (word: string) => void,
  ): Promise<void> {
    if (!this.isBrowser || items.length === 0) return;
    this.stopPlayback();
    const token = ++this.phonicsRequestToken;
    this.isPlayingPhonicsSequence.set(true);

    try {
      for (const item of items) {
        if (token !== this.phonicsRequestToken) break;
        onFocusWord(item.word);
        await this.playPhonicsItemAndAwait(item.key, item.spokenText, voice, 'word', token);
        if (token !== this.phonicsRequestToken) break;
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    } finally {
      if (token === this.phonicsRequestToken) {
        this.isPlayingPhonicsSequence.set(false);
      }
    }
  }

  private async playPhonicsItemAndAwait(
    key: string,
    spokenText: string,
    voice: VoiceId,
    kind: 'word' | 'rule' | 'exception',
    token: number,
  ): Promise<void> {
    const cacheKey = `${voice}:${kind}:${spokenText.toLowerCase()}`;
    let url = this.phonicsUrlCache.get(cacheKey);

    if (!url) {
      this.isLoadingPhonics.set(key);
      const controller = new AbortController();
      this.phonicsAbortController = controller;
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      try {
        const res = await fetch('/api/phonics/speak', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: spokenText, voice, kind }),
          signal: controller.signal,
        });

        if (token !== this.phonicsRequestToken) return;

        if (res.ok) {
          const data = (await res.json()) as {
            source?: 'gemini-tts' | 'fallback';
            wavBase64?: string | null;
          };
          if (token !== this.phonicsRequestToken) return;
          if (data.wavBase64 && data.source === 'gemini-tts') {
            url = this.createWavUrl(data.wavBase64);
            this.phonicsUrlCache.set(cacheKey, url);
          }
        }
      } catch {
        if (token !== this.phonicsRequestToken) return;
      } finally {
        clearTimeout(timeoutId);
        if (token === this.phonicsRequestToken) {
          this.isLoadingPhonics.set(null);
          this.phonicsAbortController = null;
        }
      }
    }

    if (token !== this.phonicsRequestToken) return;

    if (url) {
      const audio = new Audio(url);
      audio.volume = 1.0;
      this.phonicsAudio = audio;
      this.speakingPhonics.set(key);

      try {
        await new Promise<void>((resolve, reject) => {
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            if (this.phonicsAudio === audio) {
              this.speakingPhonics.set(null);
              this.phonicsAudio = null;
            }
            resolve();
          };
          audio.onended = finish;
          audio.onpause = finish;
          audio.onerror = () => {
            if (settled) return;
            settled = true;
            if (this.phonicsAudio === audio) {
              this.speakingPhonics.set(null);
              this.phonicsAudio = null;
            }
            reject(new Error('Audio playback failed'));
          };
          audio.play().catch((err) => {
            if (settled) return;
            settled = true;
            if (this.phonicsAudio === audio) {
              this.speakingPhonics.set(null);
              this.phonicsAudio = null;
            }
            reject(err);
          });
        });
        return;
      } catch {
        if (token !== this.phonicsRequestToken) return;
      }
    }

    await this.speakPhonicsFallbackAndAwait(key, spokenText, token);
  }

  private async speakPhonicsFallbackAndAwait(
    key: string,
    spokenText: string,
    token: number,
  ): Promise<void> {
    if (!this.isBrowser || !('speechSynthesis' in window)) {
      if (token === this.phonicsRequestToken) {
        this.speakingPhonics.set(null);
      }
      return;
    }

    await new Promise<void>((resolve) => {
      let settled = false;
      const cleanup = () => {
        if (settled) return;
        settled = true;
        if (token === this.phonicsRequestToken) {
          this.speakingPhonics.set(null);
        }
        resolve();
      };

      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(spokenText);
        utter.lang = 'en-US';
        utter.rate = 0.82;
        utter.pitch = 1.02;
        utter.volume = 0.95;

        this.speakingPhonics.set(key);
        utter.onend = cleanup;
        utter.onerror = cleanup;
        window.speechSynthesis.speak(utter);
        setTimeout(cleanup, Math.min(4500, Math.max(1300, spokenText.length * 75)));
      } catch {
        cleanup();
      }
    });
  }

  stopPhonics(): void {
    this.phonicsRequestToken++;
    if (this.phonicsAbortController) {
      this.phonicsAbortController.abort();
      this.phonicsAbortController = null;
    }
    if (this.phonicsAudio) {
      this.phonicsAudio.onended = null;
      this.phonicsAudio.onpause = null;
      this.phonicsAudio.onerror = null;
      this.phonicsAudio.pause();
      this.phonicsAudio = null;
    }
    this.isLoadingPhonics.set(null);
    this.speakingPhonics.set(null);
    this.isPlayingPhonicsSequence.set(false);
  }

  stopPlayback(): void {
    this.stopSingleLetter();
    this.stopPhonics();
    if (this.voiceAudio) {
      this.voiceAudio.pause();
    }
    if (this.lullabyAudio) {
      this.lullabyAudio.pause();
    }
    this.lastSpokenFallbackIndex = -1;
    if (this.isBrowser && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }
}
