import Konva from 'Konva';
import type { Layer } from 'Konva/lib/Layer';
import type { Stage } from 'Konva/lib/Stage';
import { moveConfetti, resetConfetti } from './confetti';
import { moveBubbles, resetBubbles } from './bubbles';

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
  requestAnimationFrame(move);
}

function map(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
