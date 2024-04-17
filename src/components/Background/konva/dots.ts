import Konva from 'Konva';

import type { Circle } from 'konva/lib/shapes/Circle';
import { createNoise3D } from 'simplex-noise';
import Victor from 'victor';
import { layer, map } from './stage';

let z = 0;
let mobile = false;
let dotColor = '#444';
// let maxScale = 8;
let perlinMovement = 0.002;

// const radius = 300;

export function moveDots() {
  const nextDots: Dot[] = [];
  dots.forEach((dot) => {
    // const dist = new Victor(mouseX, mouseY).subtract(dot.location).length();
    // const mappedScale = map(dist, 0, radius, maxScale, 1);
    const scale = 1; //dot.randomColor ? Math.max(mappedScale, 1) : 1;

    if (!mobile) {
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
  z += mobile ? perlinMovement * 2 : perlinMovement;
}

export function buildDots() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  mobile = width < 800;
  const dim = 3;
  const gap = mobile ? 40 : 60;
  const cols = Math.floor(width / (dim + gap)) + 2;
  const rows = Math.floor(height / (dim + gap)) + 2;
  const xOffset = cols * (dim + gap) - width;
  const yOffset = rows * (dim + gap) - height;
  dots = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (Math.random() > 0.7) continue;
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
  const randomColor = getRandomColor();
  const useRandomColor = Math.random() < (mobile ? 0.4 : 0.5);

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

function getRandomColor() {
  return '#cccccc';
  const rand = Math.random();
  if (rand > 0.75) return '#CF2C4F';
  if (rand > 0.5) return '#0E98E9';
  if (rand > 0.25) return `#F4A259`;
  return `#3AB895`;
}

type Dot = {
  render: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
  randomColor: boolean;
};

const noise3D = createNoise3D();
let dots: Dot[] = []; // buildCircles();
// let mouseX = window.innerWidth / 2;
// let mouseY = window.innerHeight / 2;
// document.addEventListener('mousemove', (e) => {
//   mouseX = e.x;
//   mouseY = e.y;
// });
