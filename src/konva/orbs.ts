import Konva from 'Konva';

import type { Circle } from 'Konva/lib/shapes/Circle';
import type { Rect } from 'Konva/lib/shapes/Rect';
import Victor from 'victor';
import { layer, map } from './background';

type Orb = {
  circle: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

let orbs: Orb[] = []; // buildCircles();

export function toggleOrbs({
  x = Math.random() * window.innerWidth,
  y = Math.random() * window.innerHeight,
  n = 400,
}: {
  x?: number;
  y?: number;
  n?: number;
}) {
  if (orbs.length > 3000) return;
  const speed = 10;
  const S = 60;

  for (let i = 0; i < n; i++) {
    const H = Math.floor(Math.random() * 20);
    const L = Math.floor(Math.random() * 70 + 30);
    const angle = Math.random() * 360;
    const velocity = new Victor(
      Math.random() * speed + speed / 2,
      0
    ).rotateByDeg(angle);
    const orb = buildOrb({
      x,
      y,
      w: map(velocity.length(), speed / 2, speed + speed / 2, 4, 20),
      velocity: velocity,
      fill: `hsl(${H} ${S}% ${L}%)`,
    });
    orbs.push(orb);
  }
  return true;
}

export function moveOrbs() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextOrbs = [];
  orbs.forEach((orb, i) => {
    // orb.acceleration = new Victor(0, 0.1); //targetVec;

    orb.velocity.add(orb.acceleration);
    orb.location.add(orb.velocity);
    orb.velocity.rotateDeg(0.5);
    orb.circle.x(orb.location.x);
    orb.circle.y(orb.location.y);

    const inViewport =
      orb.circle.y() > 0 &&
      orb.circle.y() < height &&
      orb.circle.x() > 0 &&
      orb.circle.x() < width;

    if (inViewport) nextOrbs.push(orb);
    else orb.circle.remove();
  });

  orbs = nextOrbs;
}

export function resetConfetti() {
  orbs = [];
}

interface BuildCircleArgs {
  x: number;
  y: number;
  w: number;
  velocity?: Victor;
  location?: Victor;
  fill?: string;
}
function buildOrb({
  x,
  y,
  w,
  velocity = new Victor(0, 0),
  location = new Victor(x, y),
  fill = 'white',
}: BuildCircleArgs) {
  const orb = new Konva.Circle({
    x,
    y,
    width: w / 2,
    fill,
    rotation: Math.floor(Math.random() * 360),
    listening: false,
    cornerRadius: 10,
  });
  layer.add(orb);

  return {
    circle: orb,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(orb.x(), orb.y()),
    remove: false,
  };
}
