import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  padding: 10px 0;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  &:not([type="color"]) {
    padding: 6px;
  }
`;

const TextInput = ({ type, label, id, name, ...props }) => (
  <Wrapper>
    {label && <Label for={id}>{label.toUpperCase()}</Label>}
    <Input type={type} id={id} name={name} {...props}/>
  </Wrapper>
);

export default TextInput;