import React, { Component } from "react";
import Inner from "../../components/Inner";
import PaintingList from "../../components/PaintingList";
import reducePaintingSections from "@utils/reducePaintingSections";
import { getCompletePaintings } from "@api";

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
      <Inner sceneBody>
        <PaintingList paintings={this.state.paintings} />
      </Inner>
    );
  }
}

export default HomePage;
