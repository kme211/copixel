import React, { Component } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as activityActions from "../../services/activities/actions";
import Button from "@components/Button";
import ActivityList from "./ActivityList";

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  padding: 0;
  background-color: white;
  font-size: 0.8em;
  display: none;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .25);
  width: 400px;
  margin: 0.75em;
  &:before {
    content: '';
    position: absolute;
    top: -1.5em;
    right: 2em;
    height: 0;
    width: 0;
    border: .75em solid transparent;
    border-bottom: .75em solid white;
  }
  ${props =>
    props.show &&
    css`
    display: block;
  `};
`;

const Header = styled.h3`
  border-bottom: 4px solid #fc8a15;
  margin: 0;
  font-size: 1em;
  font-weight: 600;
  padding: 0.5em 2em;
`;

class ActivitySideBar extends Component {
  componentDidMount() {
    this.props.actions.loadActivities();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.sub && prevProps.user.sub !== this.props.user.sub) {
      const id = this.props.user.sub.split("|")[1];
      this.props.socket.on(
        `activity:${id}`,
        this.props.actions.activityRecievedOverSocket
      );
    }
  }

  componentWillUnmount() {
    const id = this.props.user.sub.split("|")[1];
    this.props.socket.off(
      `activity:${id}`,
      this.props.actions.activityRecievedOverSocket
    );
  }

  markAllAsViewed = () => {
    const newActivities = this.props.activities.filter(
      activity => !activity.viewed
    );
    if (newActivities.length) {
      const ids = newActivities.map(activity => activity._id);
      this.props.actions.markActivitiesAsViewed(ids);
    }
    this.props.toggle();
  };

  render() {
    return (
      <Wrapper show={this.props.show}>
        <Header>Activity</Header>
        <ActivityList
          markActivitiesAsViewed={this.props.actions.markActivitiesAsViewed}
          toggle={this.props.toggle}
          activities={this.props.activities}
        />
        <Button onClick={this.markAllAsViewed}>Mark all as viewed</Button>
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
