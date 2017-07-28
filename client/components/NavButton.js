import styled, { css } from "styled-components";

const NavButton = styled.button`
  cursor: pointer;
  text-decoration: none;
  color: #FC8A15;
  display: block;
  margin: 2px;
  padding: 0;
  transition: all 0.4s;
  border: 1px solid transparent;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
      border: 1px solid #FC8A15;
  }
  ${props => props.active && css`
    border: 1px solid #FC8A15;
    background: #FC8A15;
    color: white;
  `}
  @media (min-width: 800px) {
    padding: 6px;
    margin: 12px;
  }
`;

export default NavButton;