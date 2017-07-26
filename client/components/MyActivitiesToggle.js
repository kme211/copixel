import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NavButton from "./NavButton";

const Badge = styled.span`
  background-color: #1EE494;
  border-radius: 4px;
  padding: 2px 4px;
  color: white;
`;

class MyActivitiesToggle extends Component {
  render() {
    const newActivities = this.props.activities.filter(
      activity => !activity.viewed
    );
    return (
      <NavButton active={this.props.active} onClick={this.props.onClick}>
        Activity{" "}
        {newActivities.length > 0 && <Badge>{newActivities.length}</Badge>}
      </NavButton>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities
  };
}

export default connect(mapStateToProps)(MyActivitiesToggle);
