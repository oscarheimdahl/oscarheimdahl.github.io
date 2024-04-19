import Konva from 'konva';

import type { Circle } from 'konva/lib/shapes/Circle';
import { createNoise3D } from 'simplex-noise';
import Victor from 'victor';
import { StageLayer, map } from './stage';

type Dot = {
  render: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

const noise3D = createNoise3D(() => 1);
let z = 0.1;
let perlinMovement = 0.002;

let dots: Dot[] = [];
let layer: Konva.Layer;

let mobile = false;
let dotColor1 = '#444';
let dotColor2 = '#CCC';

export const dotLayer: StageLayer = {
  build: buildDots,
  update: updateDots,
};

export function buildDots(width: number, height: number) {
  layer = new Konva.Layer();
  dots = [];
  mobile = width < 800;

  const dim = 3;
  const gap = mobile ? 40 : 60;
  const cols = Math.floor(width / (dim + gap)) + 2;
  const rows = Math.floor(height / (dim + gap)) + 2;
  const xOffset = cols * (dim + gap) - width;
  const yOffset = rows * (dim + gap) - height;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (Math.random() > 0.7) continue;
      const builtDot = buildDot({
        w: dim,
        x: x * (dim + gap) - xOffset - dim + gap,
        y: y * (dim + gap) - yOffset - dim + gap,
      });
      layer.add(builtDot.render);
      dots.push(builtDot);
    }
  }
  return layer;
}

export function updateDots() {
  const nextDots: Dot[] = [];
  dots.forEach((dot) => {
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
    const offsetX = mappedOffsetX;
    const offsetY = mappedOffsetY;
    dot.render.offsetX(offsetX);
    dot.render.offsetY(offsetY);
    nextDots.push(dot);
  });

  dots = nextDots;
  z += mobile ? perlinMovement * 2 : perlinMovement;
}

interface BuildDotArgs {
  x: number;
  y: number;
  w: number;
  velocity?: Victor;
  location?: Victor;
}

function buildDot({
  x,
  y,
  w,
  velocity = new Victor(0, 0),
  location = new Victor(x, y),
}: BuildDotArgs) {
  const fill = Math.random() < (mobile ? 0.4 : 0.5) ? dotColor1 : dotColor2;
  const rect = new Konva.Circle({
    x,
    y,
    width: w / 2,
    height: (w / 2) * 3,
    fill: fill,
    listening: false,
    cornerRadius: 10,
  });

  return {
    render: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(rect.x(), rect.y()),
    remove: false,
  };
}
