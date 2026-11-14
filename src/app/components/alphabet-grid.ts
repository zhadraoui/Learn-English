import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LetterTiming } from '../core/alphabet-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-alphabet-grid',
  imports: [MatIconModule],
  template: `
    <section id="abecedaire" aria-label="Abécédaire interactif de A à Z" class="mt-10">
      <div class="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 class="font-display text-2xl font-semibold text-slate-900">
            Abécédaire interactif · A à Z
          </h2>
          <p class="mt-1 text-sm text-slate-600">
            Cliquez sur une lettre pour afficher sa carte et écouter sa voix seule.
          </p>
        </div>
        <p class="text-xs font-medium text-slate-500 tabular-nums">
          26 lettres · lecture seule ou continue
        </p>
      </div>

      <div class="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-13">
        @for (item of timings(); track item.letter; let idx = $index) {
          <button
            type="button"
            (click)="selectLetter.emit(item)"
            [attr.aria-label]="'Écouter la lettre ' + item.letter + ' (' + item.word + ')'"
            [attr.aria-current]="activeIndex() === idx ? 'step' : null"
            [attr.data-testid]="'letter-tile-' + item.letter"
            class="flex min-h-20 flex-col items-center justify-between rounded-xl border p-2.5 text-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            [class]="
              speakingLetter() === item.letter
                ? 'border-emerald-700 bg-emerald-100/80 text-emerald-950 shadow-xs ring-2 ring-emerald-500/35'
                : activeIndex() === idx
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-950 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
            "
          >
            <span class="font-display text-2xl font-bold leading-none">
              {{ item.letter }}<span class="ml-0.5 text-lg font-medium opacity-75">{{ item.lowercase }}</span>
            </span>
            <span class="mt-1.5 truncate text-[11px] font-medium text-slate-600 max-w-full">
              {{ item.word }}
            </span>
            @if (loadingLetter() === item.letter) {
              <span class="mt-0.5 inline-flex h-3.5 items-center text-emerald-700" aria-hidden="true">
                <mat-icon class="!text-[14px] !h-[14px] !w-[14px] animate-spin">autorenew</mat-icon>
              </span>
            } @else if (speakingLetter() === item.letter) {
              <span class="mt-0.5 inline-flex h-3.5 items-center text-emerald-700" aria-hidden="true">
                <mat-icon class="!text-[14px] !h-[14px] !w-[14px]">volume_up</mat-icon>
              </span>
            } @else {
              <span class="mt-0.5 text-[10px] text-slate-400 tabular-nums">
                {{ item.startSec.toFixed(1) }}s
              </span>
            }
          </button>
        }
      </div>
    </section>
  `,
})
export class AlphabetGrid {
  readonly timings = input.required<LetterTiming[]>();
  readonly activeIndex = input.required<number>();
  readonly loadingLetter = input<string | null>(null);
  readonly speakingLetter = input<string | null>(null);
  readonly selectLetter = output<LetterTiming>();
}
