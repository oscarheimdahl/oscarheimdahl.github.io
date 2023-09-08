import Konva from 'Konva';

import type { Circle } from 'Konva/lib/shapes/Circle';
import type { Rect } from 'Konva/lib/shapes/Rect';
import Victor from 'victor';
import { inViewport, layer, map } from './background';

type Orb = {
  circle: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

let orbs: Orb[] = []; // buildCircles();

let mouseX = 0;
let mouseY = 0;

function handleMouseMove(e: MouseEvent) {
  mouseX = e.x;
  mouseY = e.y;
}

export function toggleOrbs(toggle: boolean) {
  // mouseX = x;
  // mouseY = y;
  if (!toggle) {
    resetOrbs();
    document.removeEventListener('mousemove', handleMouseMove);
    return;
  }
  document.addEventListener('click', () => (enablePush = !enablePush));
  document.addEventListener('mousemove', handleMouseMove);
  new Array(10000).fill(0).forEach((_, i) => {
    orbs.push(
      buildOrb({
        w: 4,
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
      })
    );
  });
}
let enablePush = false;
let dist = 200;
export function moveOrbs() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextOrbs = [];
  if (mouseX + mouseY === 0) return;
  orbs.forEach((orb, i) => {
    const mousePos = new Victor(mouseX, mouseY);
    const mag = mousePos.distance(orb.location);
    const maxMag = 40;
    const mappedMag = map(mag, 0, window.innerWidth, maxMag, 0);
    if (mag < dist && enablePush) {
      orb.acceleration = mousePos
        .subtract(orb.location)
        .normalize()
        .multiplyScalar(mappedMag)
        .invert();
    } else {
      const homeDiff = orb.home.distance(orb.location);
      orb.acceleration = orb.home
        .clone()
        .subtract(orb.location)
        .normalize()
        .multiplyScalar(0.2);
      orb.velocity.multiplyScalar(0.98);
      orb.velocity.limit(3, 0.5);
      if (homeDiff < 5) {
        orb.acceleration.multiply(new Victor(0.2, 0.2));
        if (orb.acceleration.magnitude() < 5)
          orb.acceleration = new Victor(0, 0);
      }
    }

    orb.velocity.add(orb.acceleration);

    orb.location.add(orb.velocity);
    // orb.velocity.limit(1, 0.9);

    // add(orb.velocity);

    orb.circle.x(orb.location.x);
    orb.circle.y(orb.location.y);

    const keepParticle = true; //inViewport(orb.circle, {});

    if (keepParticle) nextOrbs.push(orb);
    else orb.circle.remove();
  });

  orbs = nextOrbs;
  enablePush = false;
}

export function resetOrbs() {
  orbs.forEach((orb) => orb.circle.remove());
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
