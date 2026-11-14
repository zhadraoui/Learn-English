import {
  DisplayMode,
  LetterTiming,
  VIDEO_DURATION_SEC,
  VideoTheme,
  formatTimecode,
  getPlaybackPhase,
} from './alphabet-data';
import { drawLetterIllustration } from './alphabet-illustrations';

export interface RenderFrameState {
  timeSec: number;
  timings: LetterTiming[];
  theme: VideoTheme;
  displayMode: DisplayMode;
  backdropImage: HTMLImageElement | null;
}

function easeOutCubic(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - x, 3);
}

/**
 * Renders a single 16:9 HD frame of the soothing 30-second English Alphabet video.
 * Pure Canvas 2D renderer used for both 60fps interactive playback and MP4 export.
 */
export function renderAlphabetFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: RenderFrameState,
): void {
  const { timeSec, timings, theme, displayMode, backdropImage } = state;
  const phaseState = getPlaybackPhase(timings, timeSec, VIDEO_DURATION_SEC);

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // 1. Background watercolor artwork with ultra-gentle Ken Burns drift
  if (backdropImage && backdropImage.complete && backdropImage.naturalWidth > 0) {
    const progress = Math.max(0, Math.min(1, timeSec / VIDEO_DURATION_SEC));
    const zoom = 1.0 + progress * 0.055;
    const imgRatio = backdropImage.naturalWidth / backdropImage.naturalHeight;
    const canvasRatio = width / height;

    let drawW = width;
    let drawH = height;
    if (imgRatio > canvasRatio) {
      drawH = height * zoom;
      drawW = drawH * imgRatio;
    } else {
      drawW = width * zoom;
      drawH = drawW / imgRatio;
    }
    const offsetX = (width - drawW) / 2;
    const offsetY = (height - drawH) / 2;
    ctx.drawImage(backdropImage, offsetX, offsetY, drawW, drawH);
  } else {
    ctx.fillStyle = theme.isDark ? '#1E293B' : '#F8F6F0';
    ctx.fillRect(0, 0, width, height);
  }

  // Soft atmospheric veil to guarantee crisp text contrast
  ctx.fillStyle = theme.isDark ? 'rgba(15, 23, 42, 0.34)' : 'rgba(255, 252, 245, 0.28)';
  ctx.fillRect(0, 0, width, height);

  // 2. Gentle drifting storybook dust/firefly motes
  for (let i = 0; i < 16; i++) {
    const seed = i * 137.5;
    const x = ((seed * 7.3 + Math.sin(timeSec * 0.4 + i) * 28) % width + width) % width;
    const y = (((height - timeSec * (12 + (i % 4) * 4) + seed * 3.1) % height) + height) % height;
    const radius = 2.2 + (i % 3) * 1.4;
    const alpha = 0.22 + 0.16 * Math.sin(timeSec * 1.3 + i);
    ctx.fillStyle = theme.isDark
      ? `rgba(253, 230, 138, ${alpha})`
      : `rgba(255, 255, 255, ${alpha + 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Central Storybook Card
  const cardW = Math.round(width * 0.72);
  const cardH = Math.round(height * 0.62);
  const cardX = Math.round((width - cardW) / 2);
  const cardY = Math.round((height - cardH) / 2 - height * 0.025);

  // Fast layered elevation halo (avoids expensive CPU shadowBlur during 60fps & MP4 export)
  ctx.fillStyle = theme.isDark ? 'rgba(2, 6, 23, 0.22)' : 'rgba(15, 23, 42, 0.045)';
  ctx.beginPath();
  ctx.roundRect(cardX - 6, cardY + 6, cardW + 12, cardH + 10, 36);
  ctx.fill();

  ctx.fillStyle = theme.cardBg;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 32);
  ctx.fill();

  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 32);
  ctx.stroke();

  // Inner delicate storybook hairline border
  ctx.strokeStyle = theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(30,41,59,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cardX + 14, cardY + 14, cardW - 28, cardH - 28, 22);
  ctx.stroke();

  // 4. Phase Content
  if (phaseState.phase === 'intro') {
    const p = easeOutCubic(Math.min(1, phaseState.localProgress * 1.5));
    ctx.save();
    ctx.globalAlpha = p;
    ctx.translate(0, (1 - p) * 14);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = theme.mutedInkColor;
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('A gentle English journey', width / 2, cardY + cardH * 0.36);

    ctx.fillStyle = theme.inkColor;
    ctx.font = '600 62px "Fraunces", Georgia, serif';
    ctx.fillText('The Alphabet · A to Z', width / 2, cardY + cardH * 0.54);
    ctx.restore();
  } else if (phaseState.phase === 'outro') {
    const p = easeOutCubic(Math.min(1, phaseState.localProgress * 2));
    ctx.save();
    ctx.globalAlpha = p;
    ctx.translate(0, (1 - p) * 10);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = theme.inkColor;
    ctx.font = '600 58px "Fraunces", Georgia, serif';
    ctx.fillText('A to Z · Well Done', width / 2, cardY + cardH * 0.45);

    ctx.fillStyle = theme.mutedInkColor;
    ctx.font = '500 23px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Sweet dreams and happy learning', width / 2, cardY + cardH * 0.62);
    ctx.restore();
  } else if (phaseState.item) {
    const item = phaseState.item;
    const enter = easeOutCubic(Math.min(1, phaseState.localProgress / 0.25));
    const exit =
      phaseState.localProgress > 0.85
        ? 1 - (phaseState.localProgress - 0.85) / 0.15
        : 1;
    const opacity = Math.max(0, Math.min(1, enter * exit));
    const floatY = (1 - enter) * 14;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(0, floatY);

    // Subtle soft aura circle behind letter
    const leftCenterX =
      displayMode === 'letter-word' ? cardX + cardW * 0.32 : width / 2;
    const centerY = cardY + cardH * 0.48;

    ctx.fillStyle = theme.isDark
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgba(15, 23, 42, 0.035)';
    ctx.beginPath();
    ctx.arc(leftCenterX, centerY - 6, 118, 0, Math.PI * 2);
    ctx.fill();

    // Big Display Letter Pair: "A a"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = theme.inkColor;
    ctx.font = '700 156px "Fraunces", Georgia, serif';
    ctx.fillText(`${item.letter} ${item.lowercase}`, leftCenterX, centerY - 8);

    // Phonetic pronunciation cue
    ctx.fillStyle = theme.mutedInkColor;
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`[ ${item.phonetic} ]`, leftCenterX, centerY + 96);

    if (displayMode === 'letter-word') {
      // Soft vertical hairline divider
      ctx.strokeStyle = theme.cardBorder;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cardX + cardW * 0.54, cardY + 56);
      ctx.lineTo(cardX + cardW * 0.54, cardY + cardH - 56);
      ctx.stroke();

      // Right side: Storybook illustration + Word
      const rightCenterX = cardX + cardW * 0.77;
      ctx.save();
      ctx.translate(rightCenterX, centerY - 22);
      ctx.scale(1.12, 1.12);
      drawLetterIllustration(ctx, item.letter, item.accent, theme.isDark, timeSec);
      ctx.restore();

      ctx.fillStyle = theme.inkColor;
      ctx.font = '600 36px "Fraunces", Georgia, serif';
      ctx.fillText(item.word, rightCenterX, centerY + 88);
    }

    ctx.restore();
  }

  // 5. Bottom A-Z Alphabet Ribbon + Timecode
  const stripY = height - 62;
  const stripMarginX = 96;
  const stripW = width - stripMarginX * 2;
  const stepW = stripW / 26;

  // Soft backdrop bar for ribbon
  ctx.fillStyle = theme.isDark ? 'rgba(15, 23, 42, 0.56)' : 'rgba(255, 253, 248, 0.82)';
  ctx.beginPath();
  ctx.roundRect(stripMarginX - 20, stripY - 22, stripW + 40, 44, 22);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < 26; i++) {
    const ch = String.fromCharCode(65 + i);
    const cx = stripMarginX + stepW * (i + 0.5);
    const isActive = i === phaseState.activeIndex;
    const isDone = phaseState.activeIndex > i || phaseState.phase === 'outro';

    if (isActive) {
      ctx.fillStyle = theme.accentColor;
      ctx.beginPath();
      ctx.arc(cx, stripY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = theme.isDark ? '#0F172A' : '#FFFFFF';
      ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
    } else if (isDone) {
      ctx.fillStyle = theme.inkColor;
      ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    } else {
      ctx.fillStyle = theme.mutedInkColor;
      ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
    }
    ctx.fillText(ch, cx, stripY + 1);
  }

  // Subtle corner timecode
  ctx.textAlign = 'right';
  ctx.fillStyle = theme.isDark ? 'rgba(248, 250, 252, 0.78)' : 'rgba(30, 41, 59, 0.68)';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    `${formatTimecode(timeSec)} / ${formatTimecode(VIDEO_DURATION_SEC)}`,
    width - 36,
    36,
  );

  ctx.restore();
}
