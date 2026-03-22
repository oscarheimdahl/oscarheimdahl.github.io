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
const maxSpeed = 1.5;
const symbolWidth = 5;

const cohesionMagnitude = maxSpeed * 0.002;
const alignmentMagnitude = maxSpeed * 0.001;
const seperationMagnitude = maxSpeed * 0.0015;

const cohesionRange = 400;
const alignmentRange = 100;
const seperationRange = symbolWidth * 2;

const mouseRange = 100;
const mouseForce = maxSpeed * 0.5;

const centerRange = 500;
const centerForce = maxSpeed * 0.35;

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
    const builtDot = createSymbol({
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
  symbols.forEach(updateSymbol);
}

function updateSymbol(symbol: Dot) {
  wrapAtEdges(symbol.location);

  symbol.acceleration = new Victor(0, 0);

  applyMouseRepulsion(symbol);
  applyCenterRepulsion(symbol);
  applyFlockingForces(symbol);

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
}

function applyMouseRepulsion(symbol: Dot) {
  // mousePositions.forEach((position) => {
  if (mousePosition) {
    const diff = symbol.location.clone().subtract(mousePosition);
    const distance = diff.magnitude();

    if (distance < mouseRange) {
      // Stronger repulsion when close, tapered with distance.
      diff.normalize();
      const strength = mouseForce / Math.max(distance, 1);
      symbol.acceleration.add(diff.multiplyScalar(strength));

      const scaleBoost = 1 + (mouseRange - distance) / mouseRange;
      symbol.render.scaleX(1 + 0.2 * scaleBoost);
      symbol.render.scaleY(1.5 + 0.8 * scaleBoost);
    } else {
      symbol.render.scaleX(1);
      symbol.render.scaleY(1.5);
    }
  }
  // });
}

function applyCenterRepulsion(symbol: Dot) {
  const center = new Victor(width / 2, height / 2);
  const diff = symbol.location.clone().subtract(center);
  const distance = diff.magnitude();

  if (distance < centerRange) {
    // Push away from the canvas center with distance falloff.
    diff.normalize();
    const strength = centerForce / Math.max(distance, 1);
    symbol.acceleration.add(diff.multiplyScalar(strength));
  }
}

function applyFlockingForces(symbol: Dot) {
  let coherenceClose = 0;
  let coherenceAveragePosition = new Victor(0, 0);
  const alignmentC = new Victor(0, 0);
  let alignmentCount = 0;
  const seperationC = new Victor(0, 0);
  let seperationCount = 0;

  symbols.forEach((otherSymbol) => {
    if (symbol === otherSymbol) return;
    const distance = symbol.location.distance(otherSymbol.location);

    if (distance < cohesionRange) {
      coherenceClose++;
      coherenceAveragePosition.add(otherSymbol.location);
    }
    if (distance < alignmentRange) {
      alignmentCount++;
      alignmentC.add(otherSymbol.velocity);
    }
    if (distance < seperationRange) {
      const diff = symbol.location.clone().subtract(otherSymbol.location);
      if (diff.magnitude() > 0) {
        // Stronger repulsion when very close.
        diff.normalize();
        diff.multiplyScalar(1 / Math.max(distance, 0.001));
        seperationC.add(diff);
        seperationCount++;
      }
    }
  });

  if (coherenceClose > 0) {
    coherenceAveragePosition.divideScalar(coherenceClose);
    const cohesionSteer = coherenceAveragePosition
      .clone()
      .subtract(symbol.location);
    if (cohesionSteer.magnitude() > 0) cohesionSteer.normalize();
    cohesionSteer.multiplyScalar(cohesionMagnitude);
    symbol.acceleration.add(cohesionSteer);
  }
  if (alignmentCount > 0) {
    alignmentC.divideScalar(alignmentCount);
    if (alignmentC.magnitude() > 0) alignmentC.normalize();
    alignmentC.multiplyScalar(alignmentMagnitude);
    symbol.acceleration.add(alignmentC);
  }
  if (seperationCount > 0) {
    seperationC.divideScalar(seperationCount);
    if (seperationC.magnitude() > 0) seperationC.normalize();
    seperationC.multiplyScalar(seperationMagnitude);
    symbol.acceleration.add(seperationC);
  }
}

function wrapAtEdges(location: Victor) {
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

function createSymbol({
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
