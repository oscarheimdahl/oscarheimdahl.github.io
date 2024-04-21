import Konva from 'konva';
import type { Stage } from 'konva/lib/Stage';
import type { Shape } from 'konva/lib/Shape';
import { asciiLayer } from './ascii';
import { dotLayer } from './dots';
import { diamondLayer } from './diamond';
import { smallLayer } from './small';
// import { flockLayer } from './flock';

export type StageLayer = {
  build: (width: number, height: number) => Konva.Layer;
  update: () => void;
};

Konva.pixelRatio = 1;
let stage: Stage;
let rendering = false;

let layerIndex = 0;
const layers = [dotLayer, asciiLayer, diamondLayer, smallLayer];

export function nextBackground() {
  layerIndex = layerIndex + 1;
  if (layerIndex >= layers.length) layerIndex = 0;
  buildBackground();
}

export function prevBackground() {
  layerIndex = layerIndex - 1;
  if (layerIndex < 0) layerIndex = layers.length - 1;
  buildBackground();
}

export function init() {
  stage = new Konva.Stage({
    container: 'container',
  });
}

export function buildBackground() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  stage.width(width);
  stage.height(height);

  stage.removeChildren();
  const builtLayer = layers[layerIndex].build(width, height);
  builtLayer.listening(false);
  stage.add(builtLayer);

  if (!rendering) {
    move();
    rendering = true;
  }
}

let pause = false;
export function setPause(_pause: boolean) {
  pause = _pause;
  if (!pause) move();
}

function move() {
  if (pause) return;
  layers[layerIndex].update();
  requestAnimationFrame(move);
}

export function map(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export function inViewport(
  shape: Shape,
  ignore?: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean }
) {
  const outsideTop = shape.y() < 0;
  const outsideBottom = shape.y() > window.innerHeight;
  const outsideRight = shape.x() > window.innerWidth;
  const outsideLeft = shape.x() < 0;
  return !(
    (!ignore?.top && outsideTop) ||
    (!ignore?.right && outsideRight) ||
    (!ignore?.bottom && outsideBottom) ||
    (!ignore?.left && outsideLeft)
  );
}
