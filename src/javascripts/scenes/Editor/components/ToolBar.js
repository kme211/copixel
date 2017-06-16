import React from "react";
import styled, { css } from "styled-components";
import Input from "../../../components/Input";
import Icon from "../../../components/Icon";
import { BRUSH, ERASER, EYE_DROPPER, PAINT_BUCKET } from "../../../constants";

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

const ToolBar = ({
  isGridOn,
  currentTool,
  currentColor,
  toggleGrid,
  updateTool,
  updateColor
}) => (
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
      data-tool={BRUSH}
      onClick={e => {
        updateTool(BRUSH);
      }}
    >
      <Icon icon="pencil" />
    </Tool>
    <Tool
      active={currentTool === ERASER}
      data-tool={ERASER}
      onClick={e => {
        updateTool(ERASER);
      }}
    >
      <Icon icon="eraser" />
    </Tool>
    <Tool
      active={currentTool === EYE_DROPPER}
      data-tool={EYE_DROPPER}
      onClick={e => {
        updateTool(EYE_DROPPER);
      }}
    >
      <Icon icon="eyedropper" />
    </Tool>
    <Tool
      active={currentTool === PAINT_BUCKET}
      data-tool={PAINT_BUCKET}
      onClick={e => {
        updateTool(PAINT_BUCKET);
      }}
    >
      <Icon icon="droplet" />
    </Tool>
    <Tool onClick={toggleGrid}>
      <Icon icon={isGridOn ? "grid_off" : "grid_on"} />
    </Tool>
  </Wrapper>
);

export default ToolBar;
