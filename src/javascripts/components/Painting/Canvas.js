import React, { Component } from 'react';
import { getCoords, getLocalCoords } from './paintingUtils';
import { COLORS, BRUSH, ERASER, PIXEL_SIZE } from './constants';

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      pixels: {},
      isDrawing: false,
      highlightedPos: null
    };

    this.startDraw = this.startDraw.bind(this);
    this.stopDraw = this.stopDraw.bind(this);
    this.stopEverything = this.stopEverything.bind(this);
    this.draw = this.draw.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  initializeCtx(canvas) {
    if(this.state.initialized) return;
    const { width, height } = this.props;
    this.ctx = canvas.getContext("2d");
    this.setState({ initialized: true });
  }

  updateCanvas() {
    const { pixels, width, height, currentTool, currentColor, x: sectionX, y: sectionY } = this.props;
    const { highlightedPos } = this.state;
    const ctx = this.ctx;

    // clear canvas
    ctx.clearRect(0, 0, width, height);
    // redraw pixels
    for(var pos in pixels) {
      const [x, y] = getLocalCoords(pos.split(','), sectionX, sectionY);
      console.log(`sectionX: ${sectionX}, sectionY: ${sectionY}, x: ${x}, y: ${y}`);
      
      let fillStyle = null;
      
      if(pos === highlightedPos) fillStyle = (currentTool === ERASER ? COLORS.eraser : currentColor);
      else if(pixels[pos]) fillStyle = pixels[pos];
      
      if(fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }

  draw(e) {
    e.persist();
    const { currentColor, currentTool, pixels, updatePixels, x: sectionX, y: sectionY } = this.props;
    const { isDrawing } = this.state;
    const isHighlighting = !isDrawing;
    const { offsetX: mouseX, offsetY: mouseY} = e;
    const [x, y] = getCoords(sectionX, sectionY, e);
    if(isHighlighting) {
      this.setState({ highlightedPos: `${x},${y}` }, () => {
        this.updateCanvas();
      });
    } else if(isDrawing) {
      const updatedPixels = Object.assign({}, pixels, { [`${x},${y}`]: (currentTool === ERASER ? COLORS.eraser : currentColor) });
      updatePixels(updatedPixels, this.updateCanvas);
    }
  }

  startDraw(e) {
    e.persist();
    this.setState({
      isDrawing: true,
      isHighlighting: false
    }, () => {
      this.draw(e);
    });
  }

  stopDraw(e) {
    e.persist();
    this.setState({
      isDrawing: false
    });
  }

  stopEverything() {
    this.setState({
      isDrawing: false,
      highlightedPos: null
    }, () => {
      this.updateCanvas();
    });
  }

  render() {
    const { height, width, interactive } = this.props;
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
      return (
        <canvas ref={(canvas) => { this.initializeCtx(canvas) }}
          width={width} 
          height={height}/>
      );
    }
  }
}

export default Canvas;