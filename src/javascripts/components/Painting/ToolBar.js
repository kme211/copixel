import React from "react";
import styled, { css } from "styled-components";
import Input from "../common/Input";
import Icon from "../common/Icon";
import { BRUSH, ERASER, EYE_DROPPER, PAINT_BUCKET } from "./constants";

const Wrapper = styled.div`
  background: #D8DFE2;
  padding: 10px;
`;

const styles = ({ active }) => css`
  margin-bottom: 10px;
  cursor: pointer;
  padding: 6px;
  background: ${active ? "tomato" : "transparent"};
`;

const Tool = styled.div`${styles}`;

const ToolBar = ({ currentTool, currentColor, updateTool, updateColor }) => (
  <Wrapper>
    <Tool>
      <Input
        type="color"
        name="Color"
        value={currentColor}
        onChange={e => {
          updateColor(e.target.value);
        }}
      />
    </Tool>
    <Tool
      active={currentTool === BRUSH}
      onClick={e => {
        updateTool(BRUSH);
      }}
    >
      <Icon icon="pencil" />
    </Tool>
    <Tool
      active={currentTool === ERASER}
      onClick={e => {
        updateTool(ERASER);
      }}
    >
      <Icon icon="eraser" />
    </Tool>
    <Tool
      active={currentTool === EYE_DROPPER}
      onClick={e => {
        updateTool(EYE_DROPPER);
      }}
    >
      <Icon icon="eyedropper" />
    </Tool>
    <Tool
      active={currentTool === PAINT_BUCKET}
      onClick={e => {
        updateTool(PAINT_BUCKET);
      }}
    >
      <Icon icon="droplet" />
    </Tool>
  </Wrapper>
);

export default ToolBar;
