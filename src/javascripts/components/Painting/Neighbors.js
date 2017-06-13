import React from "react";
import Neighbor from "./Neighbor";
import { SECTION_SIZE_PX, BLOCK_SIZE_PX } from './constants';

function getNeighborData(side, centerX, centerY, data) {
  if(!data) return null;
  const y = side === 'top' ? centerY - 1 : centerY  + 1;
  const x = side === 'left' ? centerX - 1 : centerX + 1;
  const regex = {
    top: new RegExp(`\\d+,${(y * SECTION_SIZE_PX) + (SECTION_SIZE_PX -  BLOCK_SIZE_PX)}$`),
    right: new RegExp(`^${(x * SECTION_SIZE_PX)},\\d+`),
    bottom: new RegExp(`\\d+,${(y * SECTION_SIZE_PX)}$`),
    left: new RegExp(`^${(x * SECTION_SIZE_PX) + (SECTION_SIZE_PX -  BLOCK_SIZE_PX)},\\d+`)
  };
  console.log(`regex for ${side}: ${regex[side]}`)
  console.log(data)
  const keys = Object.keys(data).filter(key => regex[side].test(key));
  const filteredData = keys.map(key => data[key]);
  console.log(`neighbor data for: ${side}`, filteredData);
  return filteredData;
}

const Neighbors = ({ centerX, centerY, top, right, bottom, left }) => (
  <div>
    {top &&
      <Neighbor
        top="0"
        left={left ? "20px" : "0"}
        width="300"
        height="20"
        data={getNeighborData("top", centerX, centerY, top.data)}
      />}
    {right &&
      <Neighbor
        top={top ? "20px" : "0"}
        right="0"
        width="20"
        height="300"
        data={getNeighborData("right", centerX, centerY, right.data)}
      />}
    {bottom &&
      <Neighbor
        bottom="0"
        left={left ? "20px" : "0"}
        width="300"
        height="20"
        data={getNeighborData("bottom", centerX, centerY, bottom.data)}
      />}
    {left &&
      <Neighbor
        top={top ? "20px" : "0"}
        left="0"
        width="20"
        height="300"
        data={getNeighborData("left", centerX, centerY, left.data)}
      />}
  </div>
);

export default Neighbors;
