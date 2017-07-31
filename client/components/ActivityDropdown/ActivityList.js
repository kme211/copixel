import React from "react";
import styled from "styled-components";
import ActivityListItem from "./ActivityListItem";

const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
`;

const ActivityList = props =>
  <Wrapper>
    {props.activities.map(({ _id, ...rest }) =>
      <ActivityListItem
        markAsViewed={props.markActivitiesAsViewed}
        toggle={props.toggle}
        key={_id}
        id={_id}
        {...rest}
      />
    )}
  </Wrapper>;

export default ActivityList;
