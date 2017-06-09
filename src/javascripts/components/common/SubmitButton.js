import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.input`
  display: block;
  width: 100%;
  padding: 6px;
`;

const Submit = ({ value, ...props }) => (
  <Wrapper type="submit" value={value} {...props} />
);

export default Submit;