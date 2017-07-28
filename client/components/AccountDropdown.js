import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import UserImage from "./UserImage";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const listStyles = ({ isOpen }) => css`
  display: ${isOpen ? "block" : "none"};
  z-index: 1000;
  min-width: 100%;
  top: 43px;
  right: 0;
  position: absolute;
  list-style: none;
  background: white;
  color: inherit;
  padding: 0;
  margin: 0;
`;

const List = styled.ul`${listStyles};`;

const ListItem = styled.li`
  padding: 15px 20px;
  transition: all 0.25s linear;
  & > a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    color: white;
    background: #fc8a15;
  }
`;

const NameWrapper = styled.div`
  &:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin: 11px 0 0 10px;
    vertical-align: top;
    border-top: 4px solid #adb0b5;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    content: "";
  }
`;

const UserName = styled.span`
  display: none;
  @media (min-width: 800px) {
    display: inline-block;
  }
`;

class Dropdown extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const { picture, name } = this.props.user;
    return (
      <Wrapper>
        <NameWrapper onClick={this.toggle}>
          <UserImage
            picture={picture || "/img/default-avatar.jpg"}
          />
          <UserName>
            {name || ""}
          </UserName>
        </NameWrapper>
        <List isOpen={isOpen} onClick={this.toggle}>
          <ListItem>
            <Link to="/account/paintings">My paintings</Link>
          </ListItem>
          <ListItem onClick={this.props.logout}>Logout</ListItem>
        </List>
      </Wrapper>
    );
  }
}

export default Dropdown;
