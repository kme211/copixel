import React from "react";
import styled, { css } from "styled-components";
import { BACKGROUNDS, BLOCK_SIZE_PX, SECTION_SIZE_PX } from "../../../constants";

const styles = ({ top, right, bottom, left, width, height, background }) => css`
  position: absolute;
  ${top && `top: ${top};`}
  ${right && `right: ${right};`}
  ${bottom && `bottom: ${bottom};`}
  ${left && `left: ${left};`}
  content: '';
  background: ${background};
  height: ${height}px;
  width: ${width}px;
  display: flex;
  flex-direction: ${width === BLOCK_SIZE_PX ? "column" : "row"};
`;

const Wrapper = styled.div`${styles}`;

const pixelStyles = ({ color }) => css`
  flex: 1;
  background: ${color};
`;

const Pixel = styled.div`${pixelStyles}`;

const Neighbor = ({ onClick, centerX, centerY, data, ...props }) => {
  console.log(data)
  return (
    <Wrapper
      {...props}
      background={data ? "transparent" : BACKGROUNDS.blankNeighbor}
    >
      {data &&
        data.map(color => (
          <Pixel color={color} onClick={onClick} data-color={color} />
        ))}
    </Wrapper>
  );
};

export default Neighbor;
