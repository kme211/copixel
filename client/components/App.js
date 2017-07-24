import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Auth from "../services/Auth";
import history from "../services/history";
import { setAuthorizationToken } from "@api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.auth = new Auth();
    setAuthorizationToken(this.auth.getAccessToken());
    this.auth.on("profile_set", user => this.setState({ user }));
  }

  render() {
    return (
      <BrowserRouter history={history}>
        <Layout auth={this.auth} user={this.state.user} />
      </BrowserRouter>
    );
  }
}

export default App;
