import React from 'react';
import styled from 'styled-components';
import Label from './Label';

const Wrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  &:focus {
    outline-color: #FC8A15;
  }
  &:not([type="color"]) {
    padding: 6px;
  }
  &[type="radio"] {
    display: inline-block;
  }
`;

const TextInput = ({ type, label, id, name, ...props }) => (
  <Wrapper>
    {label && <Label htmlFor={id}>{label}</Label>}
    <Input type={type} id={id} name={name} {...props}/>
  </Wrapper>
);

export default TextInput;