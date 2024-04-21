import Konva from 'konva';

import type { Rect } from 'konva/lib/shapes/Rect';
import { createNoise3D } from 'simplex-noise';
import Victor from 'victor';
import { StageLayer, map } from './stage';

type Dot = {
  render: Rect;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  bright: boolean;
};

let symbols: Dot[] = [];
let layer: Konva.Layer;

const noise3D = createNoise3D(() => 1);
let z = 0.1;
let perlinMovement = 0.001;

export const diamondLayer: StageLayer = {
  build: buildSymbols,
  update: updateSymbols,
};

export function buildSymbols(stageWidth: number, stageHeight: number) {
  layer = new Konva.Layer();
  symbols = [];

  const width = stageWidth; // Math.min(stageWidth, stageHeight) / 4;
  const height = stageHeight; //Math.min(stageWidth, stageHeight) / 4;
  const extraOffsetX = (stageWidth - width) / 2;
  const extraOffsetY = (stageHeight - height) / 2;

  const dim = 15;
  const gap = 50;
  const cols = Math.floor(width / (dim + gap));
  const rows = Math.floor(height / (dim + gap));
  const xOffset = (width - cols * (dim + gap)) / 2;
  const yOffset = (height - rows * (dim + gap)) / 2;

  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      let newY = y * (dim + gap) + yOffset + extraOffsetY;
      if (x % 2 === 0) {
        if (y === rows) continue;
        newY += (dim + gap) / 2;
      }

      const builtDot = buildDot({
        w: dim,
        x: x * (dim + gap) + xOffset + extraOffsetX,
        y: newY,
        velocity: new Victor(0, 0),
        iy: y / rows,
      });
      layer.add(builtDot.render);
      symbols.push(builtDot);
    }
  }
  return layer;
}

export function updateSymbols() {
  symbols.forEach((symbol) => {
    const noiseAmp = 1000;
    const noise = noise3D(
      symbol.location.x / noiseAmp,
      // symbol.location.y / noiseAmp,
      1,
      z
    );

    const mappedNoise = map(noise, -1, 1, -100, 100);

    symbol.render.offsetY(mappedNoise + symbol.render.height() / 2);
  });
  z += perlinMovement;
}

interface BuildDotArgs {
  x: number;
  y: number;
  w: number;
  velocity?: Victor;
  location?: Victor;
  iy?: number;
}

function buildDot({
  x,
  y,
  w,
  velocity = new Victor(0, 0),
  location = new Victor(x, y),
  iy,
}: BuildDotArgs) {
  const scale = map(Math.abs(iy! - 0.5), 0, 0.5, 1.5, 0.2);

  const colors = [
    'hsl(0, 85%, 59%)',
    // 'hsl(25, 95%, 52%)',
    'hsl(39, 94%, 50%)',
    // 'hsl(44, 93%, 47%)',
    // 'hsl(83, 80%, 45%)',
    // 'hsl(144, 71%, 45%)',
    // 'hsl(167, 84%, 39%)',
    // 'hsl(177, 81%, 39%)',
    // 'hsl(193, 94%, 43%)',
    'hsl(202, 88%, 48%)',
    // 'hsl(220, 89%, 61%)',
    // 'hsl(237, 77%, 63%)',
    // 'hsl(252, 86%, 65%)',
    // 'hsl(257, 85%, 64%)',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const rect = new Konva.Rect({
    x,
    y,
    width: w * scale,
    height: w * scale,
    listening: false,
    fill: randomColor,
    perfectDrawEnabled: false,
  });

  rect.offsetX(rect.width() / 2);
  rect.offsetY(rect.height() / 2);
  rect.x(rect.x() + rect.width() / 2);
  rect.y(rect.y() + rect.height() / 2);

  return {
    render: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(rect.x(), rect.y()),
    bright: Math.random() > 0.9,
  };
}
