import React from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import * as activityTypes from "../../../server/config/activityTypes";

const StyledLink = styled(Link)`
  background-color: #1EE494;
  padding: 2px 4px;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin: 0 4px;
  transition: all 1s linear;
  ${props => props.viewed && css`
    background-color: #e5e5e5;
  `}
`;

const Wrapper = styled.li`
  padding: 0.5em 25px;
  margin: 0;
  line-height: 1.35;
`;

const DateWrapper = styled.div`
  color: #303030;
  margin-top: .25em;
`;

function getMessage(activity) {
  switch (activity.type) {
    case activityTypes["PAINTING_COMPLETED"]:
      return (
        <Wrapper viwed={activity.viewed}>
          A painting that you contributed to has been completed.
          <StyledLink to={`/painting/${activity.data.paintingId}`}>
            Take a look!
          </StyledLink>
          <DateWrapper>
            {moment(activity.date).fromNow()}{" "}
          </DateWrapper>
        </Wrapper>
      );
    default:
      return <li>Uh oh</li>;
  }
}

const Activity = props => getMessage(props);

export default Activity;
