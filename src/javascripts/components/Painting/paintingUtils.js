import { PIXEL_SIZE, COLORS } from './constants';

export function generatePixels(sectionX, sectionY, width, height) {
  let pixels = {};
  for(let x = sectionX; x < ((width * sectionX) + width); x+=PIXEL_SIZE) {
    for(let y = sectionY; y < ((height * sectionY) + height); y+=PIXEL_SIZE) {
      pixels[`${x},${y}`] = COLORS.eraser;
    }
  }
  return pixels;
}

export function getCoords(sectionX, sectionY, syntheticEvent) {
  const e = syntheticEvent.nativeEvent;
  let { offsetX, offsetY } = e;
  
  if(!offsetX && e.touches) {
    const touch = e.touches[0];
    const target = e.target;
    offsetX = touch.clientX - target.offsetParent.offsetLeft;
    offsetY = touch.clientY - target.offsetParent.offsetTop;
  }
  
  return [
    ((Math.ceil(offsetX / PIXEL_SIZE) * PIXEL_SIZE) - PIXEL_SIZE) + (sectionX * PIXEL_SIZE),
    ((Math.ceil(offsetY / PIXEL_SIZE) * PIXEL_SIZE) - PIXEL_SIZE) + (sectionY * PIXEL_SIZE)
  ];
}

export function getLocalCoords([pixelX, pixelY], sectionX, sectionY) {
  return [
    pixelX - (sectionX * PIXEL_SIZE),
    pixelY - (sectionY * PIXEL_SIZE)
  ];
}

export function addDashedLineToCtx() {
  // dashed line functionality for ctx
  // https://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas#answer-4577326 
  var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
  if (CP && CP.lineTo){
    CP.dashedLine = function(x,y,x2,y2,dashArray){
      if (!dashArray) dashArray=[10,5];
      if (dashLength==0) dashLength = 0.001; // Hack for Safari
      var dashCount = dashArray.length;
      this.moveTo(x, y);
      var dx = (x2-x), dy = (y2-y);
      var slope = dx ? dy/dx : 1e15;
      var distRemaining = Math.sqrt( dx*dx + dy*dy );
      var dashIndex=0, draw=true;
      while (distRemaining>=0.1){
        var dashLength = dashArray[dashIndex++%dashCount];
        if (dashLength > distRemaining) dashLength = distRemaining;
        var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
        if (dx<0) xStep = -xStep;
        x += xStep
        y += slope*xStep;
        this[draw ? 'lineTo' : 'moveTo'](x,y);
        distRemaining -= dashLength;
        draw = !draw;
      }
    }
  }
}
