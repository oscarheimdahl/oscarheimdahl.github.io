import Konva from 'konva';

import type { Circle } from 'konva/lib/shapes/Circle';
import { createNoise3D } from 'simplex-noise';
import Victor from 'victor';
import { StageLayer } from './stage';

type Dot = {
  render: Circle;
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
let perlinMovement = 0.0001;

export const asciiLayer: StageLayer = {
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

  const dim = 1;
  const gap = 50;
  const cols = Math.floor(width / (dim + gap));
  const rows = Math.floor(height / (dim + gap));
  const xOffset = (width - cols * (dim + gap)) / 2;
  const yOffset = (height - rows * (dim + gap)) / 2;

  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      const builtDot = buildDot({
        w: dim * 2,
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
  symbols.forEach((symbol) => {
    const noiseAmp = 1000;
    const noise = noise3D(
      symbol.location.x / noiseAmp,
      symbol.location.y / noiseAmp,
      z
    );

    if (noise > 0.5) symbol.render.fill('#aaa');
    else symbol.render.fill('#555');

    if (noise > 0) symbol.render.scale({ x: 5, y: 5 });
    else symbol.render.scale({ x: 0, y: 0 });
  });
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
  const rect = new Konva.Circle({
    x,
    y,
    width: w,
    height: w,
    listening: false,
    fill: '#555',
    perfectDrawEnabled: false,
  });

  return {
    render: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(rect.x(), rect.y()),
    bright: Math.random() > 0.9,
  };
}
