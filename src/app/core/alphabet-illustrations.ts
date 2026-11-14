/**
 * Hand-crafted calm storybook vector illustrations drawn on Canvas 2D
 * for every letter A-Z. Centered around (0, 0) inside a ~180x180 box.
 */
export function drawLetterIllustration(
  ctx: CanvasRenderingContext2D,
  letter: string,
  accent: string,
  isDark: boolean,
  timeSec: number,
): void {
  ctx.save();
  const sway = Math.sin(timeSec * 2.2) * 3;
  ctx.translate(0, sway);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const outline = isDark ? 'rgba(248, 250, 252, 0.72)' : 'rgba(30, 41, 59, 0.75)';

  switch (letter) {
    case 'A': {
      // Apple
      ctx.fillStyle = '#E06D5A';
      ctx.beginPath();
      ctx.moveTo(0, -34);
      ctx.bezierCurveTo(44, -48, 62, 6, 36, 44);
      ctx.bezierCurveTo(18, 60, 4, 48, 0, 44);
      ctx.bezierCurveTo(-4, 48, -18, 60, -36, 44);
      ctx.bezierCurveTo(-62, 6, -44, -48, 0, -34);
      ctx.fill();
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.stroke();
      // Stem & Leaf
      ctx.beginPath();
      ctx.moveTo(0, -34);
      ctx.quadraticCurveTo(4, -56, 12, -62);
      ctx.stroke();
      ctx.fillStyle = '#6B9E6E';
      ctx.beginPath();
      ctx.ellipse(18, -48, 16, 8, -0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'B': {
      // Bear
      ctx.fillStyle = '#B88456';
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      for (const sx of [-38, 38]) {
        ctx.beginPath();
        ctx.arc(sx, -38, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#E2C09C';
        ctx.beginPath();
        ctx.arc(sx, -38, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#B88456';
      }
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#E8CEB0';
      ctx.beginPath();
      ctx.ellipse(0, 14, 22, 17, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = outline;
      ctx.beginPath();
      ctx.arc(-16, -8, 4, 0, Math.PI * 2);
      ctx.arc(16, -8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, 8, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'C': {
      // Cloud
      ctx.fillStyle = isDark ? '#DCE8F5' : '#FFFFFF';
      ctx.strokeStyle = '#6EA4D1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(-28, 10, 26, Math.PI * 0.5, Math.PI * 1.65);
      ctx.arc(0, -14, 34, Math.PI * 1.05, Math.PI * 1.95);
      ctx.arc(32, 8, 26, Math.PI * 1.4, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'D': {
      // Duck
      ctx.fillStyle = '#F2C14E';
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(-6, 18, 42, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(24, -20, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#E58845';
      ctx.beginPath();
      ctx.ellipse(48, -18, 14, 7, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = outline;
      ctx.beginPath();
      ctx.arc(30, -24, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'E': {
      // Elephant
      ctx.fillStyle = '#8AA6B8';
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(-34, -4, 24, 34, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(4, -6, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(36, -6);
      ctx.bezierCurveTo(62, 4, 62, 42, 42, 46);
      ctx.bezierCurveTo(32, 48, 30, 34, 42, 34);
      ctx.stroke();
      ctx.fillStyle = outline;
      ctx.beginPath();
      ctx.arc(16, -14, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'F': {
      // Flower
      ctx.strokeStyle = '#5A8F69';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.quadraticCurveTo(6, 36, 0, 62);
      ctx.stroke();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = outline;
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.translate(0, -14);
        ctx.rotate((i * Math.PI) / 3);
        ctx.fillStyle = '#F09AA8';
        ctx.beginPath();
        ctx.ellipse(0, -24, 13, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      ctx.fillStyle = '#F4C95D';
      ctx.beginPath();
      ctx.arc(0, -14, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'G': {
      // Giraffe
      ctx.fillStyle = '#EAB656';
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-16, -14, 26, 68, 12);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(4, -22, 24, 18, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#A1622B';
      for (const [sx, sy] of [[-4, 8], [2, 26], [-6, 40]]) {
        ctx.beginPath();
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(10, -26, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'H': {
      // House
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#F6EFE2';
      ctx.beginPath();
      ctx.rect(-38, -8, 76, 56);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#D16A5A';
      ctx.beginPath();
      ctx.moveTo(-48, -6);
      ctx.lineTo(0, -48);
      ctx.lineTo(48, -6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#739E82';
      ctx.beginPath();
      ctx.roundRect(-12, 16, 24, 32, [10, 10, 0, 0]);
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'I': {
      // Igloo
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#E0F2F7';
      ctx.beginPath();
      ctx.arc(0, 26, 52, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#7EB2C4';
      ctx.beginPath();
      ctx.arc(0, 26, 18, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'J': {
      // Jellyfish
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#A992D1';
      ctx.beginPath();
      ctx.arc(0, -6, 38, Math.PI, 0);
      ctx.quadraticCurveTo(0, 6, -38, -6);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#9279BF';
      ctx.lineWidth = 3.5;
      for (const tx of [-22, -8, 8, 22]) {
        ctx.beginPath();
        ctx.moveTo(tx, 0);
        ctx.quadraticCurveTo(tx + 8, 24, tx - 4, 48);
        ctx.stroke();
      }
      break;
    }
    case 'K': {
      // Kite
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#E67E66';
      ctx.beginPath();
      ctx.moveTo(0, -52);
      ctx.lineTo(38, -6);
      ctx.lineTo(0, 36);
      ctx.lineTo(-38, -6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -52);
      ctx.lineTo(0, 36);
      ctx.moveTo(-38, -6);
      ctx.lineTo(38, -6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 36);
      ctx.quadraticCurveTo(16, 50, -6, 62);
      ctx.stroke();
      break;
    }
    case 'L': {
      // Lion
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#C97B3A';
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * 38, Math.sin(a) * 38, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#EAB85E';
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = outline;
      ctx.beginPath();
      ctx.arc(-11, -6, 3.5, 0, Math.PI * 2);
      ctx.arc(11, -6, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-6, 6);
      ctx.lineTo(6, 6);
      ctx.lineTo(0, 13);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'M': {
      // Crescent Moon + Stars
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#F6D365';
      ctx.beginPath();
      ctx.arc(-4, 0, 44, 0.35 * Math.PI, 1.65 * Math.PI, false);
      ctx.bezierCurveTo(-18, -28, -18, 28, 16, 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#FDE68A';
      ctx.beginPath();
      ctx.arc(28, -18, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'N': {
      // Nest with 2 eggs
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#DCEBF2';
      ctx.beginPath();
      ctx.ellipse(-12, -4, 13, 18, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(12, -4, 13, 18, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#A67C52';
      ctx.beginPath();
      ctx.ellipse(0, 18, 48, 22, 0, 0, Math.PI);
      ctx.quadraticCurveTo(0, 4, -48, 18);
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'O': {
      // Owl
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#9C785C';
      ctx.beginPath();
      ctx.ellipse(0, 8, 38, 44, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#FAF5EC';
      ctx.beginPath();
      ctx.arc(-15, -10, 14, 0, Math.PI * 2);
      ctx.arc(15, -10, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = outline;
      ctx.beginPath();
      ctx.arc(-15, -10, 5, 0, Math.PI * 2);
      ctx.arc(15, -10, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#E69F3D';
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(6, 0);
      ctx.lineTo(0, 10);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'P': {
      // Panda
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(-32, -34, 15, 0, Math.PI * 2);
      ctx.arc(32, -34, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(-16, -6, 11, 14, -0.3, 0, Math.PI * 2);
      ctx.ellipse(16, -6, 11, 14, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-16, -8, 3.5, 0, Math.PI * 2);
      ctx.arc(16, -8, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(0, 10, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'Q': {
      // Queen Crown
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#EAB34B';
      ctx.beginPath();
      ctx.moveTo(-42, 26);
      ctx.lineTo(-46, -24);
      ctx.lineTo(-18, 2);
      ctx.lineTo(0, -34);
      ctx.lineTo(18, 2);
      ctx.lineTo(46, -24);
      ctx.lineTo(42, 26);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#D46A8E';
      ctx.beginPath();
      ctx.arc(0, 8, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'R': {
      // Rainbow
      const bands = ['#E07A5F', '#F2CC8F', '#81B29A', '#6EA4D1'];
      bands.forEach((color, idx) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(0, 26, 52 - idx * 10, Math.PI, 0);
        ctx.stroke();
      });
      break;
    }
    case 'S': {
      // Sun
      ctx.strokeStyle = '#E5A93B';
      ctx.lineWidth = 4;
      for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 36, Math.sin(a) * 36);
        ctx.lineTo(Math.cos(a) * 52, Math.sin(a) * 52);
        ctx.stroke();
      }
      ctx.fillStyle = '#F7CA57';
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'T': {
      // Tree
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#8C6239';
      ctx.beginPath();
      ctx.roundRect(-10, 12, 20, 42, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#6FA376';
      ctx.beginPath();
      ctx.arc(0, -14, 34, 0, Math.PI * 2);
      ctx.arc(-22, 4, 24, 0, Math.PI * 2);
      ctx.arc(22, 4, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      break;
    }
    case 'U': {
      // Umbrella
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#6F9AC2';
      ctx.beginPath();
      ctx.arc(0, 4, 46, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.lineTo(0, 46);
      ctx.arc(8, 46, 8, Math.PI, 0, true);
      ctx.stroke();
      break;
    }
    case 'V': {
      // Violin
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#B86E4A';
      ctx.beginPath();
      ctx.ellipse(0, 20, 26, 22, 0, 0, Math.PI * 2);
      ctx.ellipse(0, -8, 20, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#523426';
      ctx.fillRect(-4, -52, 8, 32);
      ctx.strokeStyle = outline;
      ctx.beginPath();
      ctx.moveTo(-2, -52);
      ctx.lineTo(-2, 28);
      ctx.moveTo(2, -52);
      ctx.lineTo(2, 28);
      ctx.stroke();
      break;
    }
    case 'W': {
      // Whale
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#5D93B5';
      ctx.beginPath();
      ctx.arc(-6, 12, 36, Math.PI, 0);
      ctx.quadraticCurveTo(38, 12, 48, -10);
      ctx.lineTo(54, 18);
      ctx.quadraticCurveTo(34, 34, -6, 34);
      ctx.quadraticCurveTo(-42, 34, -42, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-20, 10, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'X': {
      // Xylophone
      const barColors = ['#E07A5F', '#F2CC8F', '#81B29A', '#6EA4D1'];
      ctx.strokeStyle = outline;
      ctx.lineWidth = 2.5;
      barColors.forEach((c, idx) => {
        const x = -33 + idx * 22;
        const h = 66 - idx * 8;
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.roundRect(x - 8, -h / 2, 16, h, 6);
        ctx.fill();
        ctx.stroke();
      });
      break;
    }
    case 'Y': {
      // Yarn ball
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#D98298';
      ctx.beginPath();
      ctx.arc(0, 0, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-10, -8, 28, -0.5, 1.5);
      ctx.moveTo(-24, 18);
      ctx.quadraticCurveTo(10, 4, 28, -16);
      ctx.moveTo(32, 22);
      ctx.quadraticCurveTo(50, 36, 46, 52);
      ctx.stroke();
      break;
    }
    default: {
      // Zebra head
      ctx.strokeStyle = outline;
      ctx.lineWidth = 3;
      ctx.fillStyle = '#F8FAFC';
      ctx.beginPath();
      ctx.ellipse(0, 4, 34, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(-26, -18);
      ctx.lineTo(-4, -12);
      ctx.lineTo(-28, -4);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(26, -18);
      ctx.lineTo(4, -12);
      ctx.lineTo(28, -4);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-12, -2, 3.5, 0, Math.PI * 2);
      ctx.arc(12, -2, 3.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}
