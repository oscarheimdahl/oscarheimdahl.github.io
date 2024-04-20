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

  const dim = 10;
  const gap = 50;
  const cols = Math.floor(width / (dim + gap));
  const rows = Math.floor(height / (dim + gap));
  const xOffset = (width - cols * (dim + gap)) / 2;
  const yOffset = (height - rows * (dim + gap)) / 2;

  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      if (Math.random() > 0.4) continue;
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
  const nextSymbols: Dot[] = [];

  symbols.forEach((symbol) => {
    const noiseAmp = 100;
    const noise = noise3D(
      symbol.location.x / noiseAmp,
      // symbol.location.y / noiseAmp,
      1,
      z
    ); // (-1, 1)

    const mappedNoise = map(noise, -1, 1, 0, 360);

    symbol.render.rotation(mappedNoise);

    // if (noise > 0.5) symbol.render.opacity(1);
    // else symbol.render.opacity(1);

    // if (noise > 0) symbol.render.scale({ x: 5, y: 5 });
    // else symbol.render.scale({ x: 0, y: 0 });

    nextSymbols.push(symbol);
  });
  symbols = nextSymbols;
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
  const rect = new Konva.Rect({
    x,
    y,
    width: w * scale,
    height: w * scale,
    listening: false,
    fill: Math.random() > 0.3 ? '#aaa' : '#555',
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
