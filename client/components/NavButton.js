import styled, { css } from "styled-components";

const NavButton = styled.button`
  cursor: pointer;
  text-decoration: none;
  color: #FC8A15;
  display: block;
  margin: 12px;
  padding: 6px;
  transition: all 0.4s;
  border: 1px solid transparent;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  &:hover {
      border: 1px solid #FC8A15;
  }
  ${props => props.active && css`
    border: 1px solid #FC8A15;
    background: #FC8A15;
    color: white
  `}
`;

export default NavButton;