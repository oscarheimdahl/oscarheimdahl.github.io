import Konva from 'Konva';

import type { Circle } from 'Konva/lib/shapes/Circle';
import type { Rect } from 'Konva/lib/shapes/Rect';
import Victor from 'victor';
import { layer } from './background';

type Confetti = {
  rect: Rect;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

let confettis: Confetti[] = []; // buildCircles();

export function explode({
  x = Math.random() * window.innerWidth,
  y = Math.random() * window.innerHeight,
  n = 400,
}: {
  x?: number;
  y?: number;
  n?: number;
}) {
  if (confettis.length > 2000) return;
  const speed = 10;
  const S = 60;

  for (let i = 0; i < n; i++) {
    const H = Math.floor(Math.random() * 255);
    const L = Math.floor(Math.random() * 70 + 30);
    const angle = Math.random() * 360;
    const circle = buildCircle({
      x,
      y,
      w: 4,
      velocity: new Victor(Math.random() * speed - speed / 2, 0)
        .rotateByDeg(angle)
        .add(new Victor(0, -3)),
      fill: `hsl(${H} ${S}% ${L}%)`,
    });
    confettis.push(circle);
  }
  return true;
}

export function moveConfetti() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextCircles = [];
  confettis.forEach((confetti, i) => {
    confetti.acceleration = new Victor(0, 0.1); //targetVec;

    confetti.velocity.add(confetti.acceleration);
    confetti.location.add(confetti.velocity);

    confetti.rect.x(confetti.location.x);
    confetti.rect.y(confetti.location.y);
    confetti.rect.rotate(1);

    const outsideScreen =
      confetti.rect.y() < height &&
      confetti.rect.x() > 0 &&
      confetti.rect.x() < width;

    if (outsideScreen) nextCircles.push(confetti);
    else confetti.rect.remove();
  });

  confettis = nextCircles;
}

export function resetConfetti() {
  confettis = [];
}

interface BuildCircleArgs {
  x: number;
  y: number;
  w: number;
  velocity?: Victor;
  location?: Victor;
  fill?: string;
}
function buildCircle({
  x,
  y,
  w,
  velocity = new Victor(0, 0),
  location = new Victor(x, y),
  fill = 'white',
}: BuildCircleArgs) {
  const rect = new Konva.Rect({
    x,
    y,
    width: w / 2,
    height: w * 2,
    fill,
    rotation: Math.floor(Math.random() * 360),
    listening: false,
    cornerRadius: 10,
  });
  layer.add(rect);

  return {
    rect: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(rect.x(), rect.y()),
    remove: false,
  };
}
