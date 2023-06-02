import Konva from 'Konva';

import type { Circle } from 'Konva/lib/shapes/Circle';
import Victor from 'victor';
import { layer } from './background';

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.x;
  mouseY = e.y;
});

type Bubble = {
  circle: Circle;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
  home: Victor;
  remove: boolean;
};

let bubbles: Bubble[] = [];

export function startBubbles({
  x = Math.random() * window.innerWidth,
  y = Math.random() * window.innerHeight,
  n = 100,
}: {
  x?: number;
  y?: number;
  n?: number;
}) {
  const speed = 2;
  const H = 0;
  const S = 0;

  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const L = Math.floor(Math.random() * 20);
      const circle = buildCircle({
        x,
        y: window.innerHeight * 1,
        w: Math.floor(Math.random() * 100),
        velocity: new Victor(
          Math.random() * 4 - 2,
          -(Math.random() * speed + speed / 4)
        ),
        fill: `hsl(${H} ${S}% ${L}%)`,
      });
      bubbles.push(circle);
    }, i * 10);
  }
  return true;
}

export function moveBubbles() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const nextBubbles = [];
  bubbles.forEach((bubble, i) => {
    const targetVec = new Victor(mouseX, mouseY);
    targetVec.subtract(bubble.location);
    bubble.acceleration.add(
      new Victor(targetVec.normalize().multiplyScalar(0.0001).x, 0)
    );
    bubble.acceleration.add(new Victor(0, -0.00001));
    bubble.velocity.divideScalarX(1.01);
    // glitter.acceleration.limit(5, 0.1);
    bubble.velocity.add(bubble.acceleration);
    bubble.location.add(bubble.velocity);

    bubble.circle.x(bubble.location.x);
    bubble.circle.y(bubble.location.y);

    const outsideScreen =
      bubble.circle.y() > 0 &&
      bubble.circle.y() < height &&
      bubble.circle.x() > 0 &&
      bubble.circle.x() < width;

    if (outsideScreen) nextBubbles.push(bubble);
    else bubble.circle.remove();
  });

  bubbles = nextBubbles;
}

export function resetBubbles() {
  bubbles = [];
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
  const circle = new Konva.Circle({
    x,
    y,
    width: w / 2,
    fill: '',
    stroke: 'white',
    listening: false,
    cornerRadius: 10,
  });
  layer.add(circle);

  return {
    fill,
    circle: circle,
    velocity,
    acceleration: new Victor(0, 0),
    location,
    home: new Victor(circle.x(), circle.y()),
    remove: false,
  };
}
