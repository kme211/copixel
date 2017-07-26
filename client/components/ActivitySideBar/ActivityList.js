import React from "react";
import styled from "styled-components";
import ActivityListItem from "./ActivityListItem";

const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ActivityList = props =>
  <Wrapper>
    {props.activities.map(activity =>
      <ActivityListItem onClick={props.markAsViewed} key={activity._id} {...activity} />
    )}
  </Wrapper>;

export default ActivityList;
