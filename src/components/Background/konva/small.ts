import Konva from 'konva';

import type { Rect } from 'konva/lib/shapes/Rect';
import { NoiseFunction3D, createNoise3D } from 'simplex-noise';
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

let noise3D: NoiseFunction3D;
let z = 0.1;
let perlinMovement = 0.0005;

export const smallLayer: StageLayer = {
  build: buildSymbols,
  update: updateSymbols,
};

export function buildSymbols(stageWidth: number, stageHeight: number) {
  noise3D = createNoise3D(Math.random);
  layer = new Konva.Layer();
  symbols = [];

  const width = stageWidth; //Math.min(stageWidth, stageHeight) / 4;
  const height = stageHeight; //Math.min(stageWidth, stageHeight) / 4;
  const extraOffsetX = (stageWidth - width) / 2;
  const extraOffsetY = (stageHeight - height) / 2;

  const dim = Math.floor(Math.min(width, height) / 300);
  const gap = dim * 4 + 1;
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
  symbols.forEach((symbol) => {
    const noiseAmp = 3000;
    const noise = noise3D(
      symbol.location.x / noiseAmp,
      symbol.location.y / noiseAmp,
      z
    );

    symbol.render.fill('#0A0A0A');
    if (noise > -0.4) symbol.render.fill('hsl(0, 85%, 59%)');
    if (noise > -0.3) symbol.render.fill('hsl(25, 95%, 52%)');
    if (noise > -0.2) symbol.render.fill('hsl(39, 94%, 50%)');
    if (noise > -0.1) symbol.render.fill('hsl(44, 93%, 47%)');
    if (noise > 0.0) symbol.render.fill('hsl(83, 80%, 45%)');
    if (noise > 0.1) symbol.render.fill('hsl(144, 71%, 45%)');
    if (noise > 0.2) symbol.render.fill('hsl(167, 84%, 39%)');
    if (noise > 0.3) symbol.render.fill('hsl(177, 81%, 39%)');
    if (noise > 0.4) symbol.render.fill('hsl(193, 94%, 43%)');
    if (noise > 0.5) symbol.render.fill('hsl(202, 88%, 48%)');
    if (noise > 0.6) symbol.render.fill('hsl(220, 89%, 61%)');
    if (noise > 0.7) symbol.render.fill('hsl(237, 77%, 63%)');
    if (noise > 0.8) symbol.render.fill('hsl(252, 86%, 65%)');
    if (noise > 0.9) symbol.render.fill('hsl(257, 85%, 64%)');
    // else symbol.render.fill('#555');
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
  const rect = new Konva.Rect({
    x,
    y,
    width: w,
    height: w,
    listening: false,
    fill: '#555',
    perfectDrawEnabled: false,
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
