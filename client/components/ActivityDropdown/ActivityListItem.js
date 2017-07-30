import React, { Component } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import Icon from "@components/Icon";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const InnerLink = styled.div`
  padding: 0.5em 25px;
  background-color: inherit;
  transition: all 0.3s linear;
  &:hover {
    background-color: #e5e5e5;
  }
  ${props =>
    !props.viewed &&
    css`
    background-color: #e8f7f1;
  `};
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

    return (
      <Wrapper onClick={this.onClick}>
        <StyledLink to={link}>
          <InnerLink viewed={viewed}>
            {message}
            <Icon icon={icon} />
            <Timestamp title={moment(date).format("LLLL")}>
              {moment(date).fromNow()}
            </Timestamp>
          </InnerLink>
        </StyledLink>
      </Wrapper>
    );
  }
}

export default ActivityListItem;
