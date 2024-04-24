import Konva from 'konva';

import type { RegularPolygon } from 'konva/lib/shapes/RegularPolygon';
import Victor from 'victor';
import { StageLayer } from './stage';

type Dot = {
  render: RegularPolygon;
  location: Victor;
  velocity: Victor;
  acceleration: Victor;
};

let symbols: Dot[] = [];
let layer: Konva.Layer;

export const flockLayer: StageLayer = {
  build: buildSymbols,
  update: updateSymbols,
};

let width = 0;
let height = 0;

const maxAcceleration = 0.1;
const maxSpeed = 2;
const symbolWidth = 5;

const cohesionMagnitude = maxSpeed * 0.002;
const alignmentMagnitude = maxSpeed * 0.001;
const seperationMagnitude = maxSpeed * 0.0015;

const cohesionRange = 400;
const alignmentRange = 100;
const seperationRange = symbolWidth * 2;

let mousePosition: Victor | undefined;
// let fixedPositions: Victor[] = [];
window.addEventListener('mousemove', (e) => {
  const target = e.target as HTMLCanvasElement;
  if (target.nodeName !== 'CANVAS') return;

  mousePosition = new Victor(e.clientX, e.clientY);
  // mousePositions.push(new Victor(e.clientX, e.clientY));
  setTimeout(() => {
    mousePosition = undefined;
    // mousePositions.shift();
  }, 100);
});

export function buildSymbols(stageWidth: number, stageHeight: number) {
  symbols = [];
  width = stageWidth; // Math.min(stageWidth, stageHeight) / 4;
  height = stageHeight; //Math.min(stageWidth, stageHeight) / 4;
  // fixedPositions = [new Victor(width / 2, height / 2)];
  layer = new Konva.Layer();

  for (let i = 0; i < 100; i++) {
    const builtDot = buildDot({
      x: Math.random() * width,
      y: Math.random() * height,
      w: symbolWidth,
      // velocity: new Victor(-1, -1),
    });

    layer.add(builtDot.render);
    symbols.push(builtDot);
  }

  return layer;
}

export function updateSymbols() {
  symbols.forEach((symbol) => {
    checkBorder(symbol.location);

    symbol.acceleration = new Victor(0, 0);

    // mousePositions.forEach((position) => {
    if (mousePosition) {
      const diff = mousePosition.clone().subtract(symbol.location);
      if (diff.magnitude() < 50) {
        symbol.render.scaleX(1.5);
        symbol.render.scaleY(3);
        diff.normalize();
        diff.rotateDeg(180);
        symbol.velocity = diff;
        symbol.acceleration.rotateByDeg(Math.random() > 0.5 ? 2 : -2);
      } else {
        symbol.render.scaleX(1);
        symbol.render.scaleY(1.5);
      }
    }
    // });

    applyForces(symbol);

    symbol.velocity.add(symbol.acceleration);
    symbol.render.fill('#0A0A0A');
    const speedPercent = symbol.velocity.magnitude() / maxSpeed;
    const roundedPercent = Math.floor(speedPercent * 100);
    symbol.render.fill(`hsl(255,100%,${roundedPercent}%)`);

    if (symbol.acceleration.magnitude() > maxAcceleration)
      symbol.velocity.multiplyScalar(0.8);

    if (symbol.velocity.magnitude() > maxSpeed)
      symbol.velocity.multiplyScalar(0.8);

    symbol.location.add(symbol.velocity);
    symbol.render.rotation(symbol.velocity.angleDeg() + 95);

    symbol.render.x(symbol.location.x);
    symbol.render.y(symbol.location.y);
  });
}

function applyForces(thisSymbol: Dot) {
  let coherenceClose = 0;
  let coherenceAveragePosition = new Victor(0, 0);
  const alignmentC = new Victor(0, 0);
  let alignmentCount = 0;
  const seperationC = new Victor(0, 0);
  let seperationCount = 0;

  symbols.forEach((otherSymbol) => {
    if (thisSymbol === otherSymbol) return;
    const distance = thisSymbol.location.distance(otherSymbol.location);

    if (distance < cohesionRange) {
      coherenceClose++;
      coherenceAveragePosition.add(otherSymbol.location);
    }
    if (distance < alignmentRange) {
      alignmentCount++;
      const diff = thisSymbol.velocity.clone().subtract(otherSymbol.velocity);
      alignmentC.subtract(diff);
    }
    if (distance < seperationRange) {
      const diff = thisSymbol.velocity.clone().subtract(otherSymbol.velocity);
      diff.normalize();
      seperationC.add(diff);
      seperationCount++;
    }
  });

  if (coherenceClose > 0) {
    coherenceAveragePosition.divideScalar(coherenceClose);
    if (coherenceAveragePosition.magnitude() > 0) {
      coherenceAveragePosition.normalize();
      coherenceAveragePosition.multiplyScalar(cohesionMagnitude);
      thisSymbol.acceleration.add(coherenceAveragePosition);
    }
  }
  if (alignmentCount > 0) {
    alignmentC.normalize();
    alignmentC.multiplyScalar(alignmentMagnitude);
    thisSymbol.acceleration.add(alignmentC);
  }
  if (seperationCount > 0) {
    seperationC.normalize();
    seperationC.multiplyScalar(seperationMagnitude);
    thisSymbol.acceleration.add(seperationC);
  }
}

function checkBorder(location: Victor) {
  if (location.x < -symbolWidth) location.x = width;
  if (location.x > width + symbolWidth) location.x = -symbolWidth;
  if (location.y < -symbolWidth) location.y = height;
  if (location.y > height + symbolWidth) location.y = -symbolWidth;
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
  const rect = new Konva.RegularPolygon({
    x,
    y,
    sides: 3,
    radius: w,
    // width: w,
    // height: w * 2.5,
    listening: false,
    fill: '#555',
    // cornerRadius: 10,
    perfectDrawEnabled: false,
  });

  rect.scaleY(1.5);

  return {
    render: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
  };
}
