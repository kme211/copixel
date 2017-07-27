import React from "react";
import styled from "styled-components";
import ActivityListItem from "./ActivityListItem";
import * as activityTypes from "@server/config/activityTypes";

const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
`;

const getActivityInfo = (type, data) => {
  switch (type) {
    case activityTypes["PAINTING_COMPLETED"]:
      return {
        message: "A painting that you contributed to has been completed.",
        link: `/painting/${data.paintingId}`,
        icon: "check-mark"
      };
    default:
      return {
        message: "Something went wrong with the activity...",
        link: "#",
        icon: "check-mark" // TODO: change to warning symbol
      };
  }
};

const ActivityList = props =>
  <Wrapper>
    {props.activities.map(({ _id, type, data, ...rest }) =>
      <ActivityListItem
        markAsViewed={props.markActivitiesAsViewed}
        toggle={props.toggle}
        key={_id}
        id={_id}
        {...getActivityInfo(type, data)}
        {...rest}
      />
    )}
  </Wrapper>;

export default ActivityList;
