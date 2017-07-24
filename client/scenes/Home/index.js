import React, { Component } from "react";
import styled from "styled-components";
import Inner from "../../components/Inner";
import PaintingList from "../../components/PaintingList";
import reducePaintingSections from "../../services/reducePaintingSections";
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
          paintings: reducePaintingSections(paintings)
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
        <PaintingList paintings={this.state.paintings} />
      </Inner>
    );
  }
}

export default HomePage;
