import React from 'react';
import styled, { css } from "styled-components";
import Input from '../common/Input';
import { BRUSH, ERASER } from './constants';

const Wrapper = styled.div`
  background: #D8DFE2;
  padding: 10px;
`;

const styles = ({ active }) => css`
  margin-bottom: 10px;
  cursor: pointer;
  padding: 6px;
  background: ${active ? 'tomato' : 'transparent'};
`;

const Tool = styled.div`${styles}`;

const ToolBar = ({ currentTool, currentColor, updateTool, updateColor }) => (
  <Wrapper>
    <Tool>
      <Input type="color" name="Color" value={currentColor} onChange={(e) => { updateColor(e.target.value); }}/>
    </Tool>
    <Tool active={currentTool===BRUSH} onClick={(e) => { updateTool(BRUSH); }}>Brush</Tool>
    <Tool active={currentTool===ERASER} onClick={(e) => { updateTool(ERASER); }}>Eraser</Tool>
  </Wrapper>
);

export default ToolBar;