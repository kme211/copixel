import React, { Component } from "react";
import Inner from "../common/Inner";
import axios from "axios";

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
        this.setState({ paintings });
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <Inner>
        <h2>Home</h2>

        <ul>
          {this.state.paintings.map(painting => (
            <li><a href={`/painting/${painting._id}`}>{painting._id}</a></li>
          ))}
        </ul>
      </Inner>
    );
  }
}

export default HomePage;
