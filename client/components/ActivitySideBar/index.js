import React, { Component } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as activityActions from "../../services/activities/actions";
import ActivityList from "./ActivityList";

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  padding: 3em 0;
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
  margin: 0;
  padding: 0 25px;
`;

class ActivitySideBar extends Component {
  componentDidMount() {
    this.props.actions.loadActivities();
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.show && this.props.show) {
      const newActivities = this.props.activities.filter(activity => !activity.viewed);
      if(newActivities.length) {
        const ids = newActivities.map(activity => activity._id);
        this.props.actions.markActivitiesAsViewed(ids);
      }
    }

    if(!prevProps.user.sub && (prevProps.user.sub !== this.props.user.sub)) {
      const [connection, id] = this.props.user.sub.split('|');
      this.props.socket.on(`activity:${id}`, this.props.actions.activityRecievedOverSocket);
    }
  }

  componentWillUnmount() {
    const [connection, id] = this.props.user.sub.split('|');
    this.props.socket.off(`activity:${id}`, this.props.actions.activityRecievedOverSocket);
  }

  render() {
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
