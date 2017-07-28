import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Wrapper = styled.span`
  & > span {
    margin: 0;
  }
`;

const NavLinkIcon = (props) => (
  <Wrapper><Icon icon={props.icon} size={30}/></Wrapper>
);

export default NavLinkIcon;