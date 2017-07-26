import React, { Component } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as activityActions from "../../services/activities/actions";
import ActivityList from "./ActivityList";

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  padding: 3em 2em;
  background-color: white;
  font-size: 0.8em;
  display: none;
  box-shadow:  -2px 0px 5px 0px rgba(50, 50, 50, 0.25);
  max-width: 300px;
  height: 100%;
  margin: 0;
  ${props =>
    props.show &&
    css`
    display: block;
  `}
`;

const Header = styled.h2`
  border-bottom: 4px solid #FC8A15;
`;

class ActivitySideBar extends Component {
  componentDidMount() {
    console.log("ActivitySideBar mounted");
    this.props.actions.loadActivities();
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.show && this.props.show) {
      console.log('opened activity list');
      const newActivities = this.props.activities.filter(activity => !activity.viewed);
      if(newActivities.length) {
        console.log('mark activities as viewed');
        const ids = newActivities.map(activity => activity._id);
        this.props.actions.markActivitiesAsViewed(ids);
      }
    }
  }

  render() {
    console.log("render ActivitySideBar", this.props);
    return (
      <Wrapper show={this.props.show}>
        <Header>Activity</Header>
        <ActivityList
          markAsViewed={this.props.actions.markActivityAsViewed}
          activities={this.props.activities}
        />
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(activityActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySideBar);
