export type CourseId = 'A' | 'E' | 'I' | 'O' | 'U' | 'Y';

export interface PhonicsWord {
  word: string;
  sayItLike: string;
  spokenText?: string;
}

export interface PhonicsWordGroup {
  subtitle?: string;
  words: PhonicsWord[];
}

export interface PhonicsException {
  titleFr: string;
  titleEn: string;
  examples: PhonicsWord[];
}

export interface PhonicsLesson {
  id: string;
  number: number;
  title: string;
  soundLabel: string;
  ruleEn: string;
  ruleFr: string;
  spokenRule: string;
  groups: PhonicsWordGroup[];
  exceptionsTitle: string;
  exceptions: PhonicsException[];
  tipFr?: string;
  quickReviewFr?: string;
}

export interface PhonicsCourse {
  id: CourseId;
  shortLabel: string;
  title: string;
  titleEn: string;
  subtitle: string;
  accentHex: string;
  lessons: PhonicsLesson[];
}

export const PHONICS_COURSES: PhonicsCourse[] = [
  {
    id: 'A',
    shortLabel: 'Cours A',
    title: 'Les sons du A',
    titleEn: 'English A Sounds Guide',
    subtitle: 'Les sons a + e, a, wa, al et au : 10 exemples par règle avec prononciation et exceptions.',
    accentHex: '#059669',
    lessons: [
      {
        id: 'a-magic-e',
        number: 1,
        title: 'a + e = "ay"',
        soundLabel: '"ay" (/eɪ/)',
        ruleEn: 'A + consonant + silent final E: the a says its name, the long "ay" sound, and the e is silent.',
        ruleFr:
          'Avec a + consonne + e final muet, le « a » dit son nom anglais (le son long « ay » comme dans day) et le « e » final reste muet.',
        spokenRule: 'A with silent final E says ay, as in name, cake, and make.',
        groups: [
          {
            words: [
              { word: 'name', sayItLike: 'naym' },
              { word: 'cake', sayItLike: 'kayk' },
              { word: 'make', sayItLike: 'mayk' },
              { word: 'late', sayItLike: 'layt' },
              { word: 'game', sayItLike: 'gaym' },
              { word: 'plane', sayItLike: 'playn' },
              { word: 'face', sayItLike: 'fayss' },
              { word: 'lake', sayItLike: 'layk' },
              { word: 'gate', sayItLike: 'gayt' },
              { word: 'shape', sayItLike: 'shayp' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'have (hav) et are (ar) ne se prononcent pas « ay ».',
            titleEn: 'have (hav) and are (ar) do not say "ay".',
            examples: [
              { word: 'have', sayItLike: 'hav' },
              { word: 'are', sayItLike: 'ar' },
            ],
          },
          {
            titleFr: 'Les terminaisons -age se prononcent « ij » : village (VIL-ij), message, package, cottage, image.',
            titleEn: '-age endings sound like "ij": village (VIL-ij), message, package, cottage, image.',
            examples: [
              { word: 'village', sayItLike: 'VIL-ij' },
              { word: 'message', sayItLike: 'MES-ij' },
              { word: 'package', sayItLike: 'PAK-ij' },
              { word: 'cottage', sayItLike: 'KOT-ij' },
              { word: 'image', sayItLike: 'IM-ij' },
            ],
          },
          {
            titleFr: 'Les terminaisons non accentuées -ate / -ace sonnent « it / iss » : private, climate, chocolate, palace.',
            titleEn: 'Unstressed -ate / -ace sound like "it / iss": private, climate, chocolate, palace.',
            examples: [
              { word: 'private', sayItLike: 'PRY-vit' },
              { word: 'climate', sayItLike: 'KLY-mit' },
              { word: 'chocolate', sayItLike: 'CHOK-lit' },
              { word: 'palace', sayItLike: 'PAL-iss' },
            ],
          },
          {
            titleFr: 'a + r + e se prononce « air » : care, share, rare, bare, dare.',
            titleEn: 'a + r + e sounds like "air": care, share, rare, bare, dare.',
            examples: [
              { word: 'care', sayItLike: 'kair' },
              { word: 'share', sayItLike: 'shair' },
              { word: 'rare', sayItLike: 'rair' },
              { word: 'bare', sayItLike: 'bair' },
              { word: 'dare', sayItLike: 'dair' },
            ],
          },
        ],
      },
      {
        id: 'a-short',
        number: 2,
        title: 'a (no final E) = short "a"',
        soundLabel: 'short "a" (/æ/)',
        ruleEn: 'A in a short word with no e at the end: the short "a" sound, as in cat.',
        ruleFr:
          'Dans un mot court sans « e » à la fin, le « a » donne le son court « a » (ouvert entre a et è), comme dans cat.',
        spokenRule: 'Short a with no final E says a, as in cat, hat, and map.',
        groups: [
          {
            words: [
              { word: 'cat', sayItLike: 'kat' },
              { word: 'hat', sayItLike: 'hat' },
              { word: 'map', sayItLike: 'map' },
              { word: 'bag', sayItLike: 'bag' },
              { word: 'man', sayItLike: 'man' },
              { word: 'dad', sayItLike: 'dad' },
              { word: 'sand', sayItLike: 'sand' },
              { word: 'black', sayItLike: 'blak' },
              { word: 'hand', sayItLike: 'hand' },
              { word: 'apple', sayItLike: 'AP-ul' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'a devant ll, lk, lt, w se prononce « aw » : ball, talk, salt, saw.',
            titleEn: 'a before ll, lk, lt, w says "aw": ball, talk, salt, saw.',
            examples: [
              { word: 'ball', sayItLike: 'bawl' },
              { word: 'talk', sayItLike: 'tawk' },
              { word: 'salt', sayItLike: 'sawlt' },
              { word: 'saw', sayItLike: 'saw' },
            ],
          },
          {
            titleFr: 'a après w se prononce « o » : was (woz), want, what, watch.',
            titleEn: 'a after w says "o": was (woz), want, what, watch.',
            examples: [
              { word: 'was', sayItLike: 'woz' },
              { word: 'want', sayItLike: 'wont' },
              { word: 'what', sayItLike: 'wot' },
              { word: 'watch', sayItLike: 'woch' },
            ],
          },
          {
            titleFr: 'Un « a » non accentué se prononce « uh » : about (uh-BOWT), banana, ago, sofa.',
            titleEn: 'Unstressed a says "uh": about (uh-BOWT), banana, ago, sofa.',
            examples: [
              { word: 'about', sayItLike: 'uh-BOWT' },
              { word: 'banana', sayItLike: 'buh-NAH-nuh' },
              { word: 'ago', sayItLike: 'uh-GOH' },
              { word: 'sofa', sayItLike: 'SOH-fuh' },
            ],
          },
          {
            titleFr: 'Father (FAH-ther), car (kar), ask / path / dance (ahsk, pahth, dahns en anglais britannique).',
            titleEn: 'Father (FAH-ther), car (kar), ask / path / dance (ahsk, pahth, dahns in British English).',
            examples: [
              { word: 'father', sayItLike: 'FAH-ther' },
              { word: 'car', sayItLike: 'kar' },
              { word: 'ask', sayItLike: 'ahsk / ask' },
              { word: 'path', sayItLike: 'pahth / path' },
              { word: 'dance', sayItLike: 'dahns / dans' },
            ],
          },
          {
            titleFr: 'any et many se prononcent « e » : EN-ee, MEN-ee.',
            titleEn: 'any and many say "e": EN-ee, MEN-ee.',
            examples: [
              { word: 'any', sayItLike: 'EN-ee' },
              { word: 'many', sayItLike: 'MEN-ee' },
            ],
          },
        ],
      },
      {
        id: 'a-wa',
        number: 3,
        title: 'wa = "wo"',
        soundLabel: '"wo" (/wɒ/)',
        ruleEn: 'After w, the letter a often sounds like a short "o": wa becomes "wo" ("wah" in American English).',
        ruleFr:
          'Après la lettre « w », le « a » prend souvent le son d’un « o » court : « wa » devient « wo » (« wah » en anglais américain).',
        spokenRule: 'After w, a often says wo, as in want, watch, and wash.',
        groups: [
          {
            words: [
              { word: 'want', sayItLike: 'wont' },
              { word: 'watch', sayItLike: 'woch' },
              { word: 'wash', sayItLike: 'wosh' },
              { word: 'wallet', sayItLike: 'WOL-it' },
              { word: 'swan', sayItLike: 'swon' },
              { word: 'swamp', sayItLike: 'swomp' },
              { word: 'wasp', sayItLike: 'wosp' },
              { word: 'wander', sayItLike: 'WON-der' },
              { word: 'wand', sayItLike: 'wond' },
              { word: 'swap', sayItLike: 'swop' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'wa + r se prononce « wor » (« waw ») : war, warm, ward, warn, swarm, water.',
            titleEn: 'wa + r says "wor" ("waw"): war, warm, ward, warn, swarm, water.',
            examples: [
              { word: 'war', sayItLike: 'wor' },
              { word: 'warm', sayItLike: 'worm' },
              { word: 'ward', sayItLike: 'word' },
              { word: 'warn', sayItLike: 'worn' },
              { word: 'swarm', sayItLike: 'sworm' },
              { word: 'water', sayItLike: 'WAW-ter' },
            ],
          },
          {
            titleFr: 'wa + e muet ou voyelle se prononce « way » : wave, wage, wait, way.',
            titleEn: 'wa + silent e or vowel says "way": wave, wage, wait, way.',
            examples: [
              { word: 'wave', sayItLike: 'wayv' },
              { word: 'wage', sayItLike: 'wayj' },
              { word: 'wait', sayItLike: 'wayt' },
              { word: 'way', sayItLike: 'way' },
            ],
          },
          {
            titleFr: 'wag, wax, wagon, wacky gardent le « a » court.',
            titleEn: 'wag, wax, wagon, wacky keep the short "a".',
            examples: [
              { word: 'wag', sayItLike: 'wag' },
              { word: 'wax', sayItLike: 'waks' },
              { word: 'wagon', sayItLike: 'WAG-un' },
              { word: 'wacky', sayItLike: 'WAK-ee' },
            ],
          },
          {
            titleFr: 'wal + k / l se prononce « waw » : walk (wawk), wall, et aussi water.',
            titleEn: 'wal + k / l says "waw": walk (wawk), wall, also water.',
            examples: [
              { word: 'walk', sayItLike: 'wawk' },
              { word: 'wall', sayItLike: 'wawl' },
              { word: 'water', sayItLike: 'WAW-ter' },
            ],
          },
          {
            titleFr: 'qua fonctionne comme wa : quality (KWOL-i-tee), quantity, squash, squad.',
            titleEn: 'qua works like wa: quality (KWOL-i-tee), quantity, squash, squad.',
            examples: [
              { word: 'quality', sayItLike: 'KWOL-i-tee' },
              { word: 'quantity', sayItLike: 'KWON-ti-tee' },
              { word: 'squash', sayItLike: 'skwosh' },
              { word: 'squad', sayItLike: 'skwod' },
            ],
          },
        ],
      },
      {
        id: 'a-al',
        number: 4,
        title: 'al = "awl"',
        soundLabel: '"awl" (/ɔːl/)',
        ruleEn: 'The letters al often say "awl" (an o sound with an l): the a becomes "aw" and the l is pronounced.',
        ruleFr:
          'Les lettres « al » se prononcent souvent « awl » (un son « o » ouvert suivi de « l ») : le « a » devient « aw » et le « l » s’entend.',
        spokenRule: 'The letters a l often say awl, as in ball, call, and fall.',
        groups: [
          {
            words: [
              { word: 'ball', sayItLike: 'bawl' },
              { word: 'call', sayItLike: 'kawl' },
              { word: 'fall', sayItLike: 'fawl' },
              { word: 'wall', sayItLike: 'wawl' },
              { word: 'tall', sayItLike: 'tawl' },
              { word: 'small', sayItLike: 'smawl' },
              { word: 'hall', sayItLike: 'hawl' },
              { word: 'all', sayItLike: 'awl' },
              { word: 'salt', sayItLike: 'sawlt' },
              { word: 'bald', sayItLike: 'bawld' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'L muet : talk (tawk), walk (wawk), chalk (chawk), calm (kahm), palm (pahm), half (hahf), salmon (SAM-un).',
            titleEn: 'Silent l: talk (tawk), walk (wawk), chalk (chawk), calm (kahm), palm (pahm), half (hahf), salmon (SAM-un).',
            examples: [
              { word: 'talk', sayItLike: 'tawk' },
              { word: 'walk', sayItLike: 'wawk' },
              { word: 'chalk', sayItLike: 'chawk' },
              { word: 'calm', sayItLike: 'kahm' },
              { word: 'palm', sayItLike: 'pahm' },
              { word: 'half', sayItLike: 'hahf' },
              { word: 'salmon', sayItLike: 'SAM-un' },
            ],
          },
          {
            titleFr: '-al non accentué se prononce « ul » : animal (AN-i-mul), final, local, metal, hospital.',
            titleEn: 'Unstressed -al says "ul": animal (AN-i-mul), final, local, metal, hospital.',
            examples: [
              { word: 'animal', sayItLike: 'AN-i-mul' },
              { word: 'final', sayItLike: 'FY-nul' },
              { word: 'local', sayItLike: 'LOH-kul' },
              { word: 'metal', sayItLike: 'MET-ul' },
              { word: 'hospital', sayItLike: 'HOS-pi-tul' },
            ],
          },
          {
            titleFr: 'al avec « a » court + l : alley, valley, salad, ally, alphabet.',
            titleEn: 'al as in a short a + l: alley, valley, salad, ally, alphabet.',
            examples: [
              { word: 'alley', sayItLike: 'AL-ee' },
              { word: 'valley', sayItLike: 'VAL-ee' },
              { word: 'salad', sayItLike: 'SAL-ud' },
              { word: 'ally', sayItLike: 'AL-eye' },
              { word: 'alphabet', sayItLike: 'AL-fuh-bet' },
            ],
          },
          {
            titleFr: 'almond (AH-mund) et already (awl-RED-ee).',
            titleEn: 'almond (AH-mund) and already (awl-RED-ee).',
            examples: [
              { word: 'almond', sayItLike: 'AH-mund' },
              { word: 'already', sayItLike: 'awl-RED-ee' },
            ],
          },
        ],
      },
      {
        id: 'a-au',
        number: 5,
        title: 'au = "o"',
        soundLabel: '"aw" / open "o" (/ɔː/)',
        ruleEn: 'The letters au make an "aw" sound, an open o, as in author. Very regular.',
        ruleFr: 'Les lettres « au » forment un son « aw » (un « o » long et ouvert), comme dans author. Règle très régulière.',
        spokenRule: 'The letters a u make an open aw sound, as in author, cause, and pause.',
        groups: [
          {
            words: [
              { word: 'author', sayItLike: 'AW-ther' },
              { word: 'cause', sayItLike: 'kawz' },
              { word: 'pause', sayItLike: 'pawz' },
              { word: 'because', sayItLike: 'bi-KOZ' },
              { word: 'August', sayItLike: 'AW-gust' },
              { word: 'autumn', sayItLike: 'AW-tum' },
              { word: 'sauce', sayItLike: 'sawss' },
              { word: 'launch', sayItLike: 'lawnch' },
              { word: 'daughter', sayItLike: 'DAW-ter' },
              { word: 'fault', sayItLike: 'fawlt' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'aunt se prononce « ant » ou « ahnt » ; laugh se prononce « laf » ou « lahf ».',
            titleEn: 'aunt says "ant" or "ahnt"; laugh says "laf" or "lahf".',
            examples: [
              { word: 'aunt', sayItLike: 'ant / ahnt' },
              { word: 'laugh', sayItLike: 'laf / lahf' },
            ],
          },
          {
            titleFr: 'gauge se prononce « gayj » ; mauve se prononce « mohv ».',
            titleEn: 'gauge says "gayj"; mauve says "mohv".',
            examples: [
              { word: 'gauge', sayItLike: 'gayj' },
              { word: 'mauve', sayItLike: 'mohv' },
            ],
          },
          {
            titleFr: 'sausage (SOS-ij) et cauliflower (KOL-i-flow-er) ont un « o » court.',
            titleEn: 'sausage (SOS-ij) and cauliflower (KOL-i-flow-er) say a short "o".',
            examples: [
              { word: 'sausage', sayItLike: 'SOS-ij' },
              { word: 'cauliflower', sayItLike: 'KOL-i-flow-er' },
            ],
          },
          {
            titleFr: 'draught se prononce « draft » ; restaurant varie selon l’accent (RES-ter-ont).',
            titleEn: 'draught says "draft"; restaurant varies by accent (RES-ter-ont).',
            examples: [
              { word: 'draught', sayItLike: 'draft' },
              { word: 'restaurant', sayItLike: 'RES-ter-ont' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'E',
    shortLabel: 'Cours E',
    title: 'Les sons du E',
    titleEn: 'English E Sounds Guide',
    subtitle: 'Les sons ee, ea, e (long ee), ea(r), e(r) et ere/erve : 10 exemples par règle et leurs exceptions.',
    accentHex: '#0284C7',
    lessons: [
      {
        id: 'e-ee',
        number: 1,
        title: 'ee = "ee"',
        soundLabel: '"ee" (/iː/)',
        ruleEn: 'The double letters ee make the long "ee" sound, as in see. Very regular.',
        ruleFr: 'Les doubles lettres « ee » donnent le son long « ee » (un « i » long et tendu comme dans see). Règle très régulière.',
        spokenRule: 'Double E makes the long ee sound, as in see, tree, and green.',
        groups: [
          {
            words: [
              { word: 'see', sayItLike: 'see' },
              { word: 'tree', sayItLike: 'tree' },
              { word: 'green', sayItLike: 'green' },
              { word: 'feet', sayItLike: 'feet' },
              { word: 'sleep', sayItLike: 'sleep' },
              { word: 'week', sayItLike: 'week' },
              { word: 'need', sayItLike: 'need' },
              { word: 'three', sayItLike: 'three' },
              { word: 'meet', sayItLike: 'meet' },
              { word: 'cheese', sayItLike: 'cheez' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'been se prononce « bin » (américain) ou « been » (britannique).',
            titleEn: 'been says "bin" (American) or "been" (British).',
            examples: [{ word: 'been', sayItLike: 'bin / been' }],
          },
          {
            titleFr: 'eer se prononce « eer » (ee + r) : beer, deer, cheer, career.',
            titleEn: 'eer says "eer" (ee + r): beer, deer, cheer, career.',
            examples: [
              { word: 'beer', sayItLike: 'beer' },
              { word: 'deer', sayItLike: 'deer' },
              { word: 'cheer', sayItLike: 'cheer' },
              { word: 'career', sayItLike: 'kuh-REER' },
            ],
          },
          {
            titleFr: 'En fin de mots venus du français, -ee peut se prononcer « ay » : matinee (MAT-i-nay), fiancee, toupee.',
            titleEn: 'Final -ee in French words can say "ay": matinee (MAT-i-nay), fiancee, toupee.',
            examples: [
              { word: 'matinee', sayItLike: 'MAT-i-nay' },
              { word: 'fiancee', sayItLike: 'fee-on-SAY' },
              { word: 'toupee', sayItLike: 'too-PAY' },
            ],
          },
          {
            titleFr: 'Son court dans quelques mots : breeches (BRICH-iz).',
            titleEn: 'Short sound in a few words: breeches (BRICH-iz).',
            examples: [{ word: 'breeches', sayItLike: 'BRICH-iz' }],
          },
        ],
      },
      {
        id: 'e-ea',
        number: 2,
        title: 'ea = "ee"',
        soundLabel: '"ee" (/iː/)',
        ruleEn: 'The letters ea very often make the long "ee" sound, as in eat.',
        ruleFr: 'Les lettres « ea » produisent très souvent le son long « ee » (/iː/), comme dans eat.',
        spokenRule: 'The letters e a very often make the long ee sound, as in eat, sea, and tea.',
        groups: [
          {
            words: [
              { word: 'eat', sayItLike: 'eet' },
              { word: 'sea', sayItLike: 'see' },
              { word: 'tea', sayItLike: 'tee' },
              { word: 'meat', sayItLike: 'meet' },
              { word: 'beach', sayItLike: 'beech' },
              { word: 'clean', sayItLike: 'kleen' },
              { word: 'team', sayItLike: 'teem' },
              { word: 'speak', sayItLike: 'speek' },
              { word: 'dream', sayItLike: 'dreem' },
              { word: 'easy', sayItLike: 'EE-zee' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'ea se prononce « e » court : bread (bred), head, dead, breath (breth), health, weather, heavy.',
            titleEn: 'ea says short "e": bread (bred), head, dead, breath (breth), health, weather, heavy.',
            examples: [
              { word: 'bread', sayItLike: 'bred' },
              { word: 'head', sayItLike: 'hed' },
              { word: 'dead', sayItLike: 'ded' },
              { word: 'breath', sayItLike: 'breth' },
              { word: 'health', sayItLike: 'helth' },
              { word: 'weather', sayItLike: 'WETH-er' },
              { word: 'heavy', sayItLike: 'HEV-ee' },
            ],
          },
          {
            titleFr: 'ea se prononce « ay » : break, great, steak.',
            titleEn: 'ea says "ay": break, great, steak.',
            examples: [
              { word: 'break', sayItLike: 'brayk' },
              { word: 'great', sayItLike: 'grayt' },
              { word: 'steak', sayItLike: 'stayk' },
            ],
          },
          {
            titleFr: 'read se dit « reed » (présent) mais « red » (passé) ; lead se dit « leed » (guider) mais « led » (plomb / passé).',
            titleEn: 'read says "reed" (now) but "red" (past); lead says "leed" (guide) but "led" (the metal, or past).',
            examples: [
              { word: 'read', sayItLike: 'reed / red' },
              { word: 'lead', sayItLike: 'leed / led' },
            ],
          },
          {
            titleFr: 'ear se prononce « air » (bear, wear, pear, swear) ou « eer » (ear, hear, near, year, clear).',
            titleEn: 'ear says "air": bear, wear, pear, swear. ear says "eer": ear, hear, near, year, clear.',
            examples: [
              { word: 'bear', sayItLike: 'bair' },
              { word: 'wear', sayItLike: 'wair' },
              { word: 'pear', sayItLike: 'pair' },
              { word: 'ear', sayItLike: 'eer' },
              { word: 'hear', sayItLike: 'heer' },
              { word: 'clear', sayItLike: 'kleer' },
            ],
          },
        ],
      },
      {
        id: 'e-long',
        number: 3,
        title: 'e = "ee"',
        soundLabel: '"ee" (/iː/)',
        ruleEn: 'A single e says "ee" when it ends a short word, or in the pattern e + consonant + silent e.',
        ruleFr:
          'Un « e » seul se prononce « ee » (/iː/) lorsqu’il termine un mot court, ou dans le schéma e + consonne + e final muet.',
        spokenRule: 'A single e says ee at the end of a short word or with silent e, as in be, he, and theme.',
        groups: [
          {
            words: [
              { word: 'be', sayItLike: 'bee' },
              { word: 'he', sayItLike: 'hee' },
              { word: 'she', sayItLike: 'shee' },
              { word: 'me', sayItLike: 'mee' },
              { word: 'we', sayItLike: 'wee' },
              { word: 'these', sayItLike: 'theez' },
              { word: 'theme', sayItLike: 'theem' },
              { word: 'even', sayItLike: 'EE-ven' },
              { word: 'equal', sayItLike: 'EE-kwul' },
              { word: 'complete', sayItLike: 'kum-PLEET' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'La plupart des mots avec un « e » seul ont un « e » court : bed, red, ten, pen, end, met.',
            titleEn: 'Most single e words say short "e": bed, red, ten, pen, end, met.',
            examples: [
              { word: 'bed', sayItLike: 'bed' },
              { word: 'red', sayItLike: 'red' },
              { word: 'ten', sayItLike: 'ten' },
              { word: 'pen', sayItLike: 'pen' },
              { word: 'end', sayItLike: 'end' },
              { word: 'met', sayItLike: 'met' },
            ],
          },
          {
            titleFr: 'the se prononce « thuh » devant une consonne et « thee » devant une voyelle.',
            titleEn: 'the says "thuh" before a consonant and "thee" before a vowel.',
            examples: [{ word: 'the', sayItLike: 'thuh / thee' }],
          },
          {
            titleFr: 'there et where se prononcent « air » ; were se prononce « wer ».',
            titleEn: 'there and where say "air"; were says "wer".',
            examples: [
              { word: 'there', sayItLike: 'thair' },
              { word: 'where', sayItLike: 'wair' },
              { word: 'were', sayItLike: 'wer' },
            ],
          },
          {
            titleFr: 'Les préfixes re- et de- se prononcent souvent « ri » ou « di » : remember (ri-MEM-ber), decide (di-SIDE).',
            titleEn: 're- and de- prefixes often say "ri" or "di": remember (ri-MEM-ber), decide (di-SIDE).',
            examples: [
              { word: 'remember', sayItLike: 'ri-MEM-ber' },
              { word: 'decide', sayItLike: 'di-SIDE' },
            ],
          },
        ],
      },
      {
        id: 'e-ear',
        number: 4,
        title: 'ea(r) = "er"',
        soundLabel: '"er" (/ɜːr/)',
        ruleEn: 'The letters ear in some words say "er", as in learn. The ea is not pronounced "ee" here.',
        ruleFr:
          'Dans certains mots, « ear » se prononce « er » (/ɜːr/), comme dans learn. Le « ea » ne se prononce pas « ee » ici.',
        spokenRule: 'In words like earn, learn, and earth, e a r says er.',
        groups: [
          {
            words: [
              { word: 'earn', sayItLike: 'ern' },
              { word: 'learn', sayItLike: 'lern' },
              { word: 'early', sayItLike: 'ER-lee' },
              { word: 'earth', sayItLike: 'erth' },
              { word: 'heard', sayItLike: 'herd' },
              { word: 'search', sayItLike: 'serch' },
              { word: 'pearl', sayItLike: 'perl' },
              { word: 'rehearse', sayItLike: 'ri-HERSS' },
              { word: 'earnest', sayItLike: 'ER-nist' },
              { word: 'yearn', sayItLike: 'yern' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'ear se prononce « eer » : ear, hear, near, year, clear, dear, fear, beard.',
            titleEn: 'ear says "eer": ear, hear, near, year, clear, dear, fear, beard.',
            examples: [
              { word: 'ear', sayItLike: 'eer' },
              { word: 'hear', sayItLike: 'heer' },
              { word: 'near', sayItLike: 'neer' },
              { word: 'year', sayItLike: 'yeer' },
              { word: 'beard', sayItLike: 'beerd' },
            ],
          },
          {
            titleFr: 'ear se prononce « air » : bear, wear, pear, swear, tear (déchirer).',
            titleEn: 'ear says "air": bear, wear, pear, swear, tear (to rip).',
            examples: [
              { word: 'bear', sayItLike: 'bair' },
              { word: 'wear', sayItLike: 'wair' },
              { word: 'pear', sayItLike: 'pair' },
              { word: 'swear', sayItLike: 'swair' },
              { word: 'tear', sayItLike: 'tair', spokenText: 'to tear' },
            ],
          },
          {
            titleFr: 'ear se prononce « ar » : heart, hearth.',
            titleEn: 'ear says "ar": heart, hearth.',
            examples: [
              { word: 'heart', sayItLike: 'hart' },
              { word: 'hearth', sayItLike: 'harth' },
            ],
          },
          {
            titleFr: 'wor- se prononce « wer » (même son, orthographe différente) : word, work, world, worth.',
            titleEn: 'wor- says "wer" (the same sound, different spelling): word, work, world, worth.',
            examples: [
              { word: 'word', sayItLike: 'werd' },
              { word: 'work', sayItLike: 'werk' },
              { word: 'world', sayItLike: 'werld' },
              { word: 'worth', sayItLike: 'werth' },
            ],
          },
        ],
      },
      {
        id: 'e-er',
        number: 5,
        title: 'e(r) = "er"',
        soundLabel: '"er" (/ɜːr/)',
        ruleEn: 'A single e followed by r often says "er" (the same sound as in ea(r)). Common in the middle of words.',
        ruleFr:
          'Un « e » seul suivi de « r » se prononce souvent « er » (le même son que ea(r)). Très fréquent au milieu des mots.',
        spokenRule: 'E followed by r often says er, as in her, term, and verb.',
        groups: [
          {
            words: [
              { word: 'her', sayItLike: 'her' },
              { word: 'term', sayItLike: 'term' },
              { word: 'verb', sayItLike: 'verb' },
              { word: 'person', sayItLike: 'PER-sun' },
              { word: 'serve', sayItLike: 'serv' },
              { word: 'nerve', sayItLike: 'nerv' },
              { word: 'germ', sayItLike: 'jerm' },
              { word: 'fern', sayItLike: 'fern' },
              { word: 'perfect', sayItLike: 'PER-fekt' },
              { word: 'expert', sayItLike: 'EK-spert' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'er se prononce « ar » : clerk (britannique : klark), sergeant (SAR-jent), Derby (britannique : DAR-bee).',
            titleEn: 'er says "ar": clerk (British: klark), sergeant (SAR-jent), Derby (British: DAR-bee).',
            examples: [
              { word: 'clerk', sayItLike: 'klark / klerk' },
              { word: 'sergeant', sayItLike: 'SAR-jent' },
              { word: 'Derby', sayItLike: 'DAR-bee' },
            ],
          },
          {
            titleFr: 'ere se prononce « eer » (here, mere, sphere) ou « air » (there, where).',
            titleEn: 'ere says "eer": here, mere, sphere. ere says "air": there, where.',
            examples: [
              { word: 'here', sayItLike: 'heer' },
              { word: 'sphere', sayItLike: 'sfeer' },
              { word: 'there', sayItLike: 'thair' },
              { word: 'where', sayItLike: 'wair' },
            ],
          },
          {
            titleFr: 'er devant une voyelle donne « e » court + r : very, berry, merry, cherry, ferry, terrible.',
            titleEn: 'er before a vowel says short "e" + r: very, berry, merry, cherry, ferry, terrible.',
            examples: [
              { word: 'very', sayItLike: 'VER-ee' },
              { word: 'berry', sayItLike: 'BER-ee' },
              { word: 'merry', sayItLike: 'MER-ee' },
              { word: 'cherry', sayItLike: 'CHER-ee' },
              { word: 'terrible', sayItLike: 'TER-i-bul' },
            ],
          },
          {
            titleFr: '-er non accentué en fin de mot se prononce « uh » : teacher, water, number, brother.',
            titleEn: 'Unstressed -er says "uh": teacher, water, number, brother.',
            examples: [
              { word: 'teacher', sayItLike: 'TEE-cher' },
              { word: 'water', sayItLike: 'WAW-ter' },
              { word: 'number', sayItLike: 'NUM-ber' },
              { word: 'brother', sayItLike: 'BRUTH-er' },
            ],
          },
        ],
      },
      {
        id: 'e-ere',
        number: 6,
        title: 'ere (er + silent e) = "eer"',
        soundLabel: '"eer" (/ɪər/)',
        ruleEn: 'When er is followed by a silent e at the end, the ending ere usually says "eer" (like the word ear): the e is silent but the r is heard.',
        ruleFr:
          'Quand « er » est suivi d’un « e » muet en fin de mot, « ere » se prononce généralement « eer » (comme le mot ear) : le « e » est muet mais le « r » s’entend.',
        spokenRule: 'The ending e r e usually says eer, as in here, sphere, and sincere.',
        groups: [
          {
            words: [
              { word: 'here', sayItLike: 'heer' },
              { word: 'mere', sayItLike: 'meer' },
              { word: 'sphere', sayItLike: 'sfeer' },
              { word: 'severe', sayItLike: 'se-VEER' },
              { word: 'sincere', sayItLike: 'sin-SEER' },
              { word: 'adhere', sayItLike: 'ad-HEER' },
              { word: 'interfere', sayItLike: 'in-ter-FEER' },
              { word: 'atmosphere', sayItLike: 'AT-mus-feer' },
              { word: 'revere', sayItLike: 'ri-VEER' },
              { word: 'austere', sayItLike: 'aw-STEER' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'there et where se prononcent « air » (thair, wair) ; were se prononce « wer ».',
            titleEn: 'there and where say "air" (thair, wair); were says "wer".',
            examples: [
              { word: 'there', sayItLike: 'thair' },
              { word: 'where', sayItLike: 'wair' },
              { word: 'were', sayItLike: 'wer' },
            ],
          },
          {
            titleFr: 'Dans les mots britanniques en -re, cela se prononce « uh » : centre (SEN-ter), metre, theatre, fibre.',
            titleEn: 'ere in British -re words says "uh": centre (SEN-ter), metre, theatre, fibre.',
            examples: [
              { word: 'centre', sayItLike: 'SEN-ter' },
              { word: 'metre', sayItLike: 'MEE-ter' },
              { word: 'theatre', sayItLike: 'THEE-uh-ter' },
              { word: 'fibre', sayItLike: 'FY-ber' },
            ],
          },
          {
            titleFr: 'premiere se prononce « prim-EER » ou « prim-YAIR » ; cashmere se prononce « KASH-meer ».',
            titleEn: 'premiere says "prim-EER" or "prim-YAIR"; cashmere says "KASH-meer".',
            examples: [
              { word: 'premiere', sayItLike: 'prim-EER / prim-YAIR' },
              { word: 'cashmere', sayItLike: 'KASH-meer' },
            ],
          },
          {
            titleFr: 'En vieil anglais, ere (avant) se prononce « air ».',
            titleEn: 'ere in old English: ere (before) says "air".',
            examples: [{ word: 'ere', sayItLike: 'air' }],
          },
        ],
      },
      {
        id: 'e-erve',
        number: 7,
        title: 'er + consonant + silent e = "er"',
        soundLabel: '"er" (/ɜːr/)',
        ruleEn: 'When er is followed by a consonant and a silent e (erve, erse, erge), the er sound stays "er" and the e is silent.',
        ruleFr:
          'Quand « er » est suivi d’une consonne puis d’un « e » muet (erve, erse, erge), le son « er » reste conservé et le « e » final est muet.',
        spokenRule: 'In erve and erse endings, the sound stays er and final E is silent, as in nerve and serve.',
        groups: [
          {
            words: [
              { word: 'nerve', sayItLike: 'nerv' },
              { word: 'serve', sayItLike: 'serv' },
              { word: 'swerve', sayItLike: 'swerv' },
              { word: 'verse', sayItLike: 'vers' },
              { word: 'terse', sayItLike: 'ters' },
              { word: 'reserve', sayItLike: 'ri-ZERV' },
              { word: 'deserve', sayItLike: 'di-ZERV' },
              { word: 'observe', sayItLike: 'ob-ZERV' },
              { word: 'reverse', sayItLike: 'ri-VERS' },
              { word: 'universe', sayItLike: 'YOO-ni-vers' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'erge garde aussi « er » + j : merge (merj), verge, emerge, converge.',
            titleEn: 'erge also says "er" + j: merge (merj), verge, emerge, converge.',
            examples: [
              { word: 'merge', sayItLike: 'merj' },
              { word: 'verge', sayItLike: 'verj' },
              { word: 'emerge', sayItLike: 'i-MERJ' },
              { word: 'converge', sayItLike: 'kun-VERJ' },
            ],
          },
          {
            titleFr: 'e + consonne + e muet se prononce « ee », et non « er » : serene (se-REEN), extreme, supreme, scene.',
            titleEn: 'e + consonant + silent e says "ee", not "er": serene (se-REEN), extreme, supreme, scene.',
            examples: [
              { word: 'serene', sayItLike: 'se-REEN' },
              { word: 'extreme', sayItLike: 'ik-STREEM' },
              { word: 'supreme', sayItLike: 'soo-PREEM' },
              { word: 'scene', sayItLike: 'seen' },
            ],
          },
          {
            titleFr: 'ierce se prononce « eerss » : fierce, pierce.',
            titleEn: 'ierce says "eerss": fierce, pierce.',
            examples: [
              { word: 'fierce', sayItLike: 'feerss' },
              { word: 'pierce', sayItLike: 'peerss' },
            ],
          },
          {
            titleFr: 'erse comme verbe ou nom peut changer d’accent tonique : converse (kun-VERS) / converse (KON-vers).',
            titleEn: 'erse as a verb or noun can change stress: converse (kun-VERS) / converse (KON-vers).',
            examples: [
              { word: 'converse', sayItLike: 'kun-VERS / KON-vers' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'I',
    shortLabel: 'Cours I',
    title: 'Les sons du I',
    titleEn: 'English I Sounds Guide',
    subtitle: 'Les sons i + e, igh, i, ir, ire et ind : 10 exemples par règle et leurs exceptions.',
    accentHex: '#7C3AED',
    lessons: [
      {
        id: 'i-magic-e',
        number: 1,
        title: 'i + e = "eye"',
        soundLabel: '"eye" (/aɪ/)',
        ruleEn: 'I + consonant + silent final E: the i says its name, the long "eye" sound, and the e is silent.',
        ruleFr:
          'Avec i + consonne + e final muet, le « i » dit son nom anglais (le son long « eye » /aɪ/) et le « e » final est muet.',
        spokenRule: 'I with silent final E says eye, as in bike, time, and five.',
        groups: [
          {
            words: [
              { word: 'bike', sayItLike: 'byk' },
              { word: 'time', sayItLike: 'tym' },
              { word: 'five', sayItLike: 'fyv' },
              { word: 'like', sayItLike: 'lyk' },
              { word: 'nice', sayItLike: 'nyss' },
              { word: 'line', sayItLike: 'lyn' },
              { word: 'smile', sayItLike: 'smyl' },
              { word: 'white', sayItLike: 'wyt' },
              { word: 'ride', sayItLike: 'ryd' },
              { word: 'drive', sayItLike: 'dryv' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'give, live (verbe), active, positive gardent le « i » court : giv, liv, AK-tiv.',
            titleEn: 'give, live (verb), active, positive say short "i": giv, liv, AK-tiv.',
            examples: [
              { word: 'give', sayItLike: 'giv' },
              { word: 'live (verb)', sayItLike: 'liv', spokenText: 'to live' },
              { word: 'active', sayItLike: 'AK-tiv' },
              { word: 'positive', sayItLike: 'POZ-i-tiv' },
            ],
          },
          {
            titleFr: '-ine / -ice / -ite se prononcent « ee » dans les mots d’origine française : machine, police, magazine, routine, ski.',
            titleEn: '-ine / -ice / -ite said "ee" in French words: machine (muh-SHEEN), police (puh-LEESS), magazine, routine, ski.',
            examples: [
              { word: 'machine', sayItLike: 'muh-SHEEN' },
              { word: 'police', sayItLike: 'puh-LEESS' },
              { word: 'magazine', sayItLike: 'mag-uh-ZEEN' },
              { word: 'routine', sayItLike: 'roo-TEEN' },
              { word: 'ski', sayItLike: 'skee' },
            ],
          },
          {
            titleFr: '-ine / -ice non accentués se prononcent « in / iss » : engine, medicine, examine, office, practice, notice.',
            titleEn: 'Unstressed -ine / -ice say "in / iss": engine, medicine, examine, office, practice, notice.',
            examples: [
              { word: 'engine', sayItLike: 'EN-jin' },
              { word: 'medicine', sayItLike: 'MED-i-sin' },
              { word: 'examine', sayItLike: 'ig-ZAM-in' },
              { word: 'office', sayItLike: 'OF-iss' },
              { word: 'practice', sayItLike: 'PRAK-tiss' },
              { word: 'notice', sayItLike: 'NOH-tiss' },
            ],
          },
          {
            titleFr: '-ile varie selon l’accent : fragile (FRAJ-ile ou FRAJ-ul), mobile (MOH-bile ou MOH-bul), missile.',
            titleEn: '-ile varies: fragile (FRAJ-ile or FRAJ-ul), mobile (MOH-bile or MOH-bul), missile.',
            examples: [
              { word: 'fragile', sayItLike: 'FRAJ-ile / FRAJ-ul' },
              { word: 'mobile', sayItLike: 'MOH-bile / MOH-bul' },
              { word: 'missile', sayItLike: 'MIS-ile / MIS-ul' },
            ],
          },
        ],
      },
      {
        id: 'i-igh',
        number: 2,
        title: 'i + gh = "eye"',
        soundLabel: '"eye" (/aɪ/)',
        ruleEn: 'The letters igh say "eye": the gh is silent. Very regular, often followed by t.',
        ruleFr: 'Les lettres « igh » se prononcent « eye » (/aɪ/) : le « gh » est muet. Très régulier, souvent suivi d’un « t ».',
        spokenRule: 'The letters i g h say eye with silent g h, as in light, night, and right.',
        groups: [
          {
            words: [
              { word: 'light', sayItLike: 'lyt' },
              { word: 'night', sayItLike: 'nyt' },
              { word: 'right', sayItLike: 'ryt' },
              { word: 'high', sayItLike: 'hy' },
              { word: 'sight', sayItLike: 'syt' },
              { word: 'fight', sayItLike: 'fyt' },
              { word: 'might', sayItLike: 'myt' },
              { word: 'bright', sayItLike: 'bryt' },
              { word: 'tight', sayItLike: 'tyt' },
              { word: 'flight', sayItLike: 'flyt' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'eigh se prononce « ay » : eight, weigh, neighbour, freight, sleigh.',
            titleEn: 'eigh says "ay": eight, weigh, neighbour, freight, sleigh.',
            examples: [
              { word: 'eight', sayItLike: 'ayt' },
              { word: 'weigh', sayItLike: 'way' },
              { word: 'neighbour', sayItLike: 'NAY-ber' },
              { word: 'freight', sayItLike: 'frayt' },
              { word: 'sleigh', sayItLike: 'slay' },
            ],
          },
          {
            titleFr: 'height s’écrit eigh mais se prononce « hyt » (eye), comme igh.',
            titleEn: 'height is spelled eigh but says "hyt" (eye), like igh.',
            examples: [{ word: 'height', sayItLike: 'hyt' }],
          },
          {
            titleFr: 'gh en début de mot se prononce « g » : ghost, ghetto, ghastly (ne fait pas partie de igh).',
            titleEn: 'gh at the start says "g": ghost, ghetto, ghastly (not part of igh).',
            examples: [
              { word: 'ghost', sayItLike: 'gohst' },
              { word: 'ghetto', sayItLike: 'GET-oh' },
              { word: 'ghastly', sayItLike: 'GAST-lee' },
            ],
          },
          {
            titleFr: 'sigh et thigh se terminent par igh : sy, thy (toujours « eye »).',
            titleEn: 'sigh, thigh end the word with igh: sy, thy (still "eye").',
            examples: [
              { word: 'sigh', sayItLike: 'sy' },
              { word: 'thigh', sayItLike: 'thy' },
            ],
          },
        ],
      },
      {
        id: 'i-short',
        number: 3,
        title: 'i (no E) = short "i"',
        soundLabel: 'short "i" (/ɪ/)',
        ruleEn: 'I in a short word with no e at the end: the short "i" sound, as in sit.',
        ruleFr: 'Dans un mot court sans « e » à la fin, la lettre « i » donne le son court « i » (/ɪ/), comme dans sit.',
        spokenRule: 'Short i with no final E says i, as in sit, big, and fish.',
        groups: [
          {
            words: [
              { word: 'sit', sayItLike: 'sit' },
              { word: 'big', sayItLike: 'big' },
              { word: 'pin', sayItLike: 'pin' },
              { word: 'fish', sayItLike: 'fish' },
              { word: 'ship', sayItLike: 'ship' },
              { word: 'milk', sayItLike: 'milk' },
              { word: 'win', sayItLike: 'win' },
              { word: 'lip', sayItLike: 'lip' },
              { word: 'kids', sayItLike: 'kidz' },
              { word: 'pick', sayItLike: 'pik' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'i se prononce « eye » dans certains mots : find, kind, child, mild, wild, climb, pilot, final.',
            titleEn: 'i says "eye" in some words: find, kind, child, mild, wild, climb, pilot, final.',
            examples: [
              { word: 'find', sayItLike: 'fynd' },
              { word: 'child', sayItLike: 'chyld' },
              { word: 'wild', sayItLike: 'wyld' },
              { word: 'climb', sayItLike: 'klym' },
              { word: 'pilot', sayItLike: 'PY-lut' },
            ],
          },
          {
            titleFr: 'i se prononce « ee » : ski, pizza, taxi, kiwi, machine, police.',
            titleEn: 'i says "ee": ski, pizza, taxi, kiwi, machine, police.',
            examples: [
              { word: 'ski', sayItLike: 'skee' },
              { word: 'pizza', sayItLike: 'PEET-suh' },
              { word: 'taxi', sayItLike: 'TAK-see' },
              { word: 'kiwi', sayItLike: 'KEE-wee' },
            ],
          },
          {
            titleFr: 'ie se prononce « e » court (friend) ; ui se prononce « i » court (build, guilty).',
            titleEn: 'ie says short "e": friend (frend). ui says short "i": build (bild), guilty.',
            examples: [
              { word: 'friend', sayItLike: 'frend' },
              { word: 'build', sayItLike: 'bild' },
              { word: 'guilty', sayItLike: 'GIL-tee' },
            ],
          },
          {
            titleFr: 'business se prononce « BIZ-nis » ; women se prononce « WIM-in ».',
            titleEn: 'business says "BIZ-nis"; women says "WIM-in".',
            examples: [
              { word: 'business', sayItLike: 'BIZ-nis' },
              { word: 'women', sayItLike: 'WIM-in' },
            ],
          },
        ],
      },
      {
        id: 'i-ir',
        number: 4,
        title: 'i + r = "er"',
        soundLabel: '"er" (/ɜːr/)',
        ruleEn: 'The letters ir say "er", the same as ear or er in earlier pages: bird, girl, first.',
        ruleFr: 'Les lettres « ir » se prononcent « er » (/ɜːr/), le même son que « ear » ou « er » : bird, girl, first.',
        spokenRule: 'The letters i r say er, as in bird, girl, and first.',
        groups: [
          {
            words: [
              { word: 'bird', sayItLike: 'berd' },
              { word: 'girl', sayItLike: 'gerl' },
              { word: 'first', sayItLike: 'ferst' },
              { word: 'shirt', sayItLike: 'shert' },
              { word: 'third', sayItLike: 'therd' },
              { word: 'dirty', sayItLike: 'DER-tee' },
              { word: 'stir', sayItLike: 'ster' },
              { word: 'skirt', sayItLike: 'skert' },
              { word: 'birth', sayItLike: 'berth' },
              { word: 'thirsty', sayItLike: 'THER-stee' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'ir se prononce « eye-r » dans : iron (EYE-urn), pirate (PY-rit), virus (VY-rus), siren, spiral, iris, irony.',
            titleEn: 'ir says "eye-r" in: iron (EYE-urn), pirate (PY-rit), virus (VY-rus), siren, spiral, iris, irony.',
            examples: [
              { word: 'iron', sayItLike: 'EYE-urn' },
              { word: 'pirate', sayItLike: 'PY-rit' },
              { word: 'virus', sayItLike: 'VY-rus' },
              { word: 'siren', sayItLike: 'SY-ren' },
              { word: 'spiral', sayItLike: 'SPY-rul' },
            ],
          },
          {
            titleFr: 'irr se prononce « i » court + r : mirror (MIR-er), irrigate, irritate, miracle.',
            titleEn: 'irr says short "i" + r: mirror (MIR-er), irrigate, irritate, miracle.',
            examples: [
              { word: 'mirror', sayItLike: 'MIR-er' },
              { word: 'irrigate', sayItLike: 'IR-i-gayt' },
              { word: 'irritate', sayItLike: 'IR-i-tayt' },
              { word: 'miracle', sayItLike: 'MIR-uh-kul' },
            ],
          },
          {
            titleFr: 'Irish se prononce « EYE-rish » ; Ireland se prononce « EYE-er-lund ».',
            titleEn: 'Irish says "EYE-rish"; Ireland says "EYE-er-lund".',
            examples: [
              { word: 'Irish', sayItLike: 'EYE-rish' },
              { word: 'Ireland', sayItLike: 'EYE-er-lund' },
            ],
          },
          {
            titleFr: 'ir dans certains mots français se prononce « eer » : souvenir (soo-ve-NEER).',
            titleEn: 'ir in French words says "eer": souvenir (soo-ve-NEER).',
            examples: [{ word: 'souvenir', sayItLike: 'soo-ve-NEER' }],
          },
        ],
      },
      {
        id: 'i-ire',
        number: 5,
        title: 'i + re = "eye-er"',
        soundLabel: '"eye-er" (/aɪər/)',
        ruleEn: 'The ending ire says "eye" + "er": two sounds in a row (FY-er). The e is silent.',
        ruleFr: 'La terminaison « ire » se prononce « eye » + « er » : deux sons qui s’enchaînent (FY-er). Le « e » final est muet.',
        spokenRule: 'The ending i r e says eye er, as in fire, tire, and inspire.',
        groups: [
          {
            words: [
              { word: 'fire', sayItLike: 'FY-er' },
              { word: 'tire', sayItLike: 'TY-er' },
              { word: 'hire', sayItLike: 'HY-er' },
              { word: 'wire', sayItLike: 'WY-er' },
              { word: 'desire', sayItLike: 'di-ZY-er' },
              { word: 'entire', sayItLike: 'en-TY-er' },
              { word: 'empire', sayItLike: 'EM-py-er' },
              { word: 'require', sayItLike: 'ri-KWY-er' },
              { word: 'inspire', sayItLike: 'in-SPY-er' },
              { word: 'admire', sayItLike: 'ad-MY-er' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: '-shire dans les noms de comtés se prononce « shur » ou « sheer » : Yorkshire, Cheshire, Hampshire.',
            titleEn: '-shire in county names says "shur" or "sheer": Yorkshire, Cheshire, Hampshire.',
            examples: [
              { word: 'Yorkshire', sayItLike: 'YORK-shur' },
              { word: 'Cheshire', sayItLike: 'CHESH-ur' },
              { word: 'Hampshire', sayItLike: 'HAMP-shur' },
            ],
          },
          {
            titleFr: 'ire + ing / y ajoute un son supplémentaire : fiery (FY-er-ee), wiry, tiring.',
            titleEn: 'ire + ing / y adds an extra sound: fiery (FY-er-ee), wiry, tiring.',
            examples: [
              { word: 'fiery', sayItLike: 'FY-er-ee' },
              { word: 'wiry', sayItLike: 'WY-er-ee' },
              { word: 'tiring', sayItLike: 'TY-er-ing' },
            ],
          },
          {
            titleFr: 'satire se prononce « SAT-eye-er » ; ire + s ajoute un z : fires, tires, wires.',
            titleEn: 'satire says "SAT-eye-er"; ire + s: fires, tires, wires (add z).',
            examples: [
              { word: 'satire', sayItLike: 'SAT-eye-er' },
              { word: 'fires', sayItLike: 'FY-erz' },
              { word: 'tires', sayItLike: 'TY-erz' },
              { word: 'wires', sayItLike: 'WY-erz' },
            ],
          },
          {
            titleFr: 'En anglais britannique parlé, ire se prononce souvent « eye-uh » (fire = FY-uh).',
            titleEn: 'In British speech ire often says "eye-uh" (fire = FY-uh).',
            examples: [{ word: 'fire', sayItLike: 'FY-uh (UK)' }],
          },
        ],
      },
      {
        id: 'i-ind',
        number: 6,
        title: 'ind = "eynd" (long i)',
        soundLabel: '"eynd" (/aɪnd/)',
        ruleEn: 'The letters ind often say "eye" + nd: i says "eye", as in find.',
        ruleFr: 'Les lettres « ind » se prononcent souvent « eye » + « nd » : le « i » prend le son long « eye », comme dans find.',
        spokenRule: 'The letters i n d often say eynd with a long i, as in find, kind, and mind.',
        groups: [
          {
            words: [
              { word: 'find', sayItLike: 'fynd' },
              { word: 'kind', sayItLike: 'kynd' },
              { word: 'mind', sayItLike: 'mynd' },
              { word: 'behind', sayItLike: 'bi-HYND' },
              { word: 'blind', sayItLike: 'blynd' },
              { word: 'grind', sayItLike: 'grynd' },
              { word: 'remind', sayItLike: 'ri-MYND' },
              { word: 'bind', sayItLike: 'bynd' },
              { word: 'wind (to turn)', sayItLike: 'wynd', spokenText: 'to wind' },
              { word: 'unkind', sayItLike: 'un-KYND' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'wind (le vent) a un « i » court : wind. Seul le verbe (remonter une horloge) se prononce « wynd ».',
            titleEn: 'wind (air moving) says short "i": wind. Only the verb (to wind a clock) says "wynd".',
            examples: [
              { word: 'wind (air)', sayItLike: 'wind', spokenText: 'the wind' },
              { word: 'wind (verb)', sayItLike: 'wynd', spokenText: 'to wind' },
            ],
          },
          {
            titleFr: 'ind en début de mot se prononce « in » court : India, indeed, index, indoor, industry, individual.',
            titleEn: 'ind at the start of a word says short "in": India, indeed, index, indoor, industry, individual.',
            examples: [
              { word: 'India', sayItLike: 'IN-dee-uh' },
              { word: 'indeed', sayItLike: 'in-DEED' },
              { word: 'index', sayItLike: 'IN-deks' },
              { word: 'indoor', sayItLike: 'IN-dor' },
              { word: 'industry', sayItLike: 'IN-duh-stree' },
            ],
          },
          {
            titleFr: 'ind avec « i » court : window (WIN-doh), windy (WIN-dee), spindle, kindle (KIN-dul), kindergarten.',
            titleEn: 'ind with short i: window (WIN-doh), windy (WIN-dee), spindle, kindle (KIN-dul), kindergarten.',
            examples: [
              { word: 'window', sayItLike: 'WIN-doh' },
              { word: 'windy', sayItLike: 'WIN-dee' },
              { word: 'spindle', sayItLike: 'SPIN-dul' },
              { word: 'kindle', sayItLike: 'KIN-dul' },
              { word: 'kindergarten', sayItLike: 'KIN-der-gar-ten' },
            ],
          },
          {
            titleFr: 'wound (blessure) se prononce « woond » ; wound (passé de wind) se prononce « wownd ».',
            titleEn: 'wound (injury) says "woond"; wound (past of wind) says "wownd".',
            examples: [{ word: 'wound', sayItLike: 'woond / wownd' }],
          },
        ],
      },
    ],
  },
  {
    id: 'O',
    shortLabel: 'Cours O',
    title: 'Les sons du O',
    titleEn: 'English O Sounds Guide',
    subtitle: 'Les sons o + e, o, oo, or, ow et oy : 10 exemples par règle et leurs exceptions.',
    accentHex: '#D97706',
    lessons: [
      {
        id: 'o-magic-e',
        number: 1,
        title: 'o + e = "oh"',
        soundLabel: '"oh" (/oʊ/)',
        ruleEn: 'O + consonant + silent final E: the o says its name, the long "oh" sound, and the e is silent.',
        ruleFr: 'Avec o + consonne + e final muet, le « o » dit son nom anglais (le son long « oh » /oʊ/) et le « e » final est muet.',
        spokenRule: 'O with silent final E says oh, as in home, bone, and nose.',
        groups: [
          {
            words: [
              { word: 'home', sayItLike: 'hohm' },
              { word: 'bone', sayItLike: 'bohn' },
              { word: 'nose', sayItLike: 'nohz' },
              { word: 'rope', sayItLike: 'rohp' },
              { word: 'stone', sayItLike: 'stohn' },
              { word: 'hope', sayItLike: 'hohp' },
              { word: 'note', sayItLike: 'noht' },
              { word: 'smoke', sayItLike: 'smohk' },
              { word: 'those', sayItLike: 'thohz' },
              { word: 'phone', sayItLike: 'fohn' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'done, come, some, love, glove, above, dove se prononcent « uh » : dun, kum, sum, luv.',
            titleEn: 'done, come, some, love, glove, above, dove say "uh": dun, kum, sum, luv.',
            examples: [
              { word: 'done', sayItLike: 'dun' },
              { word: 'come', sayItLike: 'kum' },
              { word: 'some', sayItLike: 'sum' },
              { word: 'love', sayItLike: 'luv' },
              { word: 'glove', sayItLike: 'gluv' },
              { word: 'above', sayItLike: 'uh-BUV' },
              { word: 'dove', sayItLike: 'duv' },
            ],
          },
          {
            titleFr: 'move, prove, lose se prononcent « oo » : moov, proov, looz.',
            titleEn: 'move, prove, lose say "oo": moov, proov, looz.',
            examples: [
              { word: 'move', sayItLike: 'moov' },
              { word: 'prove', sayItLike: 'proov' },
              { word: 'lose', sayItLike: 'looz' },
            ],
          },
          {
            titleFr: 'gone a un « o » court (gon) ; one se prononce « wun » ; once se prononce « wunss ».',
            titleEn: 'gone says short "o" (gon); one says "wun"; once says "wunss".',
            examples: [
              { word: 'gone', sayItLike: 'gon' },
              { word: 'one', sayItLike: 'wun' },
              { word: 'once', sayItLike: 'wunss' },
            ],
          },
          {
            titleFr: '-ore se prononce « or », et non « oh » : more, store, before, score.',
            titleEn: '-ore says "or", not "oh": more, store, before, score.',
            examples: [
              { word: 'more', sayItLike: 'mor' },
              { word: 'store', sayItLike: 'stor' },
              { word: 'before', sayItLike: 'bi-FOR' },
              { word: 'score', sayItLike: 'skor' },
            ],
          },
        ],
      },
      {
        id: 'o-end',
        number: 2,
        title: 'o at the end = "oh"',
        soundLabel: '"oh" (/oʊ/)',
        ruleEn: 'O at the end of a word, or at the end of a syllable, usually says "oh".',
        ruleFr: 'À la fin d’un mot ou d’une syllabe, la lettre « o » se prononce généralement « oh » (/oʊ/).',
        spokenRule: 'O at the end of a word or syllable usually says oh, as in go, hello, and piano.',
        groups: [
          {
            words: [
              { word: 'go', sayItLike: 'goh' },
              { word: 'no', sayItLike: 'noh' },
              { word: 'so', sayItLike: 'soh' },
              { word: 'hello', sayItLike: 'heh-LOH' },
              { word: 'photo', sayItLike: 'FOH-toh' },
              { word: 'piano', sayItLike: 'pee-AN-oh' },
              { word: 'radio', sayItLike: 'RAY-dee-oh' },
              { word: 'video', sayItLike: 'VID-ee-oh' },
              { word: 'zero', sayItLike: 'ZEER-oh' },
              { word: 'hero', sayItLike: 'HEER-oh' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'do, to, who, two se prononcent « oo » : doo, too, hoo, too.',
            titleEn: 'do, to, who, two say "oo": doo, too, hoo, too.',
            examples: [
              { word: 'do', sayItLike: 'doo' },
              { word: 'to', sayItLike: 'too' },
              { word: 'who', sayItLike: 'hoo' },
              { word: 'two', sayItLike: 'too' },
            ],
          },
          {
            titleFr: 'o à l’intérieur d’un mot est souvent court : body (BOD-ee), copy (KOP-ee), problem, modern.',
            titleEn: 'o inside a word is often short: body (BOD-ee), copy (KOP-ee), problem, modern.',
            examples: [
              { word: 'body', sayItLike: 'BOD-ee' },
              { word: 'copy', sayItLike: 'KOP-ee' },
              { word: 'problem', sayItLike: 'PROB-lem' },
              { word: 'modern', sayItLike: 'MOD-ern' },
            ],
          },
          {
            titleFr: 'potato et tomato se prononcent « oh » à la fin mais « uh » au début (puh-TAY-toh).',
            titleEn: 'potato, tomato say "oh" at the end of the word but "uh" at the start (puh-TAY-toh).',
            examples: [
              { word: 'potato', sayItLike: 'puh-TAY-toh' },
              { word: 'tomato', sayItLike: 'tuh-MAY-toh' },
            ],
          },
          {
            titleFr: 'Au pluriel, -o prend es : potatoes, heroes, tomatoes (même son « ohz »).',
            titleEn: '-o in plurals adds es: potatoes, heroes, tomatoes (same "ohz" sound).',
            examples: [
              { word: 'potatoes', sayItLike: 'puh-TAY-tohz' },
              { word: 'heroes', sayItLike: 'HEER-ohz' },
              { word: 'tomatoes', sayItLike: 'tuh-MAY-tohz' },
            ],
          },
        ],
      },
      {
        id: 'o-short',
        number: 3,
        title: 'o (middle, no E) = short "o"',
        soundLabel: 'short "o" (/ɒ/ · /ɑː/)',
        ruleEn: 'O in the middle of a short word, with no e at the end: a short "o" sound ("ah" in American English).',
        ruleFr: 'Au milieu d’un mot court sans « e » final, le « o » prend un son « o » court (« ah » en anglais américain), comme dans hot.',
        spokenRule: 'Short o in the middle of a word says o, as in hot, dog, and stop.',
        groups: [
          {
            words: [
              { word: 'hot', sayItLike: 'hot' },
              { word: 'dog', sayItLike: 'dog' },
              { word: 'stop', sayItLike: 'stop' },
              { word: 'box', sayItLike: 'boks' },
              { word: 'top', sayItLike: 'top' },
              { word: 'clock', sayItLike: 'klok' },
              { word: 'doll', sayItLike: 'dol' },
              { word: 'pot', sayItLike: 'pot' },
              { word: 'job', sayItLike: 'job' },
              { word: 'shop', sayItLike: 'shop' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'o se prononce « uh » : mother, brother, other, son, month, money, monkey, love, come.',
            titleEn: 'o says "uh": mother, brother, other, son, month, money, monkey, love, come.',
            examples: [
              { word: 'mother', sayItLike: 'MUTH-er' },
              { word: 'brother', sayItLike: 'BRUTH-er' },
              { word: 'son', sayItLike: 'sun' },
              { word: 'month', sayItLike: 'munth' },
              { word: 'money', sayItLike: 'MUN-ee' },
            ],
          },
          {
            titleFr: 'o se prononce « oh » devant ld, st, lt, ll : old, cold, gold, most, post, bolt, roll, both, host.',
            titleEn: 'o says "oh" before ld, st, lt, ll: old, cold, gold, most, post, bolt, roll, both, host.',
            examples: [
              { word: 'old', sayItLike: 'ohld' },
              { word: 'cold', sayItLike: 'kohld' },
              { word: 'gold', sayItLike: 'gohld' },
              { word: 'most', sayItLike: 'mohst' },
              { word: 'roll', sayItLike: 'rohl' },
            ],
          },
          {
            titleFr: 'o se prononce « oo » : do, to, who, move, prove, lose, whose.',
            titleEn: 'o says "oo": do, to, who, move, prove, lose, whose.',
            examples: [
              { word: 'who', sayItLike: 'hoo' },
              { word: 'whose', sayItLike: 'hooz' },
              { word: 'move', sayItLike: 'moov' },
            ],
          },
          {
            titleFr: 'o se prononce « aw » devant ng, ss, th, ft dans beaucoup d’accents : long, song, cost, off, cloth.',
            titleEn: 'o says "aw" in many accents before ng, ss, th, ft: long, song, cost, off, cloth.',
            examples: [
              { word: 'long', sayItLike: 'lawng' },
              { word: 'song', sayItLike: 'sawng' },
              { word: 'cost', sayItLike: 'kawst' },
              { word: 'off', sayItLike: 'awf' },
              { word: 'cloth', sayItLike: 'klawth' },
            ],
          },
        ],
      },
      {
        id: 'o-oo',
        number: 4,
        title: 'oo = long "oo"',
        soundLabel: 'long "oo" (/uː/)',
        ruleEn: 'The double letters oo usually make the long "oo" sound, as in moon.',
        ruleFr: 'Les doubles lettres « oo » produisent généralement le son long « oo » (/uː/, comme « ou » dans moon).',
        spokenRule: 'Double o usually makes the long oo sound, as in moon, food, and school.',
        groups: [
          {
            words: [
              { word: 'moon', sayItLike: 'moon' },
              { word: 'food', sayItLike: 'food' },
              { word: 'school', sayItLike: 'skool' },
              { word: 'room', sayItLike: 'room' },
              { word: 'cool', sayItLike: 'kool' },
              { word: 'pool', sayItLike: 'pool' },
              { word: 'spoon', sayItLike: 'spoon' },
              { word: 'tool', sayItLike: 'tool' },
              { word: 'boot', sayItLike: 'boot' },
              { word: 'zoo', sayItLike: 'zoo' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: '« oo » court (comme put) : book, look, good, foot, cook, took, wood, wool, stood, hook.',
            titleEn: 'Short "oo" (like put): book, look, good, foot, cook, took, wood, wool, stood, hook.',
            examples: [
              { word: 'book', sayItLike: 'buk' },
              { word: 'look', sayItLike: 'luk' },
              { word: 'good', sayItLike: 'gud' },
              { word: 'foot', sayItLike: 'fut' },
              { word: 'cook', sayItLike: 'kuk' },
            ],
          },
          {
            titleFr: 'oo se prononce « uh » : blood (blud), flood (flud).',
            titleEn: 'oo says "uh": blood (blud), flood (flud).',
            examples: [
              { word: 'blood', sayItLike: 'blud' },
              { word: 'flood', sayItLike: 'flud' },
            ],
          },
          {
            titleFr: 'oor se prononce « or » : door (dor), floor (flor) ; poor se prononce « poor » ou « por ».',
            titleEn: 'oor says "or": door (dor), floor (flor); poor says "poor" or "por".',
            examples: [
              { word: 'door', sayItLike: 'dor' },
              { word: 'floor', sayItLike: 'flor' },
              { word: 'poor', sayItLike: 'poor / por' },
            ],
          },
          {
            titleFr: 'oo en deux sons séparés : zoology (zoh-OL-uh-jee), cooperate (koh-OP-uh-rayt).',
            titleEn: 'oo as two sounds: zoology (zoh-OL-uh-jee), cooperate (koh-OP-uh-rayt).',
            examples: [
              { word: 'zoology', sayItLike: 'zoh-OL-uh-jee' },
              { word: 'cooperate', sayItLike: 'koh-OP-uh-rayt' },
            ],
          },
        ],
      },
      {
        id: 'o-or',
        number: 5,
        title: 'or = "or"',
        soundLabel: '"or" (/ɔːr/)',
        ruleEn: 'The letters or say "or" (an open o + r): the vowel is long and the r is pronounced.',
        ruleFr: 'Les lettres « or » se prononcent « or » (un « o » ouvert + r) : la voyelle est longue et le « r » est prononcé.',
        spokenRule: 'The letters o r say or, as in for, horse, and short.',
        groups: [
          {
            words: [
              { word: 'for', sayItLike: 'for' },
              { word: 'horse', sayItLike: 'hors' },
              { word: 'short', sayItLike: 'short' },
              { word: 'sport', sayItLike: 'sport' },
              { word: 'north', sayItLike: 'north' },
              { word: 'corn', sayItLike: 'korn' },
              { word: 'fork', sayItLike: 'fork' },
              { word: 'morning', sayItLike: 'MOR-ning' },
              { word: 'born', sayItLike: 'born' },
              { word: 'storm', sayItLike: 'storm' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'wor- se prononce « wer » : word, work, world, worth, worm, worse.',
            titleEn: 'wor- says "wer": word, work, world, worth, worm, worse.',
            examples: [
              { word: 'word', sayItLike: 'werd' },
              { word: 'work', sayItLike: 'werk' },
              { word: 'world', sayItLike: 'werld' },
              { word: 'worth', sayItLike: 'werth' },
              { word: 'worse', sayItLike: 'werss' },
            ],
          },
          {
            titleFr: '-or non accentué se prononce « er » : actor, doctor, visitor, color, error, mirror.',
            titleEn: 'Unstressed -or says "er": actor, doctor, visitor, color, error, mirror.',
            examples: [
              { word: 'actor', sayItLike: 'AK-ter' },
              { word: 'doctor', sayItLike: 'DOK-ter' },
              { word: 'visitor', sayItLike: 'VIZ-i-ter' },
              { word: 'color', sayItLike: 'KUL-er' },
            ],
          },
          {
            titleFr: 'orr et certains mots en or ont un « o » court : sorry (SOR-ee), orange (OR-inj), forest (FOR-ist), tomorrow, horrible.',
            titleEn: 'orr and some or words have a short "o": sorry (SOR-ee), orange (OR-inj), forest (FOR-ist), tomorrow, horrible.',
            examples: [
              { word: 'sorry', sayItLike: 'SOR-ee' },
              { word: 'orange', sayItLike: 'OR-inj' },
              { word: 'forest', sayItLike: 'FOR-ist' },
              { word: 'tomorrow', sayItLike: 'tuh-MOR-oh' },
              { word: 'horrible', sayItLike: 'HOR-i-bul' },
            ],
          },
          {
            titleFr: 'ore, oar, oor se prononcent aussi « or » : more, store, board, door, floor.',
            titleEn: 'ore, oar, oor also say "or": more, store, board, door, floor.',
            examples: [
              { word: 'more', sayItLike: 'mor' },
              { word: 'board', sayItLike: 'bord' },
              { word: 'door', sayItLike: 'dor' },
              { word: 'floor', sayItLike: 'flor' },
            ],
          },
        ],
      },
      {
        id: 'o-ow',
        number: 6,
        title: 'ow = "ow"',
        soundLabel: '"ow" (/aʊ/)',
        ruleEn: 'The letters ow often say "ow", as in cow (the sound you make when something hurts).',
        ruleFr: 'Les lettres « ow » se prononcent souvent « ow » (/aʊ/, « aou »), comme dans cow.',
        spokenRule: 'The letters o w often say ow, as in cow, now, and down.',
        groups: [
          {
            words: [
              { word: 'cow', sayItLike: 'kow' },
              { word: 'now', sayItLike: 'now' },
              { word: 'how', sayItLike: 'how' },
              { word: 'down', sayItLike: 'down' },
              { word: 'town', sayItLike: 'town' },
              { word: 'brown', sayItLike: 'brown' },
              { word: 'crowd', sayItLike: 'krowd' },
              { word: 'owl', sayItLike: 'owl' },
              { word: 'flower', sayItLike: 'FLOW-er' },
              { word: 'power', sayItLike: 'POW-er' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'ow se prononce « oh » : snow, show, grow, know, low, slow, yellow, window, below, own, flow.',
            titleEn: 'ow says "oh": snow, show, grow, know, low, slow, yellow, window, below, own, flow.',
            examples: [
              { word: 'snow', sayItLike: 'snoh' },
              { word: 'show', sayItLike: 'shoh' },
              { word: 'grow', sayItLike: 'groh' },
              { word: 'know', sayItLike: 'noh' },
              { word: 'yellow', sayItLike: 'YEL-oh' },
              { word: 'window', sayItLike: 'WIN-doh' },
            ],
          },
          {
            titleFr: 'bow, row, sow ont deux sons : bow (ow / oh), row (ow, dispute / oh, rangée).',
            titleEn: 'bow, row, sow have two sounds: bow (ow) / bow (oh), row (ow, noise) / row (oh, line).',
            examples: [
              { word: 'bow', sayItLike: 'bow / boh' },
              { word: 'row', sayItLike: 'row / roh' },
            ],
          },
          {
            titleFr: 'knowledge se prononce « NOL-ij » ; -ow non accentué se prononce « oh » ou « uh » : tomorrow, narrow, pillow.',
            titleEn: 'knowledge says "NOL-ij"; -ow unstressed says "oh" or "uh": tomorrow, narrow, pillow.',
            examples: [
              { word: 'knowledge', sayItLike: 'NOL-ij' },
              { word: 'narrow', sayItLike: 'NAR-oh' },
              { word: 'pillow', sayItLike: 'PIL-oh' },
            ],
          },
          {
            titleFr: 'ow + er ajoute une syllabe : coward (KOW-erd), shower (SHOW-er), tower.',
            titleEn: 'ow + er adds an extra sound: coward (KOW-erd), shower (SHOW-er), tower.',
            examples: [
              { word: 'coward', sayItLike: 'KOW-erd' },
              { word: 'shower', sayItLike: 'SHOW-er' },
              { word: 'tower', sayItLike: 'TOW-er' },
            ],
          },
        ],
      },
      {
        id: 'o-oy',
        number: 7,
        title: 'oy = "oy"',
        soundLabel: '"oy" (/ɔɪ/)',
        ruleEn: 'The letters oy say "oy" (as in boy): an o sound sliding into an ee sound. The spelling oi says the same.',
        ruleFr: 'Les lettres « oy » se prononcent « oy » (/ɔɪ/, comme dans boy) : un son « o » qui glisse vers « i ». L’orthographe « oi » produit le même son.',
        spokenRule: 'The letters o y say oy, as in boy, toy, and joy.',
        groups: [
          {
            words: [
              { word: 'boy', sayItLike: 'boy' },
              { word: 'toy', sayItLike: 'toy' },
              { word: 'joy', sayItLike: 'joy' },
              { word: 'enjoy', sayItLike: 'en-JOY' },
              { word: 'royal', sayItLike: 'ROY-ul' },
              { word: 'annoy', sayItLike: 'uh-NOY' },
              { word: 'destroy', sayItLike: 'di-STROY' },
              { word: 'employ', sayItLike: 'em-PLOY' },
              { word: 'loyal', sayItLike: 'LOY-ul' },
              { word: 'voyage', sayItLike: 'VOY-ij' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'oi produit le même son « oy » : oil, coin, noise, point, voice, join, boil.',
            titleEn: 'oi says "oy": oil, coin, noise, point, voice, join, boil.',
            examples: [
              { word: 'oil', sayItLike: 'oyl' },
              { word: 'coin', sayItLike: 'koyn' },
              { word: 'noise', sayItLike: 'noyz' },
              { word: 'point', sayItLike: 'poynt' },
              { word: 'voice', sayItLike: 'voyss' },
            ],
          },
          {
            titleFr: 'choir se prononce « KWY-er » ; memoir se prononce « MEM-war » ; reservoir se prononce « REZ-er-vwar ».',
            titleEn: 'choir says "KWY-er"; memoir says "MEM-war"; reservoir says "REZ-er-vwar".',
            examples: [
              { word: 'choir', sayItLike: 'KWY-er' },
              { word: 'memoir', sayItLike: 'MEM-war' },
              { word: 'reservoir', sayItLike: 'REZ-er-vwar' },
            ],
          },
          {
            titleFr: 'tortoise se prononce « TOR-tus » ; porpoise se prononce « POR-pus ».',
            titleEn: 'tortoise says "TOR-tus"; porpoise says "POR-pus".',
            examples: [
              { word: 'tortoise', sayItLike: 'TOR-tus' },
              { word: 'porpoise', sayItLike: 'POR-pus' },
            ],
          },
          {
            titleFr: 'oy devant une voyelle garde son son : voyage, royal, loyal, enjoyable.',
            titleEn: 'oy before a vowel keeps its sound: voyage, royal, loyal, enjoyable.',
            examples: [{ word: 'enjoyable', sayItLike: 'en-JOY-uh-bul' }],
          },
        ],
      },
    ],
  },
  {
    id: 'U',
    shortLabel: 'Cours U',
    title: 'Les sons du U',
    titleEn: 'English U Sounds Guide',
    subtitle: 'Les sons u + e, u et ur : 10 exemples par règle avec prononciation et exceptions.',
    accentHex: '#DB2777',
    lessons: [
      {
        id: 'u-magic-e',
        number: 1,
        title: 'u + e = long "u"',
        soundLabel: 'long "u" / "yoo" (/juː/)',
        ruleEn: 'U + consonant + silent final E: the u says its name, the long "yoo" sound (like the word you), and the e is silent.',
        ruleFr: 'Avec u + consonne + e final muet, le « u » dit son nom anglais (le son long « yoo » /juː/, comme you) et le « e » est muet.',
        spokenRule: 'U with silent final E says yoo, as in cube, tube, and cute.',
        groups: [
          {
            words: [
              { word: 'cube', sayItLike: 'kyoob' },
              { word: 'tube', sayItLike: 'tyoob' },
              { word: 'tune', sayItLike: 'tyoon' },
              { word: 'use (verb)', sayItLike: 'yooz', spokenText: 'to use' },
              { word: 'huge', sayItLike: 'hyooj' },
              { word: 'cute', sayItLike: 'kyoot' },
              { word: 'mule', sayItLike: 'myool' },
              { word: 'fuse', sayItLike: 'fyooz' },
              { word: 'pure', sayItLike: 'pyoor' },
              { word: 'excuse (verb)', sayItLike: 'ik-SKYOOZ', spokenText: 'to excuse' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'Après r, l, j, ch, le u se prononce « oo » sans « y » : rule (rool), June (joon), flute (floot), Luke, chute (shoot).',
            titleEn: 'After r, l, j, ch the u says "oo" with no "y": rule (rool), June (joon), flute (floot), Luke, chute (shoot).',
            examples: [
              { word: 'rule', sayItLike: 'rool' },
              { word: 'June', sayItLike: 'joon' },
              { word: 'flute', sayItLike: 'floot' },
              { word: 'Luke', sayItLike: 'look' },
              { word: 'chute', sayItLike: 'shoot' },
            ],
          },
          {
            titleFr: 'use et excuse comme noms se terminent par un « s » sifflant : use (yooss), excuse (ik-SKYOOSS).',
            titleEn: 'use and excuse as nouns end with a hissing s: use (yooss), excuse (ik-SKYOOSS).',
            examples: [
              { word: 'use (noun)', sayItLike: 'yooss', spokenText: 'a good use' },
              { word: 'excuse (noun)', sayItLike: 'ik-SKYOOSS', spokenText: 'an excuse' },
            ],
          },
          {
            titleFr: '-ure non accentué se prononce « cher » : picture, nature, future, culture, adventure.',
            titleEn: '-ure unstressed says "cher": picture, nature, future, culture, adventure.',
            examples: [
              { word: 'picture', sayItLike: 'PIK-cher' },
              { word: 'nature', sayItLike: 'NAY-cher' },
              { word: 'future', sayItLike: 'FYOO-cher' },
              { word: 'culture', sayItLike: 'KUL-cher' },
              { word: 'adventure', sayItLike: 'ad-VEN-cher' },
            ],
          },
          {
            titleFr: 'sure se dit « shoor » ; minute (temps) se dit « MIN-it » ; volume « VOL-yoom » ; schedule « SKEJ-ool ».',
            titleEn: 'sure says "shoor"; minute (the time) says "MIN-it"; volume says "VOL-yoom"; schedule says "SKEJ-ool".',
            examples: [
              { word: 'sure', sayItLike: 'shoor' },
              { word: 'minute', sayItLike: 'MIN-it' },
              { word: 'volume', sayItLike: 'VOL-yoom' },
              { word: 'schedule', sayItLike: 'SKEJ-ool' },
            ],
          },
        ],
      },
      {
        id: 'u-short',
        number: 2,
        title: 'u (no E) = short "u" ("uh")',
        soundLabel: 'short "u" / "uh" (/ʌ/)',
        ruleEn: 'U in a short word with no e at the end: a short "uh" sound, as in cup. It is the lazy, relaxed sound.',
        ruleFr: 'Dans un mot court sans « e » à la fin, le « u » donne un son court « uh » (/ʌ/), comme dans cup. C’est un son relâché et détendu.',
        spokenRule: 'Short u with no final E says uh, as in cup, bus, and sun.',
        groups: [
          {
            words: [
              { word: 'cup', sayItLike: 'kup' },
              { word: 'bus', sayItLike: 'bus' },
              { word: 'sun', sayItLike: 'sun' },
              { word: 'run', sayItLike: 'run' },
              { word: 'fun', sayItLike: 'fun' },
              { word: 'duck', sayItLike: 'duk' },
              { word: 'jump', sayItLike: 'jump' },
              { word: 'drum', sayItLike: 'drum' },
              { word: 'mud', sayItLike: 'mud' },
              { word: 'lunch', sayItLike: 'lunch' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'u se prononce « oo » court (comme put) : put, push, pull, full, bull, bush, sugar (SHOOG-er), pudding.',
            titleEn: 'u says short "oo" (like put): put, push, pull, full, bull, bush, sugar (SHOOG-er), pudding.',
            examples: [
              { word: 'put', sayItLike: 'put' },
              { word: 'push', sayItLike: 'push' },
              { word: 'pull', sayItLike: 'pul' },
              { word: 'full', sayItLike: 'ful' },
              { word: 'sugar', sayItLike: 'SHOOG-er' },
            ],
          },
          {
            titleFr: 'u se prononce « yoo » : music (MYOO-zik), student, human, unit, menu, usual, uniform.',
            titleEn: 'u says "yoo": music (MYOO-zik), student, human, unit, menu, usual, uniform.',
            examples: [
              { word: 'music', sayItLike: 'MYOO-zik' },
              { word: 'student', sayItLike: 'STYOO-dent' },
              { word: 'human', sayItLike: 'HYOO-mun' },
              { word: 'menu', sayItLike: 'MEN-yoo' },
            ],
          },
          {
            titleFr: 'u se prononce « oo » dans quelques mots : ruby (ROO-bee), super (SOO-per), truth, ruler.',
            titleEn: 'u says "oo" in a few words: ruby (ROO-bee), super (SOO-per), truth, ruler.',
            examples: [
              { word: 'ruby', sayItLike: 'ROO-bee' },
              { word: 'super', sayItLike: 'SOO-per' },
              { word: 'truth', sayItLike: 'trooth' },
              { word: 'ruler', sayItLike: 'ROO-ler' },
            ],
          },
          {
            titleFr: 'u prend d’autres voyelles : busy (BIZ-ee, i court), bury (BER-ee, e court), minute (MIN-it).',
            titleEn: 'u says other vowels: busy (BIZ-ee, short i), bury (BER-ee, short e), minute (MIN-it).',
            examples: [
              { word: 'busy', sayItLike: 'BIZ-ee' },
              { word: 'bury', sayItLike: 'BER-ee' },
              { word: 'minute', sayItLike: 'MIN-it' },
            ],
          },
          {
            titleFr: 'qu = « kw » (queen, quick, quit). ui varie : build (bild), fruit (froot), juice (joos), guitar (gi-TAR).',
            titleEn: 'qu = "kw": queen, quick, quit: the u says "w". ui varies: build (bild), fruit (froot), juice (joos), guitar (gi-TAR).',
            examples: [
              { word: 'queen', sayItLike: 'kween' },
              { word: 'build', sayItLike: 'bild' },
              { word: 'fruit', sayItLike: 'froot' },
              { word: 'juice', sayItLike: 'joos' },
              { word: 'guitar', sayItLike: 'gi-TAR' },
            ],
          },
        ],
      },
      {
        id: 'u-ur',
        number: 3,
        title: 'u + r = "er"',
        soundLabel: '"er" (/ɜːr/)',
        ruleEn: 'The letters ur say "er", the same sound as ir (bird) and er (her). It is very regular.',
        ruleFr: 'Les lettres « ur » se prononcent « er » (/ɜːr/), le même son que « ir » (bird) et « er » (her). Règle très régulière.',
        spokenRule: 'The letters u r say er, as in turn, burn, and nurse.',
        groups: [
          {
            words: [
              { word: 'turn', sayItLike: 'tern' },
              { word: 'burn', sayItLike: 'bern' },
              { word: 'nurse', sayItLike: 'ners' },
              { word: 'hurt', sayItLike: 'hert' },
              { word: 'fur', sayItLike: 'fer' },
              { word: 'church', sayItLike: 'cherch' },
              { word: 'curl', sayItLike: 'kerl' },
              { word: 'purple', sayItLike: 'PER-pul' },
              { word: 'burst', sayItLike: 'berst' },
              { word: 'turtle', sayItLike: 'TER-tul' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions',
        exceptions: [
          {
            titleFr: 'La terminaison ure se prononce « yoor » ou « oor » : pure (pyoor), cure (kyoor), sure (shoor), secure, mature.',
            titleEn: 'ure ending says "yoor" or "oor": pure (pyoor), cure (kyoor), sure (shoor), secure, mature.',
            examples: [
              { word: 'pure', sayItLike: 'pyoor' },
              { word: 'cure', sayItLike: 'kyoor' },
              { word: 'sure', sayItLike: 'shoor' },
              { word: 'secure', sayItLike: 'si-KYOOR' },
              { word: 'mature', sayItLike: 'muh-CHOOR' },
            ],
          },
          {
            titleFr: '-ure non accentué se dit « cher » (picture, nature, future, culture) ; -sure se dit « zher » (measure, pleasure, treasure).',
            titleEn: '-ure unstressed says "cher": picture, nature, future, culture. -sure says "zher": measure, pleasure, treasure.',
            examples: [
              { word: 'measure', sayItLike: 'MEZH-er' },
              { word: 'pleasure', sayItLike: 'PLEZH-er' },
              { word: 'treasure', sayItLike: 'TREZH-er' },
            ],
          },
          {
            titleFr: 'urr + voyelle se prononce « u » court + r en anglais britannique (hurry, current, worry), mais souvent « er » en américain.',
            titleEn: 'urr + vowel says short "u" + r: hurry (HUR-ee), current (KUR-ent), worry in British English; in American speech these sound like "er" (HER-ee).',
            examples: [
              { word: 'hurry', sayItLike: 'HUR-ee / HER-ee' },
              { word: 'current', sayItLike: 'KUR-ent / KER-ent' },
              { word: 'worry', sayItLike: 'WUR-ee / WER-ee' },
            ],
          },
          {
            titleFr: 'ury varie : jury (JOOR-ee), fury (FYOOR-ee), bury (BER-ee), injury (IN-jer-ee).',
            titleEn: 'ury varies: jury (JOOR-ee), fury (FYOOR-ee), bury (BER-ee), injury (IN-jer-ee).',
            examples: [
              { word: 'jury', sayItLike: 'JOOR-ee' },
              { word: 'fury', sayItLike: 'FYOOR-ee' },
              { word: 'bury', sayItLike: 'BER-ee' },
              { word: 'injury', sayItLike: 'IN-jer-ee' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'Y',
    shortLabel: 'Cours Y',
    title: 'Les sons du Y',
    titleEn: 'English Y Sounds Guide',
    subtitle: 'Les principaux sons de la lettre Y : Y consonne au début, Y final et Y au milieu des mots.',
    accentHex: '#0D9488',
    lessons: [
      {
        id: 'y-beginning',
        number: 1,
        title: 'Y at the beginning = consonant /y/ (like "yes")',
        soundLabel: 'consonant /y/ (/j/)',
        ruleEn: 'At the beginning of a word, y usually acts like a consonant. It makes the sound you hear at the start of yes.',
        ruleFr: 'En début de mot, la lettre « y » agit comme une consonne. Elle produit le son rapide /y/ entendu au début de yes.',
        spokenRule: 'At the beginning of a word, Y makes a quick consonant sound, as in yes, yellow, and young.',
        groups: [
          {
            words: [
              { word: 'yes', sayItLike: 'yess' },
              { word: 'yellow', sayItLike: 'YEL-oh' },
              { word: 'yo-yo', sayItLike: 'YOH-yoh' },
              { word: 'yell', sayItLike: 'yel' },
              { word: 'yard', sayItLike: 'yard' },
              { word: 'year', sayItLike: 'yeer' },
              { word: 'young', sayItLike: 'yung' },
              { word: 'yogurt', sayItLike: 'YOH-gert' },
              { word: 'yawn', sayItLike: 'yawn' },
              { word: 'yesterday', sayItLike: 'YES-ter-day' },
            ],
          },
        ],
        exceptionsTitle: 'À retenir',
        exceptions: [
          {
            titleFr: 'La lettre Y est une consonne au début de ces mots : elle fait un son rapide /y/, et non une voyelle.',
            titleEn: 'The letter Y is a consonant at the start of these words. It makes a quick /y/ sound, not a vowel sound.',
            examples: [
              { word: 'yes', sayItLike: 'yess' },
              { word: 'year', sayItLike: 'yeer' },
              { word: 'young', sayItLike: 'yung' },
            ],
          },
        ],
      },
      {
        id: 'y-end',
        number: 2,
        title: 'Y at the end = long "i" or long "e"',
        soundLabel: 'long "i" (/aɪ/) or long "e" (/iː/)',
        ruleEn:
          'The sound of final y often depends on the word. In a short, one-syllable word, final y usually says long i (as in my). In a longer word, final y usually says long e (as in happy).',
        ruleFr:
          'En fin de mot : dans un mot court d’une syllabe, « y » se prononce « i » long (comme my). Dans un mot plus long (2 syllabes ou plus), « y » se prononce « e » long (comme happy).',
        spokenRule: 'Final Y says long i in short words like my, and long e in longer words like happy.',
        groups: [
          {
            subtitle: 'A. Mots d’une syllabe : Y = long « i »',
            words: [
              { word: 'my', sayItLike: 'my' },
              { word: 'by', sayItLike: 'by' },
              { word: 'try', sayItLike: 'try' },
              { word: 'fly', sayItLike: 'fly' },
              { word: 'cry', sayItLike: 'cry' },
              { word: 'sky', sayItLike: 'sky' },
              { word: 'dry', sayItLike: 'dry' },
              { word: 'shy', sayItLike: 'shy' },
              { word: 'why', sayItLike: 'why' },
              { word: 'July', sayItLike: 'joo-LY' },
            ],
          },
          {
            subtitle: 'B. Mots plus longs : Y = long « e »',
            words: [
              { word: 'happy', sayItLike: 'HAP-ee' },
              { word: 'baby', sayItLike: 'BAY-bee' },
              { word: 'sunny', sayItLike: 'SUN-ee' },
              { word: 'funny', sayItLike: 'FUN-ee' },
              { word: 'puppy', sayItLike: 'PUP-ee' },
              { word: 'family', sayItLike: 'FAM-uh-lee' },
              { word: 'many', sayItLike: 'MEN-ee' },
              { word: 'city', sayItLike: 'SIT-ee' },
              { word: 'party', sayItLike: 'PAR-tee' },
              { word: 'easy', sayItLike: 'EE-zee' },
            ],
          },
        ],
        exceptionsTitle: 'Règle simple',
        exceptions: [
          {
            titleFr: 'Une syllabe : y final sonne souvent comme « i » long. Deux syllabes ou plus : y final sonne souvent comme « e » long.',
            titleEn: 'One syllable: final y often sounds like long i. Two or more syllables: final y often sounds like long e.',
            examples: [
              { word: 'my', sayItLike: 'my' },
              { word: 'sky', sayItLike: 'sky' },
              { word: 'happy', sayItLike: 'HAP-ee' },
              { word: 'family', sayItLike: 'FAM-uh-lee' },
            ],
          },
        ],
        tipFr: 'Il existe des exceptions : apprenez les mots courants en lisant et en écoutant.',
      },
      {
        id: 'y-middle',
        number: 3,
        title: 'Y in the middle of a word',
        soundLabel: 'short "i" (/ɪ/) or long "i" (/aɪ/)',
        ruleEn:
          'When y is inside a word, it can make different vowel sounds. Two common sounds are short i (as in gym) and long i (as in type).',
        ruleFr:
          'Au milieu d’un mot, le « y » peut produire différents sons de voyelle : soit un « i » court (/ɪ/, comme dans gym), soit un « i » long (/aɪ/, comme dans type).',
        spokenRule: 'Inside a word, Y often makes a short i sound like gym, or a long i sound like type.',
        groups: [
          {
            subtitle: 'A. Y = « i » court (/ih/)',
            words: [
              { word: 'gym', sayItLike: 'jim' },
              { word: 'myth', sayItLike: 'mith' },
              { word: 'symbol', sayItLike: 'SIM-bul' },
              { word: 'system', sayItLike: 'SIS-tum' },
              { word: 'mystery', sayItLike: 'MIS-ter-ee' },
              { word: 'crystal', sayItLike: 'KRIS-tul' },
              { word: 'cylinder', sayItLike: 'SIL-in-der' },
              { word: 'typical', sayItLike: 'TIP-ih-kul' },
              { word: 'oxygen', sayItLike: 'OK-sih-jen' },
              { word: 'physics', sayItLike: 'FIZ-iks' },
            ],
          },
          {
            subtitle: 'B. Y = « i » long (/igh/)',
            words: [
              { word: 'type', sayItLike: 'type' },
              { word: 'style', sayItLike: 'style' },
              { word: 'cycle', sayItLike: 'SY-kul' },
              { word: 'bicycle', sayItLike: 'BY-sih-kul' },
              { word: 'hyphen', sayItLike: 'HY-fen' },
              { word: 'python', sayItLike: 'PY-thon' },
              { word: 'typhoon', sayItLike: 'ty-FOON' },
              { word: 'hybrid', sayItLike: 'HY-brid' },
              { word: 'recycle', sayItLike: 'ree-SY-kul' },
              { word: 'dynamite', sayItLike: 'DY-nuh-mite' },
            ],
          },
        ],
        exceptionsTitle: 'Exceptions et conseils',
        exceptions: [
          {
            titleFr: 'Y n’a pas qu’un seul son : écoutez le mot entier.',
            titleEn: 'Y does not have only one sound. Listen to the whole word.',
            examples: [],
          },
          {
            titleFr: 'Dans gym et myth, le Y sonne comme un « i » court.',
            titleEn: 'In gym and myth, Y sounds like short i.',
            examples: [
              { word: 'gym', sayItLike: 'jim' },
              { word: 'myth', sayItLike: 'mith' },
            ],
          },
          {
            titleFr: 'Dans type et cycle, le Y sonne comme un « i » long.',
            titleEn: 'In type and cycle, Y sounds like long i.',
            examples: [
              { word: 'type', sayItLike: 'type' },
              { word: 'cycle', sayItLike: 'SY-kul' },
            ],
          },
          {
            titleFr: 'Dans des mots comme day, boy, key, le Y fait partie d’un groupe vocalique (ay, oy, ey) et le son change.',
            titleEn: 'In words such as day, boy, key, the letter Y is part of a vowel spelling pattern (ay, oy, ey), and the sound is different.',
            examples: [
              { word: 'day', sayItLike: 'day' },
              { word: 'boy', sayItLike: 'boy' },
              { word: 'key', sayItLike: 'kee' },
            ],
          },
        ],
        quickReviewFr:
          'Récapitulatif rapide : Y initial → /y/ ; Y final → souvent « i » long ou « e » long ; Y médian → souvent « i » court ou « i » long.',
      },
    ],
  },
];

export function getPhonicsCourse(id: CourseId): PhonicsCourse {
  return PHONICS_COURSES.find((c) => c.id === id) ?? PHONICS_COURSES[0];
}

export function getPhonicsLesson(courseId: CourseId, lessonId?: string | null): PhonicsLesson {
  const course = getPhonicsCourse(courseId);
  if (!lessonId) {
    return course.lessons[0];
  }
  return course.lessons.find((l) => l.id === lessonId) ?? course.lessons[0];
}

export function getLessonWords(lesson: PhonicsLesson): PhonicsWord[] {
  return lesson.groups.flatMap((group) => group.words);
}

export function normalizeSpeakText(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const collapsed = input.replace(/\s+/g, ' ').trim();
  if (!collapsed || collapsed.length > 220) {
    return null;
  }
  if (!/[a-zA-Z]/.test(collapsed)) {
    return null;
  }
  return collapsed;
}
