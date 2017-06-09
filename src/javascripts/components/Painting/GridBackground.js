import React, { Component } from 'react';
import { PIXEL_SIZE } from './constants';
import { addDashedLineToCtx } from './paintingUtils';
import styled from "styled-components";

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

    this.state = {
      initialized: false
    };
  }

  initializeCtx(canvas) {
    if(this.state.initialized) return
    addDashedLineToCtx();
    const { width, height } = this.props;
    const offset = 0.5; // w/o this the lines will look blurry
    const ctx = canvas.getContext("2d");
    const dashSize = Math.max(PIXEL_SIZE / 10, 1);
    const dashGap = Math.max(PIXEL_SIZE / 8, 1);
    const dashOptions = [dashSize, dashGap];
    ctx.globalAlpha = 1;
    ctx.beginPath();
    for(let x = PIXEL_SIZE; x < width; x+=PIXEL_SIZE) {
      ctx.dashedLine(x - offset, 0, x - offset, height, dashOptions);
    }
    for(let y = PIXEL_SIZE; y < height; y+=PIXEL_SIZE) {
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
          ref={(canvas) => { this.initializeCtx(canvas) }}
          width={width} 
          height={height}/>
      </Wrapper>
    );
  }
}

export default GridBackground;