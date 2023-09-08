import Konva from 'Konva';

// import type { Rect } from 'Konva/lib/shapes/Circle';
import type { Rect } from 'Konva/lib/shapes/Rect';
import Victor from 'victor';
import { inViewport, layer, map } from './stage';
import type { Circle } from 'konva/lib/shapes/Circle';

type Confetti = {
  rect: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

let dots: Confetti[] = []; // buildCircles();
let mouseX: number;
let mouseY: number;
document.addEventListener('mousemove', (e) => {
  mouseX = e.x;
  mouseY = e.y;
});

// export function explode({
//   x = Math.random() * window.innerWidth,
//   y = Math.random() * window.innerHeight,
//   n = 400,
// }: {
//   x?: number;
//   y?: number;
//   n?: number;
// }) {
//   if (dots.length > 2000) return;
//   const speed = 10;
//   const S = 60;

//   for (let i = 0; i < n; i++) {
//     const H = Math.floor(Math.random() * 255);
//     const L = Math.floor(Math.random() * 70 + 30);
//     const angle = Math.random() * 360;
//     const circle = buildDot({
//       x,
//       y,
//       w: 4,
//       velocity: new Victor(Math.random() * speed - speed / 2, 0)
//         .rotateByDeg(angle)
//         .add(new Victor(0, -3))
//         .multiplyScalar(2),
//       fill: `hsl(${H} ${S}% ${L}%)`,
//     });
//     dots.push(circle);
//   }
//   return true;
// }

export function moveConfetti() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextDots = [];
  dots.forEach((confetti, i) => {
    // confetti.acceleration = new Victor(0, 0.4); //targetVec;

    // confetti.velocity.add(confetti.acceleration);
    // confetti.location.add(confetti.velocity);
    const distance = new Victor(mouseX, mouseY).subtract(confetti.location);

    const dist = distance.length();
    confetti.rect.x(confetti.location.x);
    confetti.rect.y(confetti.location.y);
    if (dist < 400) {
      confetti.rect.scale({ x: 2, y: 2 });
    } else {
      confetti.rect.scale({ x: 0, y: 0 });
    }
    confetti.rect.rotate(0.5);

    const keepParticle = inViewport(confetti.rect, { top: true });

    if (keepParticle) nextDots.push(confetti);
    else confetti.rect.remove();
  });

  dots = nextDots;
}

export function resetConfetti() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dim = 1;
  const gap = 30;
  const cols = Math.floor(width / (dim + gap));
  const rows = Math.floor(height / (dim + gap));
  const xOffset = cols * (dim + gap) - window.innerWidth;
  const yOffset = rows * (dim + gap) - window.innerHeight;
  dots = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      dots.push(
        buildDot({
          w: dim,
          x: x * (dim + gap) - xOffset,
          y: y * (dim + gap) - yOffset,
        })
      );
    }
  }
}

interface BuildCircleArgs {
  x: number;
  y: number;
  w: number;
  velocity?: Victor;
  location?: Victor;
  fill?: string;
}
function buildDot({
  x,
  y,
  w,
  velocity = new Victor(0, 0),
  location = new Victor(x, y),
  fill = '#2d2d2d',
}: BuildCircleArgs) {
  // const rand = Math.random();
  // if (rand > 0.33) fill = 'blue';
  // if (rand > 0.66) fill = 'red';
  const rect = new Konva.Circle({
    x,
    y,
    width: w / 2,
    height: (w / 2) * 3,
    fill,
    rotation: Math.floor(Math.random() * 360),
    listening: false,
    cornerRadius: 10,
  });
  layer.add(rect);

  return {
    rect: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(rect.x(), rect.y()),
    remove: false,
  };
}
