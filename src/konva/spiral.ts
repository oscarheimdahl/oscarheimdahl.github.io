import Konva from 'Konva';

import type { Circle } from 'Konva/lib/shapes/Circle';
import type { Rect } from 'Konva/lib/shapes/Rect';
import Victor from 'victor';
import { inViewport, layer, map } from './background';

type Particle = {
  circle: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

let spiral: Particle[] = []; // buildCircles();

export function fireSpiral({
  x = Math.random() * window.innerWidth,
  y = Math.random() * window.innerHeight,
  n = 400,
}: {
  x?: number;
  y?: number;
  n?: number;
}) {
  if (spiral.length > 3000) return;
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
    const particle = buildParticle({
      x,
      y,
      w: map(velocity.length(), speed / 2, speed + speed / 2, 4, 20),
      velocity: velocity,
      fill: `hsl(${H} ${S}% ${L}%)`,
    });
    spiral.push(particle);
    setTimeout(() => {
      particle.location = new Victor(99999, 99999);
    }, 20 * 1000);
  }
  return true;
}

export function moveSpiral() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextOrbs = [];
  spiral.forEach((particle, i) => {
    // orb.acceleration = new Victor(0, 0.1); //targetVec;

    particle.velocity.add(particle.acceleration);
    particle.location.add(particle.velocity);
    particle.velocity.rotateDeg(0.5);
    particle.circle.x(particle.location.x);
    particle.circle.y(particle.location.y);

    const keepParticle = inViewport(particle.circle, {});

    if (keepParticle) nextOrbs.push(particle);
    else particle.circle.remove();
  });

  spiral = nextOrbs;
}

export function resetConfetti() {
  spiral = [];
}

interface BuildCircleArgs {
  x: number;
  y: number;
  w: number;
  velocity?: Victor;
  location?: Victor;
  fill?: string;
}
function buildParticle({
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
