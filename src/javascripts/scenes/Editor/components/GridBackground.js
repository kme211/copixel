import React, { Component } from "react";
import styled from "styled-components";
import { BLOCK_SIZE_PX } from "../../../constants";
import addDashedLineToCtx from "../services/addDashedLineToCtx";

const Wrapper = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
`;

class GridBackground extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  initializeCtx(canvas) {
    if (!canvas) return;
    addDashedLineToCtx();
    const { width, height } = this.props;
    const offset = 0.5; // w/o this the lines will look blurry
    const ctx = canvas.getContext("2d");
    const dashSize = Math.max(BLOCK_SIZE_PX / 10, 1);
    const dashGap = Math.max(BLOCK_SIZE_PX / 8, 1);
    const dashOptions = [dashSize, dashGap];
    ctx.globalAlpha = 1;
    ctx.beginPath();
    for (let x = BLOCK_SIZE_PX; x < width; x += BLOCK_SIZE_PX) {
      ctx.dashedLine(x - offset, 0, x - offset, height, dashOptions);
    }
    for (let y = BLOCK_SIZE_PX; y < height; y += BLOCK_SIZE_PX) {
      ctx.dashedLine(0, y - offset, width, y - offset, dashOptions);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#c8ccce";
    ctx.stroke();
    this.setState({ initialized: true });
  }

  render() {
    const { width, height } = this.props;
    return (
      <Wrapper>
        <canvas
          ref={canvas => {
            this.initializeCtx(canvas);
          }}
          width={width}
          height={height}
        />
      </Wrapper>
    );
  }
}

export default GridBackground;
