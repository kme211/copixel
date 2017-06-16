import React, { Component } from "react";
import { getCoords, getLocalCoords, fill } from "./paintingUtils";
import {
  COLORS,
  BRUSH,
  ERASER,
  PAINT_BUCKET,
  EYE_DROPPER,
  BLOCK_SIZE_PX
} from "./constants";

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.updateCanvas = this.updateCanvas.bind(this);
  }

  initializeCtx(canvas) {
    if (!canvas) return;
    const { width, height } = this.props;
    this.ctx = canvas.getContext("2d");
    if (this.props.width && this.props.height) this.updateCanvas();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    this.updateCanvas();
  }

  updateCanvas() {
    let {
      embed,
      embedWidth,
      highlightedPos,
      pixels,
      width,
      height,
      currentTool,
      currentColor,
      x: sectionX,
      y: sectionY
    } = this.props;
    let scale = 1;

    if (embed) {
      scale = embedWidth / width;
      width = width * scale;
      height = height * scale;
    }

    const ctx = this.ctx;
    // clear canvas
    ctx.clearRect(0, 0, width, height);
    // redraw pixels
    for (var pos in pixels) {
      let [x, y] = pos.split(",").map(parseFloat);
      if (sectionX >= 0) {
        const localCoords = getLocalCoords(x, y, sectionX, sectionY);
        x = localCoords[0];
        y = localCoords[1];
      }

      if (embed) {
        x = x * scale;
        y = y * scale;
      }

      const blockSize = BLOCK_SIZE_PX * scale;

      let fillStyle = null;

      if (`${x},${y}` === highlightedPos)
        fillStyle = currentTool === ERASER ? COLORS.eraser : currentColor;
      else if (pixels[pos]) fillStyle = pixels[pos];

      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, blockSize, blockSize);
      }
    }
  }

  render() {
    const { embed, embedWidth, pixels, height, width, ...props } = this.props;
    let scale = 1;
    if (embedWidth) {
      scale = embedWidth / width;
    }
    return (
      <canvas
        ref={canvas => {
          this.initializeCtx(canvas);
        }}
        width={width * scale}
        height={height * scale}
        {...props}
      />
    );
  }
}

export default Canvas;