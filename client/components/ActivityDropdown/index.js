import React from "react";
import styled from "styled-components";
import ActivityToggleButton from "./ActivityToggleButton";
import ActivityListContainer from "./ActivityListContainer";

const Wrapper = styled.div`position: relative;`;

const ActivityDropdown = props =>
  <Wrapper>
    <ActivityToggleButton active={props.open} onClick={props.toggle} />
    <ActivityListContainer
      toggle={props.toggle}
      show={props.open}
      socket={props.socket}
      user={props.user}
    />
  </Wrapper>;

export default ActivityDropdown;
