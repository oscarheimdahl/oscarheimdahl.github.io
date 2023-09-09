import Konva from 'Konva';

// import type { Rect } from 'Konva/lib/shapes/Circle';
import type { Rect } from 'Konva/lib/shapes/Rect';
import Victor from 'victor';
import { inViewport, layer, map } from './stage';
import type { Circle } from 'konva/lib/shapes/Circle';
import { createNoise3D } from 'simplex-noise';

type Confetti = {
  render: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

const noise3D = createNoise3D();
let dots: Confetti[] = []; // buildCircles();
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
document.addEventListener('mousemove', (e) => {
  mouseX = e.x;
  mouseY = e.y;
});

let z = 0;
let min = 0;
let max = 0;

export function moveConfetti() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextDots = [];
  dots.forEach((dot, i) => {
    // confetti.acceleration = new Victor(0, 0.4); //targetVec;

    // confetti.velocity.add(confetti.acceleration);
    // confetti.location.add(confetti.velocity);

    const distance = new Victor(mouseX, mouseY).subtract(dot.location);
    const dist = distance.length();
    const mappedDist = map(dist, 0, window.innerWidth, 10, 1);
    // const clampedDist = Math.min(Math.max(mappedDist, 0), 2);
    // const mappedScale = map(scaleNoise, -1, 1, 0, 1);

    // if (dist < 400) {
    //   if (dot.render.fill() === '#2d2d2d') {
    //     const H = Math.floor(Math.random() * 255);
    //     const L = Math.floor(Math.random() * 40) + 40;
    //     dot.render.fill(`hsl(${H} ${60}% ${L}%)`);
    //     // dot.render.scale({ x: 2, y: 2 });
    //     dot.render.scale({ x: mappedDist, y: mappedDist });
    //   }
    // } else {
    //   dot.render.fill('#2d2d2d');
    //   dot.render.scale({ x: 1, y: 1 });
    // }

    const offsetXNoise = noise3D(dot.location.x / 500, dot.location.y / 500, z);
    const offsetYNoise = noise3D(
      dot.location.x / 500,
      dot.location.y / 500,
      -z
    );
    const mappedOffsetX = map(offsetXNoise, -1, 1, 0, 10);
    const mappedOffsetY = map(offsetYNoise, -1, 1, 0, 10);

    dot.render.offsetX(mappedOffsetX);
    dot.render.offsetY(mappedOffsetY);

    // dot.render.fill;
    // dot.render.scale({ x: clampedDist, y: clampedDist });
    dot.render.x(dot.location.x);
    dot.render.y(dot.location.y);

    const keepParticle = inViewport(dot.render, { top: true });

    if (keepParticle) nextDots.push(dot);
    else dot.render.remove();
  });

  dots = nextDots;
  z += 0.001;
}

export function resetConfetti() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dim = 3;
  const gap = 60;
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
  // const H = Math.floor(Math.random() * 255);
  // const L = Math.floor(Math.random() * 70);
  // fill = `hsl(${H} ${60}% ${L}%)`;
  // const rand = Math.random();
  // if (rand > 0.33) fill = 'blue';
  // if (rand > 0.66) fill = 'red';
  const rect = new Konva.Circle({
    x,
    y,
    width: w / 2,
    height: (w / 2) * 3,
    fill,
    listening: false,
    cornerRadius: 10,
  });
  layer.add(rect);

  return {
    render: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(rect.x(), rect.y()),
    remove: false,
  };
}
