import React, { Component } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import Canvas from "./Canvas";
import Icon from "./Icon";
import { Link } from "react-router-dom";
import { SECTION_SIZE_PX } from "@constants";

const Wrapper = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 10px 0;
`;

const StyledLink = styled(Link)`
  display: block;
  background: #ccc;
  margin: 0;
  text-decoration: none;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #ccc;
  color: #3e3e3e;
  padding: 12px;
`;

const Likes = styled.div`
  display: block;
  cursor: pointer;
  margin-left: 0.5em;
  transition: color 0.25s linear;
  ${props =>
    props.liked &&
    css`
    color: #CF4647;
  `} &:hover {
    color: #cf4647;
  }
  & > * {
    margin-right: 4px;
  }

  & > :last-child {
    margin-right: 0;
  }
`;

class PaintingLink extends Component {
  state = {
    liked: this.props.painting.liked,
    likesCount: this.props.painting.likes.length
  };

  likePainting = async event => {
    // TODO: prompt user to log in if they are not already
    const { data } = await this.props.toggleLike(this.props.painting._id);
    this.setState(prevState => ({
      likesCount: prevState.likesCount + (data.liked ? 1 : -1),
      liked: data.liked
    }));
  };

  getEmbedWidth = () => {
    const width = window.innerWidth;
    return width > 800 ? 800 : width - 16;
  }

  render() {
    const { painting } = this.props;
    return (
      <Wrapper>
        <StyledLink to={`/painting/${painting._id}`}>
          <Canvas
            embed
            embedWidth={this.getEmbedWidth()}
            width={painting.width * SECTION_SIZE_PX}
            height={painting.height * SECTION_SIZE_PX}
            pixels={painting.pixels}
          />
        </StyledLink>
        <Meta>
          <abbr title={moment(painting.created).format("LLLL")}>
            {moment(painting.created).fromNow()}
          </abbr>
          <Likes onClick={this.likePainting} liked={this.state.liked}>
            <Icon icon="like" />
            <span>
              {this.state.likesCount}
            </span>
          </Likes>
        </Meta>
      </Wrapper>
    );
  }
}

export default PaintingLink;
