import React, { Component } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import Icon from "@components/Icon";

const StyledLink = styled(Link)`
  padding: 0.5em 25px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s linear;
  display: block;
  &:hover {
    background-color: #e5e5e5;
  }
  ${props =>
    !props.viewed &&
    css`
    background-color: #e8f7f1;
  `}
`;

const Wrapper = styled.li`
  padding: 0;
  margin: 0;
  line-height: 1.35;
  border-bottom: 1px solid #ccc;
`;

const Timestamp = styled.abbr`
  display: block;
  color: #303030;
  margin-top: .25em;
`;

class ActivityListItem extends Component {
  onClick = () => {
    if (!this.props.viewed) this.props.markAsViewed([this.props.id]);
    this.props.toggle();
  };
  render() {
    const { message, icon, viewed, date, link } = this.props;
    console.log("viewed", viewed);
    return (
      <Wrapper onClick={this.onClick}>
        <StyledLink viewed={viewed} to={link}>
          {message}
          <Icon icon={icon} />
          <Timestamp title={moment(date).format("LLLL")}>
            {moment(date).fromNow()}
          </Timestamp>
        </StyledLink>
      </Wrapper>
    );
  }
}

export default ActivityListItem;
