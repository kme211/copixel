import React, { Component } from "react";
import styled, { css } from "styled-components";
import UserImage from "./UserImage";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const listStyles = ({ isOpen }) => css`
  display: ${isOpen ? 'block' : 'none'};
  z-index: 1000;
  width: 100%;
  top: 43px;
  left: 0;
  position: absolute;
  list-style: none;
  background: #FC8A15;
  color: white;
  padding: 0;
  margin: 0;
`;

const List = styled.ul`${listStyles}`;

const ListItem = styled.li`
  padding: 15px 20px;
`;

const UserName = styled.span`
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

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { profile, isOpen } = this.state;
    return (
      <Wrapper>
        <div onClick={this.toggle}>
          <UserImage picture={profile.picture} margin="0 10px 0 0" />
          <UserName>{profile.name}</UserName>
        </div>
        <List isOpen={isOpen} onClick={this.toggle}>
          <ListItem onClick={this.props.auth.logout}>Logout</ListItem>
        </List>
      </Wrapper>
    );
  }
}

export default Dropdown;
