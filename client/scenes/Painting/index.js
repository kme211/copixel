import React, { Component } from "react";
import { toastr } from "react-redux-toastr";
import Inner from "../../components/Inner";
import Canvas from "../../components/Canvas";
import { getPainting } from "@api";
import { SECTION_SIZE_PX } from "@constants";

class PaintingPage extends Component {
  state = {
    height: null,
    width: null,
    pixels: {},
    embedWidth: null
  };

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) this.getData(this.props.match.params.id);
  }

  getData = (paintingId) => {
    getPainting(paintingId)
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
        const message = err.response && err.response.data
          ? err.response.data.message
          : "Something went wrong trying to get that painting.";
        toastr.error("Yikes!", message);
      });
  }

  render() {
    const { width, height, pixels, embedWidth } = this.state;
    if (!width) return <Inner><h2>Loading...</h2></Inner>;
    return (
      <Inner
        innerRef={div => {
          if (!div || this.state.embedWidth) return;
          const { offsetWidth: embedWidth } = div;
          this.setState({ embedWidth });
        }}
      >
        <h2>Completed painting</h2>
        {embedWidth &&
          <Canvas
            embed
            embedWidth={embedWidth}
            width={width}
            height={height}
            pixels={pixels}
          />}

      </Inner>
    );
  }
}

export default PaintingPage;
