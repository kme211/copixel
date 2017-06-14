import React from "react";
import Neighbor from "./Neighbor";
import { SECTION_SIZE_PX, BLOCK_SIZE_PX } from './constants';

function getNeighborDataForCenter(centerX, centerY) {
  return function(side, data) {
    if(!data) return null;
    const y = side === 'top' ? centerY - 1 : centerY  + 1;
    const x = side === 'left' ? centerX - 1 : centerX + 1;
    const regex = {
      top: new RegExp(`^\\d+,${(y * SECTION_SIZE_PX) + (SECTION_SIZE_PX -  BLOCK_SIZE_PX)}$`),
      right: new RegExp(`^${(x * SECTION_SIZE_PX)},\\d+$`),
      bottom: new RegExp(`^\\d+,${(y * SECTION_SIZE_PX)}$`),
      left: new RegExp(`^${(x * SECTION_SIZE_PX) + (SECTION_SIZE_PX -  BLOCK_SIZE_PX)},\\d+$`)
    };
    const keys = Object.keys(data).filter(key => regex[side].test(key));
    const filteredData = keys.map(key => data[key]);
    return filteredData;
  }
}

const Neighbors = ({ onClick, centerX, centerY, top, right, bottom, left }) => {
  const getNeighborData = getNeighborDataForCenter(centerX, centerY);
  return (
  <div>
    {top &&
      <Neighbor
        onClick={onClick}
        top="0"
        left={left ? "20px" : "0"}
        width="300"
        height="20"
        data={getNeighborData("top", top.data)}
      />}
    {right &&
      <Neighbor
        onClick={onClick}
        top={top ? "20px" : "0"}
        right="0"
        width="20"
        height="300"
        data={getNeighborData("right", right.data)}
      />}
    {bottom &&
      <Neighbor
        onClick={onClick}
        bottom="0"
        left={left ? "20px" : "0"}
        width="300"
        height="20"
        data={getNeighborData("bottom", bottom.data)}
      />}
    {left &&
      <Neighbor
        onClick={onClick}
        top={top ? "20px" : "0"}
        left="0"
        width="20"
        height="300"
        data={getNeighborData("left", left.data)}
      />}
  </div>
) 
};

export default Neighbors;
