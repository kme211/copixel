import React from "react";
import styled from "styled-components";
import moment from "moment";
import Canvas from "../../../components/Canvas";
import { SECTION_SIZE_PX } from "../../../constants";

const Wrapper = styled.a`
  border: 1px solid #ccc;
  width: 30%;
  height: 200px;
  display: block;
  overflow: hidden;
  background: #ccc;
  margin: 10px 0;
  position: relative;
  text-decoration: none;
  transition: all 0.4s;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.25);
  }

  canvas {
    transform-origin: -50% -50%;
    transition: all 0.4s;
  }

  &:hover canvas {
    transform: scale(.95);
  }
`;

const Meta = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #ccc;
  color: #3E3E3E;
  padding: 12px;
  
  & .size {
    font-weight: 600;
  }
`;

const PaintingLink = ({ painting }) =>
  <Wrapper href={`/painting/${painting._id}`}>
    <Canvas
      embed
      embedWidth={300}
      width={painting.width * SECTION_SIZE_PX}
      height={painting.height * SECTION_SIZE_PX}
      pixels={painting.pixels}
    />
    <Meta>
      <div className="size">{painting.width} x {painting.height}</div>
      <div className="created">
        {moment(painting.created).fromNow()}
      </div>
    </Meta>
  </Wrapper>;

export default PaintingLink;
