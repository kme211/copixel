import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Auth from "@services/Auth";
import history from "@services/history";
import io from "socket.io-client";
import { setAuthorizationToken, getUser } from "@api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      needsRegistration: false
    };

    this.auth = new Auth();
    this.socket = io();
    this.auth.once("logged_in", this.getUser);
    this.auth.once("logged_out", this.logout);
  }

  logout = () => {
    setAuthorizationToken(null);
    history.push("/");
  };

  setUser = user => {
    this.setState({ user, needsRegistration: false });
  };

  getUser = async () => {
    setAuthorizationToken(this.auth.getAccessToken());
    const response = await getUser();
    if (response.data.error && response.data.error === "no user found") {
      this.setState({ needsRegistration: true });
    } else {
      this.setUser(response.data);
    }
  };

  render() {
    return (
      <BrowserRouter history={history}>
        <Layout
          auth={this.auth}
          user={this.state.user}
          socket={this.socket}
          needsRegistration={this.state.needsRegistration}
          setUser={this.setUser}
        />
      </BrowserRouter>
    );
  }
}

export default App;
