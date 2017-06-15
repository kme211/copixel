import React, { Component } from 'react';
import { getCoords, getLocalCoords, fill } from './paintingUtils';
import { COLORS, BRUSH, ERASER, PAINT_BUCKET, EYE_DROPPER, BLOCK_SIZE_PX } from './constants';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.startDraw = this.startDraw.bind(this);
    this.stopDraw = this.stopDraw.bind(this);
    this.stopEverything = this.stopEverything.bind(this);
    this.draw = this.draw.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  initializeCtx(canvas) {
    if(!canvas) return;
    const { width, height } = this.props;
    this.ctx = canvas.getContext("2d");
    if(this.props.width && this.props.height) this.updateCanvas();
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps !== this.props) return true;
    return false;
  }

  componentDidUpdate(prevProps){
    this.updateCanvas();
  }

  updateCanvas() {
    const { highlightedPos, pixels, width, height, currentTool, currentColor, x: sectionX, y: sectionY } = this.props;
    const ctx = this.ctx;
    // clear canvas
    ctx.clearRect(0, 0, width, height);
    // redraw pixels
    for(var pos in pixels) {
      let [x, y] = pos.split(',').map(parseFloat);
      if(sectionX >= 0) {
        const localCoords = getLocalCoords(x, y, sectionX, sectionY);
        x = localCoords[0];
        y = localCoords[1];
      }
      
      let fillStyle = null;
      
      if(`${x},${y}` === highlightedPos) fillStyle = (currentTool === ERASER ? COLORS.eraser : currentColor);
      else if(pixels[pos]) fillStyle = pixels[pos];
      
      if(fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, BLOCK_SIZE_PX, BLOCK_SIZE_PX);
      }
    }
  }

  draw(e) {
    e.persist();
    const { updateState, isDrawing, currentColor, currentTool, pixels, updatePixels, x: sectionX, y: sectionY } = this.props;
    const isHighlighting = !isDrawing && currentTool !== EYE_DROPPER;
    const { offsetX: mouseX, offsetY: mouseY} = e;
    const [x, y] = getCoords(sectionX, sectionY, e);
    
    if(isHighlighting) {
      updateState({ highlightedPos: `${x},${y}` });
    } else if(isDrawing) {
      let updatedPixels;
      if (currentTool === EYE_DROPPER) {
        return updateState({ currentColor: pixels[`${x},${y}`], currentTool: BRUSH })
      }
      if(currentTool === PAINT_BUCKET) {
        updatedPixels = fill(pixels, `${x},${y}`, currentColor);
      } else {
        updatedPixels = Object.assign({}, pixels, { [`${x},${y}`]: (currentTool === ERASER ? COLORS.eraser : currentColor) });
      }
      updateState({ pixels: updatedPixels });
    }
  }

  startDraw(e) {
    e.persist();
    this.props.updateState({
      isDrawing: true,
      isHighlighting: false
    }, () => {
      this.draw(e);
    });
  }

  stopDraw(e) {
    e.persist();
    this.props.updateState({
      isDrawing: false
    });
  }

  stopEverything() {
    this.props.updateState({
      isDrawing: false,
      highlightedPos: null
    });
  }

  render() {
    const { height, width, interactive, updateState } = this.props;
    if(interactive) {
      return (
        <canvas 
          ref={(canvas) => { this.initializeCtx(canvas) }}
          width={width} 
          height={height}
          onMouseDown={this.startDraw}
          onTouchStart={this.startDraw}
          onMouseMove={this.draw}
          onTouchMove={this.draw}
          onMouseUp={this.stopDraw}
          onTouchEnd={this.stopDraw}
          onMouseOut={this.stopEverything}
          />
      );
    } else {
      console.log('render non-interactive canvas', width, height)
      return (
        <canvas ref={(canvas) => { this.initializeCtx(canvas) }}
          width={width} 
          height={height}/>
      );
    }
  }
}

export default Canvas;