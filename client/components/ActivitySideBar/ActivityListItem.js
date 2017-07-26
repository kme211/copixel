import React from "react";
import styled from "styled-components";
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
`;

const Wrapper = styled.li`
  padding: 0;
  margin: 0.75em 0;
  line-height: 1.35;
`;

const DateWrapper = styled.div`
  color: #ccc;
  margin-top: .25em;
`;

const NewWrapper = styled.span`
  color: #FC8A15;
`;

function getMessage(activity) {
  switch (activity.type) {
    case activityTypes["PAINTING_COMPLETED"]:
      return (
        <Wrapper>
          A painting that you contributed to has been completed.
          <StyledLink to={`/painting/${activity.data.paintingId}`}>
            Take a look!
          </StyledLink>
          <DateWrapper>
            {moment(activity.date).fromNow()}{" "}
            {!activity.viewed && <NewWrapper>New!</NewWrapper>}
          </DateWrapper>
        </Wrapper>
      );
    default:
      return <li>Uh oh</li>;
  }
}

const Activity = props => getMessage(props);

export default Activity;
