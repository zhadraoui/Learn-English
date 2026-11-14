import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  DisplayMode,
  ThemeId,
  VIDEO_THEMES,
  VOICE_OPTIONS,
  VoiceId,
} from '../core/alphabet-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-studio-deck',
  imports: [MatIconModule],
  template: `
    <aside
      id="personnaliser"
      aria-label="Atelier de personnalisation vidéo"
      class="flex flex-col gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5"
    >
      <div>
        <h2 class="font-display text-lg font-semibold text-slate-900">
          Atelier de la vidéo
        </h2>
        <p class="mt-0.5 text-xs text-slate-600">
          Ambiance visuelle, voix anglaise et berceuse pour 30 secondes de calme.
        </p>
      </div>

      <!-- Theme Selection (compact 3-tile row) -->
      <div class="border-t border-slate-100 pt-3">
        <p class="text-xs font-semibold text-slate-800">Ambiance visuelle</p>
        <div class="mt-2 grid grid-cols-3 gap-2">
          @for (item of themeList; track item.id) {
            <button
              type="button"
              (click)="selectTheme.emit(item.id)"
              [attr.aria-pressed]="themeId() === item.id"
              [attr.data-testid]="'theme-' + item.id"
              class="flex flex-col items-start gap-1.5 rounded-xl border p-1.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              [class]="
                themeId() === item.id
                  ? 'border-emerald-700 bg-emerald-50/60 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              "
            >
              <div class="aspect-video w-full overflow-hidden rounded-lg bg-stone-200">
                <img
                  [src]="item.imagePath"
                  [alt]="item.label"
                  referrerpolicy="no-referrer"
                  class="h-full w-full object-cover"
                />
              </div>
              <span class="w-full truncate text-[11px] font-semibold leading-tight">
                {{ item.label }}
              </span>
            </button>
          }
        </div>
      </div>

      <!-- Voice Selection -->
      <div class="border-t border-slate-100 pt-3">
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs font-semibold text-slate-800">Voix anglaise apaisante</p>
          <button
            type="button"
            (click)="regenerateVoice.emit()"
            [disabled]="isLoadingVoice()"
            class="inline-flex min-h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            <mat-icon class="!text-[15px] !h-[15px] !w-[15px]">graphic_eq</mat-icon>
            <span>Actualiser</span>
          </button>
        </div>

        <div class="mt-2 flex flex-col gap-1.5">
          @for (v of voiceOptions; track v.id) {
            <button
              type="button"
              (click)="selectVoice.emit(v.id)"
              [attr.aria-pressed]="voiceId() === v.id"
              [attr.data-testid]="'voice-' + v.id"
              class="flex min-h-10 items-center justify-between gap-2 rounded-xl border px-3 py-1.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              [class]="
                voiceId() === v.id
                  ? 'border-emerald-700 bg-emerald-50/60 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              "
            >
              <div class="min-w-0">
                <p class="truncate text-xs font-semibold">{{ v.label }}</p>
                <p class="truncate text-[11px] text-slate-500">{{ v.description }}</p>
              </div>
              @if (voiceId() === v.id) {
                <mat-icon class="!text-[18px] !h-[18px] !w-[18px] text-emerald-700 shrink-0">volume_up</mat-icon>
              }
            </button>
          }
        </div>
      </div>

      <!-- Display Mode & Lullaby Volume -->
      <div class="border-t border-slate-100 pt-3 flex flex-col gap-3">
        <div>
          <p class="text-xs font-semibold text-slate-800">Contenu affiché à l'écran</p>
          <div class="mt-1.5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              (click)="selectDisplayMode.emit('letter-word')"
              [attr.aria-pressed]="displayMode() === 'letter-word'"
              data-testid="mode-letter-word"
              class="min-h-9 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap"
              [class]="
                displayMode() === 'letter-word'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              "
            >
              Lettre &amp; Illustration
            </button>
            <button
              type="button"
              (click)="selectDisplayMode.emit('letter-only')"
              [attr.aria-pressed]="displayMode() === 'letter-only'"
              data-testid="mode-letter-only"
              class="min-h-9 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap"
              [class]="
                displayMode() === 'letter-only'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              "
            >
              Lettre seule (A a)
            </button>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between text-xs font-medium text-slate-700">
            <label for="lullaby-volume">Volume de la berceuse douce</label>
            <span class="tabular-nums font-semibold">{{ volumePercent() }}%</span>
          </div>
          <input
            id="lullaby-volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            [value]="musicVolume()"
            (input)="onVolumeInput($event)"
            class="mt-1.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          />
        </div>
      </div>

      <!-- MP4 Export Action -->
      <div class="border-t border-slate-100 pt-3">
        <button
          type="button"
          (click)="exportMp4.emit()"
          [disabled]="isExporting() || isLoadingVoice()"
          data-testid="export-mp4-btn"
          class="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
        >
          <mat-icon class="!text-[18px] !h-[18px] !w-[18px]">{{ isExporting() ? 'hourglass_top' : 'movie' }}</mat-icon>
          <span>
            {{ isExporting() ? exportStatus() : 'Télécharger la vidéo MP4 (30s)' }}
          </span>
        </button>

        @if (lastExportUrl()) {
          <div class="mt-2 flex items-center justify-between text-xs text-emerald-800">
            <span>Fichier MP4 prêt (1280×720 · 30s)</span>
            <a
              [href]="lastExportUrl()"
              download="english-alphabet-30s.mp4"
              class="font-semibold underline underline-offset-2 hover:text-emerald-950"
            >
              Enregistrer à nouveau
            </a>
          </div>
        }

        @if (exportError()) {
          <p class="mt-2 break-words text-xs text-red-700" role="alert">
            {{ exportError() }}
          </p>
        }
      </div>
    </aside>
  `,
})
export class StudioDeck {
  readonly themeId = input.required<ThemeId>();
  readonly voiceId = input.required<VoiceId>();
  readonly displayMode = input.required<DisplayMode>();
  readonly musicVolume = input.required<number>();
  readonly isLoadingVoice = input.required<boolean>();
  readonly isExporting = input.required<boolean>();
  readonly exportStatus = input.required<string>();
  readonly exportError = input<string | null>(null);
  readonly lastExportUrl = input<string | null>(null);

  readonly selectTheme = output<ThemeId>();
  readonly selectVoice = output<VoiceId>();
  readonly selectDisplayMode = output<DisplayMode>();
  readonly changeMusicVolume = output<number>();
  readonly regenerateVoice = output<void>();
  readonly exportMp4 = output<void>();

  readonly themeList = Object.values(VIDEO_THEMES);
  readonly voiceOptions = VOICE_OPTIONS;
  readonly volumePercent = computed(() => Math.round(this.musicVolume() * 100));

  onVolumeInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = Number(target.value);
    if (!Number.isNaN(val)) {
      this.changeMusicVolume.emit(val);
    }
  }
}
