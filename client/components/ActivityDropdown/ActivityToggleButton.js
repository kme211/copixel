import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NavButton from "@components/NavButton";
import NavLinkText from "@components/NavLinkText";
import NavLinkIcon from "@components/NavLinkIcon";

const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Count = styled.span`
    position: absolute;
    left: 0;
    font-size: 12px;
    width: 100%;
    top: 7px;
    border-radius: 4px;
    text-align: center;
    color: inherit;
`;

class ActivityToggleButton extends Component {
  render() {
    const newActivities = this.props.activities.filter(
      activity => !activity.viewed
    );
    return (
      <NavButton active={this.props.active} onClick={this.props.onClick}>
        
        <NavLinkText>Activity</NavLinkText>
        <IconWrapper>
          <NavLinkIcon icon="message" />
          <Count>{newActivities.length}</Count>
        </IconWrapper>
      </NavButton>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities
  };
}

export default connect(mapStateToProps)(ActivityToggleButton);
