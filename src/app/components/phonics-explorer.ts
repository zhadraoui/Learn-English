import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VOICE_OPTIONS, VoiceId } from '../core/alphabet-data';
import {
  CourseId,
  PhonicsCourse,
  PhonicsWord,
  getLessonWords,
  getPhonicsLesson,
} from '../core/phonics-courses';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-phonics-explorer',
  imports: [MatIconModule],
  template: `
    <section aria-label="Cours interactif de prononciation anglaise" class="space-y-6">
      <!-- Lesson selector strip for the active course -->
      <div class="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div>
            <h2 class="font-display text-2xl font-semibold text-slate-900">
              {{ course().title }}
            </h2>
            <p class="mt-0.5 text-sm text-slate-600">
              {{ course().subtitle }}
            </p>
          </div>
          <p class="text-xs font-medium text-slate-500 tabular-nums">
            {{ course().titleEn }} · {{ course().lessons.length }} règles
          </p>
        </div>

        <div
          role="tablist"
          [attr.aria-label]="'Règles du ' + course().shortLabel"
          class="mt-3.5 flex flex-wrap gap-2"
        >
          @for (item of course().lessons; track item.id) {
            <button
              type="button"
              role="tab"
              [attr.aria-selected]="lesson().id === item.id"
              [attr.data-testid]="'phonics-lesson-tab-' + item.id"
              (click)="onSelectLesson(item.id)"
              class="inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
              [class]="
                lesson().id === item.id
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              "
            >
              <span class="tabular-nums">{{ item.number }}.</span>
              <span>{{ item.title }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Two-Zone Interactive Sandbox Layout -->
      <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <!-- Left Zone: Rule Spotlight + Interactive Example Words -->
        <div class="space-y-6 lg:col-span-8">
          <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="min-w-0 flex-1">
                <p class="text-xs font-medium text-slate-500 tabular-nums">
                  Règle {{ lesson().number }} sur {{ course().lessons.length }}
                  <span aria-hidden="true"> · </span>
                  Son : <span class="font-semibold text-slate-800">{{ lesson().soundLabel }}</span>
                </p>
                <h3
                  class="mt-1 font-display text-2xl font-semibold text-slate-900 sm:text-3xl"
                  data-testid="phonics-rule-title"
                >
                  {{ lesson().number }}. {{ lesson().title }}
                </h3>
              </div>

              <button
                type="button"
                (click)="onSpeakRule()"
                [disabled]="isLoadingPhonics() === ruleKey()"
                data-testid="phonics-speak-rule-btn"
                class="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                <mat-icon [class]="isLoadingPhonics() === ruleKey() ? 'animate-spin' : ''">
                  {{ isLoadingPhonics() === ruleKey() ? 'autorenew' : 'record_voice_over' }}
                </mat-icon>
                <span>
                  {{
                    speakingPhonics() === ruleKey()
                      ? 'Lecture de la règle…'
                      : 'Écouter la règle'
                  }}
                </span>
              </button>
            </div>

            <div class="mt-4 space-y-2 border-t border-slate-100 pt-4">
              <p class="text-base leading-relaxed text-slate-800" data-testid="phonics-rule-fr">
                {{ lesson().ruleFr }}
              </p>
              <p class="text-xs leading-relaxed text-slate-500">
                {{ lesson().ruleEn }}
              </p>
            </div>

            <!-- Interactive Spotlight Word Stage -->
            @if (focusedWord(); as wordItem) {
              <div
                class="mt-5 rounded-xl border border-slate-200/80 bg-[#FAF9F6] p-4 sm:p-5"
                data-testid="phonics-spotlight"
              >
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p class="text-xs font-medium text-slate-500">
                      Exemple sélectionné · Cliquez sur n'importe quel mot ci-dessous pour l'écouter
                    </p>
                    <div class="mt-1.5 flex flex-wrap items-baseline gap-3">
                      <span
                        class="font-display text-4xl font-bold tracking-tight text-slate-900"
                        data-testid="phonics-spotlight-word"
                      >
                        {{ wordItem.word }}
                      </span>
                      <span class="text-sm font-medium text-emerald-800">
                        Prononcer : <span class="font-mono font-semibold">{{ wordItem.sayItLike }}</span>
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      (click)="onClickWord(wordItem)"
                      [disabled]="isLoadingPhonics() === wordKey(wordItem.word)"
                      data-testid="phonics-speak-word-btn"
                      class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-60 whitespace-nowrap shrink-0"
                    >
                      <mat-icon [class]="isLoadingPhonics() === wordKey(wordItem.word) ? 'animate-spin' : ''">
                        {{ isLoadingPhonics() === wordKey(wordItem.word) ? 'autorenew' : 'volume_up' }}
                      </mat-icon>
                      <span>Écouter « {{ wordItem.word }} »</span>
                    </button>

                    @if (isPlayingSequence()) {
                      <button
                        type="button"
                        (click)="stopAudio.emit()"
                        data-testid="phonics-stop-all-btn"
                        class="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
                      >
                        <mat-icon>stop</mat-icon>
                        <span>Arrêter</span>
                      </button>
                    } @else {
                      <button
                        type="button"
                        (click)="onPlayAll()"
                        data-testid="phonics-play-all-btn"
                        class="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
                      >
                        <mat-icon>play_arrow</mat-icon>
                        <span>Écouter tous les exemples</span>
                      </button>
                    }
                  </div>
                </div>
              </div>
            }

            <!-- Interactive Word Examples Grid(s) -->
            <div class="mt-6 space-y-5">
              @for (group of lesson().groups; track $index) {
                <div>
                  @if (group.subtitle) {
                    <h4 class="mb-2.5 text-sm font-semibold text-slate-800">
                      {{ group.subtitle }}
                    </h4>
                  }

                  <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                    @for (item of group.words; track item.word) {
                      <button
                        type="button"
                        (click)="onClickWord(item)"
                        [attr.aria-label]="'Écouter ' + item.word + ', prononciation ' + item.sayItLike"
                        [attr.data-testid]="'phonics-word-' + item.word"
                        class="flex min-h-20 flex-col items-start justify-between rounded-xl border p-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                        [class]="
                          speakingPhonics() === wordKey(item.word)
                            ? 'border-emerald-700 bg-emerald-100/80 text-emerald-950 ring-2 ring-emerald-500/35'
                            : focusedWord()?.word === item.word
                              ? 'border-emerald-700 bg-emerald-50 text-emerald-950 shadow-xs'
                              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                        "
                      >
                        <div class="flex w-full items-center justify-between gap-1.5">
                          <span class="font-display text-lg font-semibold leading-tight text-slate-900">
                            {{ item.word }}
                          </span>
                          @if (isLoadingPhonics() === wordKey(item.word)) {
                            <mat-icon class="!text-[16px] !h-[16px] !w-[16px] animate-spin text-emerald-700 shrink-0" aria-hidden="true">
                              autorenew
                            </mat-icon>
                          } @else if (speakingPhonics() === wordKey(item.word)) {
                            <mat-icon class="!text-[16px] !h-[16px] !w-[16px] text-emerald-700 shrink-0" aria-hidden="true">
                              volume_up
                            </mat-icon>
                          }
                        </div>
                        <span class="mt-1 font-mono text-xs text-slate-500">
                          {{ item.sayItLike }}
                        </span>
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Right Zone: Exceptions + Voice Picker -->
        <aside class="space-y-5 lg:col-span-4">
          <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h3 class="font-display text-lg font-semibold text-slate-900">
                {{ lesson().exceptionsTitle }}
              </h3>
              <span class="text-xs font-medium text-amber-800 tabular-nums">
                {{ lesson().exceptions.length }} point(s)
              </span>
            </div>

            <div class="mt-3.5 space-y-3" data-testid="phonics-exceptions-list">
              @for (exc of lesson().exceptions; track exc.titleEn) {
                <div class="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3.5">
                  <p class="text-sm font-medium leading-snug text-slate-900">
                    {{ exc.titleFr }}
                  </p>
                  <p class="mt-1 text-xs leading-relaxed text-slate-600">
                    {{ exc.titleEn }}
                  </p>

                  @if (exc.examples.length > 0) {
                    <div class="mt-2.5 flex flex-wrap gap-1.5">
                      @for (ex of exc.examples; track ex.word) {
                        <button
                          type="button"
                          (click)="onClickException(ex)"
                          [attr.aria-label]="'Écouter exception ' + ex.word"
                          [attr.data-testid]="'phonics-exception-' + ex.word"
                          class="inline-flex min-h-8 items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
                          [class]="
                            speakingPhonics() === excKey(ex.word)
                              ? 'border-emerald-700 bg-emerald-100 text-emerald-950'
                              : 'border-amber-200 bg-white text-slate-800 hover:border-amber-300 hover:bg-amber-50'
                          "
                        >
                          <mat-icon
                            class="!text-[14px] !h-[14px] !w-[14px]"
                            [class]="isLoadingPhonics() === excKey(ex.word) ? 'animate-spin text-emerald-700' : 'text-amber-800'"
                            aria-hidden="true"
                          >
                            {{ isLoadingPhonics() === excKey(ex.word) ? 'autorenew' : 'volume_up' }}
                          </mat-icon>
                          <span>{{ ex.word }}</span>
                        </button>
                      }
                    </div>
                  }
                </div>
              }
            </div>

            @if (lesson().tipFr) {
              <p class="mt-3.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                {{ lesson().tipFr }}
              </p>
            }

            @if (lesson().quickReviewFr) {
              <p class="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-xs font-medium leading-relaxed text-emerald-950">
                {{ lesson().quickReviewFr }}
              </p>
            }
          </div>

          <!-- Shared Soothing English Voice Selection -->
          <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
            <h3 class="text-sm font-semibold text-slate-800">
              Voix anglaise de lecture
            </h3>
            <p class="mt-0.5 text-xs text-slate-500">
              Choisissez la voix utilisée pour lire les règles, exemples et exceptions.
            </p>
            <div class="mt-3 space-y-1.5">
              @for (voice of voices; track voice.id) {
                <button
                  type="button"
                  (click)="selectVoice.emit(voice.id)"
                  [attr.aria-pressed]="voiceId() === voice.id"
                  class="flex min-h-11 w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  [class]="
                    voiceId() === voice.id
                      ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  "
                >
                  <div class="min-w-0 pr-2">
                    <p class="text-xs font-semibold truncate">{{ voice.label }}</p>
                    <p class="text-[11px] text-slate-500 truncate">{{ voice.description }}</p>
                  </div>
                  @if (voiceId() === voice.id) {
                    <mat-icon class="!text-[18px] !h-[18px] !w-[18px] text-emerald-700 shrink-0" aria-hidden="true">
                      volume_up
                    </mat-icon>
                  }
                </button>
              }
            </div>
          </div>
        </aside>
      </div>
    </section>
  `,
})
export class PhonicsExplorer {
  readonly course = input.required<PhonicsCourse>();
  readonly lessonId = input.required<string>();
  readonly voiceId = input.required<VoiceId>();
  readonly isLoadingPhonics = input<string | null>(null);
  readonly speakingPhonics = input<string | null>(null);
  readonly isPlayingSequence = input<boolean>(false);

  readonly selectLesson = output<string>();
  readonly selectVoice = output<VoiceId>();
  readonly speakWord = output<{ key: string; word: string; spokenText: string }>();
  readonly speakRule = output<{ key: string; spokenText: string }>();
  readonly speakException = output<{ key: string; spokenText: string }>();
  readonly playAllExamples = output<PhonicsWord[]>();
  readonly stopAudio = output<void>();
  readonly selectCourse = output<CourseId>();

  readonly voices = VOICE_OPTIONS;
  private readonly selectedWordText = signal<string | null>(null);

  readonly lesson = computed(() =>
    getPhonicsLesson(this.course().id, this.lessonId()),
  );

  readonly allLessonWords = computed(() => getLessonWords(this.lesson()));

  readonly focusedWord = computed(() => {
    const words = this.allLessonWords();
    if (words.length === 0) return null;

    const speaking = this.speakingPhonics();
    if (speaking && speaking.startsWith('word:')) {
      const activeWord = speaking.slice(5);
      const matched = words.find((w) => w.word === activeWord);
      if (matched) return matched;
    }

    const chosen = this.selectedWordText();
    return words.find((w) => w.word === chosen) ?? words[0];
  });

  ruleKey(): string {
    return `rule:${this.lesson().id}`;
  }

  wordKey(word: string): string {
    return `word:${word}`;
  }

  excKey(word: string): string {
    return `exc:${word}`;
  }

  onSelectLesson(id: string): void {
    this.stopAudio.emit();
    this.selectedWordText.set(null);
    this.selectLesson.emit(id);
  }

  onClickWord(item: PhonicsWord): void {
    this.selectedWordText.set(item.word);
    this.speakWord.emit({
      key: this.wordKey(item.word),
      word: item.word,
      spokenText: item.spokenText ?? item.word,
    });
  }

  onSpeakRule(): void {
    this.speakRule.emit({
      key: this.ruleKey(),
      spokenText: this.lesson().spokenRule,
    });
  }

  onClickException(item: PhonicsWord): void {
    this.speakException.emit({
      key: this.excKey(item.word),
      spokenText: item.spokenText ?? item.word,
    });
  }

  onPlayAll(): void {
    this.playAllExamples.emit(this.allLessonWords());
  }
}
