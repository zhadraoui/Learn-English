export type ThemeId = 'meadow' | 'starlight' | 'botanical';
export type VoiceId = 'Kore' | 'Zephyr' | 'Puck';
export type DisplayMode = 'letter-word' | 'letter-only';

export interface AlphabetEntry {
  letter: string;
  lowercase: string;
  word: string;
  phonetic: string;
  accent: string;
}

export interface LetterTiming extends AlphabetEntry {
  index: number;
  startSec: number;
  endSec: number;
}

export interface VideoTheme {
  id: ThemeId;
  label: string;
  subtitle: string;
  imagePath: string;
  isDark: boolean;
  cardBg: string;
  cardBorder: string;
  inkColor: string;
  mutedInkColor: string;
  accentColor: string;
}

export interface VoiceOption {
  id: VoiceId;
  label: string;
  description: string;
}

export const VIDEO_DURATION_SEC = 30;
export const DEFAULT_INTRO_SEC = 1.0;
export const DEFAULT_OUTRO_SEC = 1.5;

export const VIDEO_THEMES: Record<ThemeId, VideoTheme> = {
  meadow: {
    id: 'meadow',
    label: 'Prairie du matin',
    subtitle: 'Lumière douce et fleurs des champs',
    imagePath: '/src/assets/images/alphabet_storybook_meadow_1794611734350.jpg',
    isDark: false,
    cardBg: 'rgba(255, 253, 248, 0.90)',
    cardBorder: 'rgba(100, 116, 139, 0.18)',
    inkColor: '#1E293B',
    mutedInkColor: '#475569',
    accentColor: '#059669',
  },
  starlight: {
    id: 'starlight',
    label: 'Nuit étoilée',
    subtitle: 'Ciel calme pour le soir',
    imagePath: '/src/assets/images/alphabet_storybook_starlight_1794611735027.jpg',
    isDark: true,
    cardBg: 'rgba(24, 32, 54, 0.84)',
    cardBorder: 'rgba(226, 232, 240, 0.20)',
    inkColor: '#F8FAFC',
    mutedInkColor: '#CBD5E1',
    accentColor: '#FBBF24',
  },
  botanical: {
    id: 'botanical',
    label: 'Jardin botanique',
    subtitle: 'Papier aquarelle et feuillage',
    imagePath: '/src/assets/images/alphabet_storybook_botanical_1794611735466.jpg',
    isDark: false,
    cardBg: 'rgba(255, 252, 245, 0.92)',
    cardBorder: 'rgba(120, 113, 108, 0.20)',
    inkColor: '#292524',
    mutedInkColor: '#57534E',
    accentColor: '#0D9488',
  },
};

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: 'Kore',
    label: 'Kore · Douce & maternelle',
    description: 'Voix posée, claire et rassurante',
  },
  {
    id: 'Zephyr',
    label: 'Zephyr · Aérienne & calme',
    description: 'Timbre léger et apaisant',
  },
  {
    id: 'Puck',
    label: 'Puck · Claire & lumineuse',
    description: 'Articulation douce et souriante',
  },
];

export const ALPHABET_ENTRIES: AlphabetEntry[] = [
  { letter: 'A', lowercase: 'a', word: 'Apple', phonetic: 'ei', accent: '#DC6B5A' },
  { letter: 'B', lowercase: 'b', word: 'Bear', phonetic: 'biː', accent: '#B47B48' },
  { letter: 'C', lowercase: 'c', word: 'Cloud', phonetic: 'siː', accent: '#5A9BD4' },
  { letter: 'D', lowercase: 'd', word: 'Duck', phonetic: 'diː', accent: '#D99B26' },
  { letter: 'E', lowercase: 'e', word: 'Elephant', phonetic: 'iː', accent: '#6B8E9B' },
  { letter: 'F', lowercase: 'f', word: 'Flower', phonetic: 'ɛf', accent: '#D9778A' },
  { letter: 'G', lowercase: 'g', word: 'Giraffe', phonetic: 'dʒiː', accent: '#C68B38' },
  { letter: 'H', lowercase: 'h', word: 'House', phonetic: 'eɪtʃ', accent: '#4D9078' },
  { letter: 'I', lowercase: 'i', word: 'Igloo', phonetic: 'aɪ', accent: '#5B9AA9' },
  { letter: 'J', lowercase: 'j', word: 'Jellyfish', phonetic: 'dʒeɪ', accent: '#8E7AB5' },
  { letter: 'K', lowercase: 'k', word: 'Kite', phonetic: 'keɪ', accent: '#E07A5F' },
  { letter: 'L', lowercase: 'l', word: 'Lion', phonetic: 'ɛl', accent: '#CC8B3C' },
  { letter: 'M', lowercase: 'm', word: 'Moon', phonetic: 'ɛm', accent: '#5E72A4' },
  { letter: 'N', lowercase: 'n', word: 'Nest', phonetic: 'ɛn', accent: '#6D8B58' },
  { letter: 'O', lowercase: 'o', word: 'Owl', phonetic: 'oʊ', accent: '#8C6D53' },
  { letter: 'P', lowercase: 'p', word: 'Panda', phonetic: 'piː', accent: '#475569' },
  { letter: 'Q', lowercase: 'q', word: 'Queen', phonetic: 'kjuː', accent: '#A86485' },
  { letter: 'R', lowercase: 'r', word: 'Rainbow', phonetic: 'ɑːr', accent: '#4F8DA8' },
  { letter: 'S', lowercase: 's', word: 'Sun', phonetic: 'ɛs', accent: '#D99B26' },
  { letter: 'T', lowercase: 't', word: 'Tree', phonetic: 'tiː', accent: '#4B8B63' },
  { letter: 'U', lowercase: 'u', word: 'Umbrella', phonetic: 'juː', accent: '#6A8CAF' },
  { letter: 'V', lowercase: 'v', word: 'Violin', phonetic: 'viː', accent: '#A6634B' },
  { letter: 'W', lowercase: 'w', word: 'Whale', phonetic: 'ˈdʌbəl.juː', accent: '#3B7A9E' },
  { letter: 'X', lowercase: 'x', word: 'Xylophone', phonetic: 'ɛks', accent: '#5F938A' },
  { letter: 'Y', lowercase: 'y', word: 'Yarn', phonetic: 'waɪ', accent: '#C47488' },
  { letter: 'Z', lowercase: 'z', word: 'Zebra', phonetic: 'ziː', accent: '#4B5563' },
];

export function buildUniformTimings(
  totalSec: number = VIDEO_DURATION_SEC,
  introSec: number = DEFAULT_INTRO_SEC,
  outroSec: number = DEFAULT_OUTRO_SEC,
): LetterTiming[] {
  const usable = Math.max(1, totalSec - introSec - outroSec);
  const step = usable / ALPHABET_ENTRIES.length;
  return ALPHABET_ENTRIES.map((entry, index) => ({
    ...entry,
    index,
    startSec: Number((introSec + index * step).toFixed(3)),
    endSec: Number((introSec + (index + 1) * step).toFixed(3)),
  }));
}

export function alignTimingsToOnsets(
  onsetsSec: number[],
  totalSec: number = VIDEO_DURATION_SEC,
  introSec: number = DEFAULT_INTRO_SEC,
  outroSec: number = DEFAULT_OUTRO_SEC,
): LetterTiming[] {
  if (onsetsSec.length !== ALPHABET_ENTRIES.length) {
    return buildUniformTimings(totalSec, introSec, outroSec);
  }
  const sorted = [...onsetsSec].sort((a, b) => a - b);
  const maxEnd = Math.max(introSec + 1, totalSec - outroSec);

  return ALPHABET_ENTRIES.map((entry, index) => {
    const startRaw = index === 0 ? Math.max(0.4, sorted[0] - 0.12) : sorted[index] - 0.1;
    const startSec = Math.max(0, Math.min(maxEnd - 0.25, startRaw));
    const nextStart =
      index < sorted.length - 1
        ? Math.max(startSec + 0.25, sorted[index + 1] - 0.1)
        : maxEnd;
    const endSec = Math.min(totalSec, Math.max(startSec + 0.25, nextStart));

    return {
      ...entry,
      index,
      startSec: Number(startSec.toFixed(3)),
      endSec: Number(endSec.toFixed(3)),
    };
  });
}

export interface PlaybackPhase {
  phase: 'intro' | 'letter' | 'outro';
  activeIndex: number;
  item: LetterTiming | null;
  localProgress: number;
}

export function getPlaybackPhase(
  timings: LetterTiming[],
  timeSec: number,
  totalSec: number = VIDEO_DURATION_SEC,
): PlaybackPhase {
  const clamped = Math.max(0, Math.min(totalSec, timeSec));
  if (timings.length === 0) {
    return { phase: 'intro', activeIndex: -1, item: null, localProgress: 0 };
  }

  const firstStart = timings[0].startSec;
  if (clamped < firstStart) {
    const progress = firstStart > 0 ? clamped / firstStart : 1;
    return { phase: 'intro', activeIndex: -1, item: null, localProgress: progress };
  }

  const lastEnd = timings[timings.length - 1].endSec;
  if (clamped >= lastEnd) {
    const outroLen = Math.max(0.01, totalSec - lastEnd);
    const progress = Math.min(1, (clamped - lastEnd) / outroLen);
    return { phase: 'outro', activeIndex: -1, item: null, localProgress: progress };
  }

  for (let i = 0; i < timings.length; i++) {
    const item = timings[i];
    if (clamped >= item.startSec && clamped < item.endSec) {
      const dur = Math.max(0.01, item.endSec - item.startSec);
      return {
        phase: 'letter',
        activeIndex: i,
        item,
        localProgress: Math.min(1, (clamped - item.startSec) / dur),
      };
    }
  }

  const last = timings[timings.length - 1];
  return { phase: 'letter', activeIndex: timings.length - 1, item: last, localProgress: 1 };
}

export function getLetterCenterTime(item: LetterTiming): number {
  return Number(((item.startSec + item.endSec) / 2).toFixed(3));
}

export function normalizeSingleLetter(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim().toUpperCase();
  if (/^[A-Z]$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

export function formatTimecode(seconds: number): string {
  const clamped = Math.max(0, Math.round(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
