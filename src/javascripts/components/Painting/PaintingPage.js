import React, { Component } from "react";
import Inner from '../common/Inner';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import Canvas from './Canvas';
import { BLOCK_SIZE } from './constants';

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
      .get(`/painting/${this.props.match.params.id}`)
      .then((res) => {
        const pixels = res.data.sections.reduce((a, b) => Object.assign({}, a, b), {});
        const { width, height } = res.data;
        
        this.setState({ pixels });
      })
      .catch((err) => {
        const message = err.response && error.response.data ? 
          err.response.data.message : 
          'Something went wrong trying to get that painting.';
        toastr.error('Yikes!', message);
      });
  }

  render() {
    return (
      <Inner>
        <h2>Completed Painting</h2>

      </Inner>
    );
  }
}

export default PaintingPage;