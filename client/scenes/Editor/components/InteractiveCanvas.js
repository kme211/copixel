import React, { Component } from "react";
import getCoords from "../services/getCoords";
import fill from "../services/fill";
import Canvas from "../../../components/Canvas";
import {
  COLORS,
  BRUSH,
  ERASER,
  PAINT_BUCKET,
  EYE_DROPPER,
  BLOCK_SIZE_PX,
  SECTION_SIZE_PX
} from "@constants";

class InteractiveCanvas extends Component {
  constructor(props) {
    super(props);

    this.startDraw = this.startDraw.bind(this);
    this.stopDraw = this.stopDraw.bind(this);
    this.stopEverything = this.stopEverything.bind(this);
    this.draw = this.draw.bind(this);
  }

  draw(e) {
    e.persist();
    const {
      updateState,
      isDrawing,
      currentColor,
      currentTool,
      pixels,

      x: sectionX,
      y: sectionY
    } = this.props;
    const isHighlighting = !isDrawing && currentTool !== EYE_DROPPER;
    const [x, y] = getCoords(
      sectionX,
      sectionY,
      BLOCK_SIZE_PX,
      SECTION_SIZE_PX,
      e
    );

    if (isHighlighting) {
      updateState({ highlightedPos: `${x},${y}` });
    } else if (isDrawing) {
      let updatedPixels;
      if (currentTool === EYE_DROPPER) {
        return updateState({
          currentColor: pixels[`${x},${y}`],
          currentTool: BRUSH
        });
      }
      if (currentTool === PAINT_BUCKET) {
        updatedPixels = fill(pixels, `${x},${y}`, currentColor, BLOCK_SIZE_PX);
      } else {
        updatedPixels = Object.assign({}, pixels, {
          [`${x},${y}`]: currentTool === ERASER ? COLORS.eraser : currentColor
        });
      }
      updateState({ pixels: updatedPixels });
    }
  }

  startDraw(e) {
    e.persist();
    this.props.updateState(
      {
        isDrawing: true,
        isHighlighting: false
      },
      () => {
        this.draw(e);
      }
    );
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
    const { x, y, pixels, height, width } = this.props;
    return (
      <Canvas
        pixels={pixels}
        x={x}
        y={y}
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
  }
}

export default InteractiveCanvas;
