import Konva from 'konva';

import type { Rect } from 'konva/lib/shapes/Rect';
import Victor from 'victor';
import { StageLayer, buildBackground } from './stage';

type Dot = {
  render: Rect;
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

export function buildSymbols(stageWidth: number, stageHeight: number) {
  symbols = [];
  width = stageWidth; // Math.min(stageWidth, stageHeight) / 4;
  height = stageHeight; //Math.min(stageWidth, stageHeight) / 4;
  layer = new Konva.Layer();
  function buildD() {
    const randDir = new Victor(
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    const builtDot = buildDot({
      x: Math.random() * width,
      y: Math.random() * height,
      w: 20,
      velocity: randDir,
    });
    layer.add(builtDot.render);
    symbols.push(builtDot);
  }

  for (let i = 0; i < 1000; i++) {
    buildD();
  }

  return layer;
  layer = new Konva.Layer();
  symbols = [];

  width = stageWidth; // Math.min(stageWidth, stageHeight) / 4;
  height = stageHeight; //Math.min(stageWidth, stageHeight) / 4;
  const extraOffsetX = (stageWidth - width) / 2;
  const extraOffsetY = (stageHeight - height) / 2;

  const dim = 15;
  const gap = 20;
  const cols = 2; // Math.floor(width / (dim + gap));
  const rows = 2; // Math.floor(height / (dim + gap));
  const xOffset = (width - cols * (dim + gap)) / 2;
  const yOffset = (height - rows * (dim + gap)) / 2;

  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      const builtDot = buildDot({
        w: dim,
        x: x * (dim + gap) + xOffset + extraOffsetX,
        y: y * (dim + gap) + yOffset + extraOffsetY,
        velocity: new Victor(Math.random() - 0.5, Math.random() - 0.5)
          .normalize()
          .divideScalar(10),
      });
      layer.add(builtDot.render);
      symbols.push(builtDot);
    }
  }
  return layer;
}
let coher = false;
let align = false;
let seperate = false;
window.addEventListener('keydown', (e) => {
  if (e.key === 'c') {
    coher = !coher;
  }
  if (e.key === 'a') {
    align = !align;
  }
  if (e.key === 's') {
    seperate = !seperate;
  }
  if (e.key === 'b') {
    buildBackground();
  }
});

export function updateSymbols() {
  // return;
  // const nextSymbols: Dot[] = [];

  symbols.forEach((symbol, i) => {
    checkBorder(symbol.location);
    if (i === 0) {
      symbol.render.fill('red');
    }

    if (coher) {
      coherence(symbols, symbol);
    }
    if (align) {
      alignment(symbols, symbol);
    }
    if (seperate) {
      seperation(symbols, symbol);
    }

    symbol.velocity.add(symbol.acceleration);
    if (symbol.velocity.magnitude() > 10) symbol.velocity.multiplyScalar(0.9);
    symbol.location.add(symbol.velocity);

    symbol.render.x(symbol.location.x);
    symbol.render.y(symbol.location.y);

    symbol.acceleration = new Victor(0, 0);
  });
}

function coherence(symbols: Dot[], thisSymbol: Dot) {
  const visionRadius = 100;
  let closeSymbols = 0;
  let averagePosition = new Victor(0, 0);

  symbols.forEach((otherSymbol) => {
    if (thisSymbol === otherSymbol) return;

    if (thisSymbol.location.distance(otherSymbol.location) < visionRadius) {
      closeSymbols++;
      averagePosition.add(otherSymbol.location);
    }
  });

  if (closeSymbols > 0) {
    averagePosition.divideScalar(closeSymbols);
  }
  if (averagePosition.magnitude() > 0) {
    averagePosition.normalize();
    thisSymbol.acceleration.add(averagePosition).multiplyScalar(0.002);
  }
}

function alignment(symbols: Dot[], thisSymbol: Dot) {
  const c = new Victor(0, 0);
  let count = 0;

  symbols.forEach((otherSymbol) => {
    if (thisSymbol === otherSymbol) return;
    if (thisSymbol.location.distance(otherSymbol.location) < 50) {
      count++;
      const diff = thisSymbol.velocity.clone().subtract(otherSymbol.velocity);
      c.subtract(diff);
    }
  });
  if (c.magnitude() > 0) {
    c.normalize();
    thisSymbol.acceleration.add(c).multiplyScalar(0.02);
  }
}

function seperation(symbols: Dot[], thisSymbol: Dot) {
  const c = new Victor(0, 0);
  let count = 0;

  symbols.forEach((otherSymbol) => {
    if (thisSymbol === otherSymbol) return;
    const d = thisSymbol.location.distance(otherSymbol.location);
    if (d < 50) {
      const diff = thisSymbol.velocity.clone().subtract(otherSymbol.velocity);
      diff.divideScalar(d * d);
      c.add(diff);
      count++;
    }
  });

  if (count > 0) {
    c.normalize();
    thisSymbol.acceleration.add(c).multiplyScalar(0.02);
  }
  // seperation() {
  //   let c = createVector(0, 0);
  //   let count = 0;
  //   for (let bird of birds) {
  //     if (bird !== this) {
  //       if (dist(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y) < this.seeRadius-30) {
  //         count++;
  //         let difference = p5.Vector.sub(this.pos, bird.pos);
  //         c = p5.Vector.sub(difference, c);
  //       }
  //     }
  //   }
  //   return c;
  // }
}

function checkBorder(location: Victor) {
  if (location.x < 0) location.x = width;
  if (location.x > width) location.x = 0;
  if (location.y < 0) location.y = height;
  if (location.y > height) location.y = 0;
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
  const rect = new Konva.Rect({
    x,
    y,
    width: w,
    height: w,
    listening: false,
    fill: 'white',
    perfectDrawEnabled: false,
  });

  rect.offsetX(rect.width() / 2);
  rect.offsetY(rect.height() / 2);
  rect.x(rect.x() + rect.width() / 2);
  rect.y(rect.y() + rect.height() / 2);

  return {
    render: rect,
    velocity,
    acceleration: new Victor(0, 0),
    location,
  };
}
