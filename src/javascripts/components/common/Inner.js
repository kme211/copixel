import React from 'react';
import styled from 'styled-components';

const Inner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  @media all and (max-width: 900px) {
    padding: 2rem;
  }
`;

export default Inner;