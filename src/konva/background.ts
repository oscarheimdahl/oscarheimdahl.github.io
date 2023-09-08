import Konva from 'Konva';
import type { Layer } from 'Konva/lib/Layer';
import type { Stage } from 'Konva/lib/Stage';
import { moveConfetti, resetConfetti } from './confetti';
import { moveBubbles, resetBubbles } from './bubbles';
import type { Shape } from 'Konva/lib/Shape';
import { moveSpiral } from './spiral';
import { moveOrbs } from './orbs';

let stage: Stage;
export let layer = new Konva.Layer();

let rendering = false;

export function init() {
  stage = new Konva.Stage({
    container: 'container',
  });
}

export function buildBackground() {
  resetConfetti();
  stage.width(window.innerWidth);
  stage.height(window.innerHeight);

  resetBubbles();
  resetConfetti();
  stage.removeChildren();
  layer = new Konva.Layer();
  stage.add(layer);

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
  moveConfetti();
  moveBubbles();
  moveSpiral();
  moveOrbs();
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
