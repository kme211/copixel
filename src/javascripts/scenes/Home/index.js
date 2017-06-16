import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Inner from "../../components/Inner";
import Canvas from "../../components/Canvas";
import moment from "moment";
import { SECTION_SIZE_PX } from "../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const PaintingLink = styled.a`
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
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.25);
  }

  canvas {
    transform-origin: -50% -50%;
    transition: all 0.4s;
  }

  &:hover canvas {
    transform: scale(.95);
  }
`;

const Meta = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #ccc;
  color: #3E3E3E;
  padding: 12px;
  
  & .creator {
    font-weight: 600;
  }
`;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paintings: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/v1/paintings/complete")
      .then(res => {
        const paintings = res.data;
        this.setState({
          paintings: paintings.map(painting => {
            return Object.assign(
              {},
              painting,
              {
                pixels: painting.sections
                  .map(section => section.data)
                  .reduce((a, b) => Object.assign(a, b), {})
              },
              { sections: null }
            );
          })
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <Inner>
        <h2>Home</h2>

        <Wrapper>
          {this.state.paintings.map(painting => (
            <PaintingLink href={`/painting/${painting._id}`} key={painting._id}>
              <Canvas
                embed
                embedWidth={300}
                width={painting.width * SECTION_SIZE_PX}
                height={painting.height * SECTION_SIZE_PX}
                pixels={painting.pixels}
              />
              <Meta>
                <div className="creator">User name</div>
                <div className="created">
                  {moment(painting.created).fromNow()}
                </div>
              </Meta>
            </PaintingLink>
          ))}
        </Wrapper>
      </Inner>
    );
  }
}

export default HomePage;
