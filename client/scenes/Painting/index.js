import React, { Component } from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import Inner from "../../components/Inner";
import Canvas from "../../components/Canvas";
import { BLOCK_SIZE_PX, SECTION_SIZE_PX } from "@constants";

class PaintingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null,
      width: null,
      pixels: {}
    };
  }

  componentDidMount() {
    axios
      .get(`/api/v1/painting/${this.props.match.params.id}`)
      .then(res => {
        const data = res.data.sections.map(section => section.data);
        const pixels = data.reduce((a, b) => Object.assign(a, b), {});
        const { width, height } = res.data;

        this.setState({
          width: width * SECTION_SIZE_PX,
          height: height * SECTION_SIZE_PX,
          pixels
        });
      })
      .catch(err => {
        console.error(err);
        const message = err.response && error.response.data
          ? err.response.data.message
          : "Something went wrong trying to get that painting.";
        toastr.error("Yikes!", message);
      });
  }

  render() {
    const { width, height, pixels } = this.state;
    if (!width) return <Inner><h2>Loading...</h2></Inner>;
    return (
      <Inner>
        <h2>Completed Painting</h2>
        <Canvas width={width} height={height} pixels={pixels} />
      </Inner>
    );
  }
}

export default PaintingPage;
