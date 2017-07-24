import React, { Component } from "react";
import styled from "styled-components";
import Inner from "../../components/Inner";
import PaintingLink from "./components/PaintingLink";
import { getCompletePaintings } from "@api";

const Paintings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paintings: []
    };
  }

  componentDidMount() {
    getCompletePaintings()
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
        <Paintings>
          {this.state.paintings.map(painting =>
            <PaintingLink painting={painting} key={painting._id} />
          )}
        </Paintings>
      </Inner>
    );
  }
}

export default HomePage;
