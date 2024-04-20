import Konva from 'konva';

import type { Rect } from 'konva/lib/shapes/Rect';
import { createNoise3D } from 'simplex-noise';
import Victor from 'victor';
import { StageLayer } from './stage';

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

export const smallLayer: StageLayer = {
  build: buildSymbols,
  update: updateSymbols,
};

export function buildSymbols(stageWidth: number, stageHeight: number) {
  layer = new Konva.Layer();
  symbols = [];

  const width = stageWidth; //Math.min(stageWidth, stageHeight) / 4;
  const height = stageHeight; //Math.min(stageWidth, stageHeight) / 4;
  const extraOffsetX = (stageWidth - width) / 2;
  const extraOffsetY = (stageHeight - height) / 2;

  const dim = 8;
  const gap = 32;
  const cols = Math.floor(width / (dim + gap));
  const rows = Math.floor(height / (dim + gap));
  const xOffset = (width - cols * (dim + gap)) / 2;
  const yOffset = (height - rows * (dim + gap)) / 2;

  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      const builtDot = buildDot({
        w: dim * 5,
        x: x * (dim + gap) + xOffset + extraOffsetX,
        y: y * (dim + gap) + yOffset + extraOffsetY,
        velocity: new Victor(0, 0),
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
    const noiseAmp = 10000;
    const noise = noise3D(
      symbol.location.x / noiseAmp,
      symbol.location.y / noiseAmp,
      z
    );

    symbol.render.fill('#0A0A0A');
    if (noise > -0.4) symbol.render.fill('#ef4444');
    if (noise > -0.3) symbol.render.fill('#f97316');
    if (noise > -0.2) symbol.render.fill('#f59e0b');
    if (noise > -0.1) symbol.render.fill('#eab308');
    if (noise > 0.0) symbol.render.fill('#84cc16');
    if (noise > 0.1) symbol.render.fill('#22c55e');
    if (noise > 0.2) symbol.render.fill('#10b981');
    if (noise > 0.3) symbol.render.fill('#14b8a6');
    if (noise > 0.4) symbol.render.fill('#06b6d4');
    if (noise > 0.5) symbol.render.fill('#0ea5e9');
    if (noise > 0.6) symbol.render.fill('#3b82f6');
    if (noise > 0.7) symbol.render.fill('#6366f1');
    if (noise > 0.8) symbol.render.fill('#8b5cf6');
    if (noise > 0.9) symbol.render.fill('#a855f7');
    // else symbol.render.fill('#555');

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
}

function buildDot({
  x,
  y,
  w,
  velocity = new Victor(0, 0),
  location = new Victor(x, y),
}: BuildDotArgs) {
  const rect = new Konva.Rect({
    x,
    y,
    width: w,
    height: w,
    listening: false,
    fill: '#555',
    opacity: 0.2,
  });

  rect.offsetX(w / 2);
  rect.offsetY(w / 2);

  return {
    render: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(rect.x(), rect.y()),
    bright: Math.random() > 0.9,
  };
}
