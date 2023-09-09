import Konva from 'Konva';

// import type { Rect } from 'Konva/lib/shapes/Circle';
import type { Rect } from 'Konva/lib/shapes/Rect';
import Victor from 'victor';
import { inViewport, layer, map } from './stage';
import type { Circle } from 'konva/lib/shapes/Circle';
import { createNoise3D } from 'simplex-noise';

let z = 0;
let mobile = false;
let dotColor = '#444';
const dotColorMove = '#FDFDF1';
const radius = 400;

export function moveConfetti() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextDots = [];
  dots.forEach((dot, i) => {
    const dist = new Victor(mouseX, mouseY).subtract(dot.location).length();
    const mappedScale = map(dist, 0, radius, 5, 1);
    const scale = dot.randomColor ? Math.max(mappedScale, 1) : 1;

    if (!mobile) {
      if (!dot.randomColor) {
        if (dist < radius && dot.render.fill() === dotColor) {
          // dot.render.fill(dotColorMove);
          // dot.render.opacity(0);
        }
        if (dist > radius) {
          // dot.render.opacity(1);
          // dot.render.fill(dotColor);
        }
      }
      dot.render.scale({ x: scale, y: scale });
    }

    const offsetXNoise = noise3D(
      dot.location.x / 500,
      dot.location.y / 500,
      +z
    );
    const offsetYNoise = noise3D(
      dot.location.x / 500,
      dot.location.y / 500,
      -z
    );
    const mappedOffsetX = map(offsetXNoise, -1, 1, 0, 20);
    const mappedOffsetY = map(offsetYNoise, -1, 1, 0, 20);
    dot.render.offsetX(mappedOffsetX / scale);
    dot.render.offsetY(mappedOffsetY / scale);
    nextDots.push(dot);
  });

  dots = nextDots;
  z += 0.002;
}

export function buildDots() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  mobile = width < 800;
  if (mobile) dotColor = dotColorMove;
  const dim = 3;
  const gap = mobile ? 40 : 60;
  const cols = Math.floor(width / (dim + gap)) + 2;
  const rows = Math.floor(height / (dim + gap)) + 2;
  const xOffset = cols * (dim + gap) - width;
  const yOffset = rows * (dim + gap) - height;
  dots = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const builtDot = buildDot({
        w: dim,
        x: x * (dim + gap) - xOffset - dim + gap,
        y: y * (dim + gap) - yOffset - dim + gap,
      });
      if (builtDot) dots.push(builtDot);
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
  fill = dotColor,
}: BuildCircleArgs) {
  const H = Math.floor(Math.random() * 255);
  const L = Math.floor(Math.random() * 30) + 30;
  const randomColor = `hsl(${H} ${60}% ${L}%)`;
  const useRandomColor = Math.random() < (mobile ? 0.4 : 0.5);

  if (Math.random() > 0.7) return;

  const rect = new Konva.Circle({
    x,
    y,
    width: w / 2,
    height: (w / 2) * 3,
    fill: useRandomColor ? randomColor : fill,
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
    randomColor: useRandomColor,
    remove: false,
  };
}

type Confetti = {
  render: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
  randomColor: boolean;
};

const noise3D = createNoise3D();
let dots: Confetti[] = []; // buildCircles();
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
document.addEventListener('mousemove', (e) => {
  mouseX = e.x;
  mouseY = e.y;
});
