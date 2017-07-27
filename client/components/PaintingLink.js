import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import Canvas from "./Canvas";
import Icon from "./Icon";
import { Link } from "react-router-dom";
import { SECTION_SIZE_PX } from "@constants";

const StyledLink = styled(Link)`
  border: 1px solid #ccc;
  width: 30%;
  height: 200px;
  display: block;
  overflow: hidden;
  background: #ccc;
  margin: 10px 0;
  position: relative;
  text-decoration: none;
  transition: all 0.4s;
  canvas {
    transform-origin: -50% -50%;
    transition: all 0.4s;
  }

  &:hover canvas {
    transform: scale(0.95);
  }
`;

const Meta = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  background: #ccc;
  color: #3e3e3e;
  padding: 12px;
`;

const Likes = styled.div`
  display: block;
  margin-left: 0.5em;
  transition: color 0.25s linear;
  &:hover {
    color: tomato;
  }
  & > *:not(last-child) {
    margin-right: 4px;
  }

  & > :last-child {
    margin-right: 0;
  }
`;

class PaintingLink extends Component {
  state = {
    likes: this.props.painting.likes.length
  };

  likePainting = event => {
    console.log("likePainting");
    event.stopPropagation();
    // TODO: prompt user to log in if they are not already
    this.props.likePainting(this.props.painting._id);
    this.setState(prevState => ({ likes: prevState.likes + 1 }));
  };

  render() {
    const { painting } = this.props;
    return (
      <StyledLink to={`/painting/${painting._id}`}>
        <Canvas
          embed
          embedWidth={300}
          width={painting.width * SECTION_SIZE_PX}
          height={painting.height * SECTION_SIZE_PX}
          pixels={painting.pixels}
        />
        <Meta>
          <abbr title={moment(painting.created).format("LLLL")}>
            {moment(painting.created).fromNow()}
          </abbr>
          <Likes onClick={this.likePainting}>
            <Icon icon="like" />
            <span>
              {painting.likes.length}
            </span>
          </Likes>
        </Meta>
      </StyledLink>
    );
  }
}

export default PaintingLink;
