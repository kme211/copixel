import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { NavLink, Link } from "react-router-dom";
import ReduxToastr from "react-redux-toastr";
import * as routes from "../routes";
import styled from "styled-components";
import Inner from "./Inner";
import NavLinkIcon from "./NavLinkIcon";
import NavButton from "./NavButton";
import NavLinkText from "./NavLinkText";
import AccountDropdown from "./AccountDropdown";
import ActivityDropdown from "./ActivityDropdown";
import Register from "@components/Register";
const Callback = routes.Callback;
const UserPaintings = routes.UserPaintings;

const Wrapper = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  *,
  & {
    box-sizing: border-box;
  }
  canvas {
    display: block;
  }
`;

const Header = styled.div`
  background: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.25);
`;

const InnerWrapper = styled(Inner)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #fc8a15;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #FC8A15;
    display: block;
    margin: 2px;
    padding: 0;
    transition: all 0.4s;
    border: 1px solid transparent;
    &:hover {
        border: 1px solid #FC8A15;
    }
    @media (min-width: 800px) {
      padding: 6px;
      margin: 12px;
    }
`;

const HomeLink = styled(Link)`
    text-decoration: none;
`;

const activeStyle = {
  border: "1px solid #FC8A15",
  background: "#FC8A15",
  color: "white"
};

class Layout extends Component {
  state = {
    activityListOpen: false
  };

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  toggleActivitiesList = () => {
    this.setState(prevState => ({
      activityListOpen: !prevState.activityListOpen
    }));
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Wrapper>
        <Header>
          <InnerWrapper>
            <HomeLink exact to="/">
              <Title>copixel</Title>
            </HomeLink>
            <Nav>
              <StyledLink exact to="/" activeStyle={activeStyle}>
                <NavLinkText>Paintings</NavLinkText>
                <NavLinkIcon icon="picture" />
              </StyledLink>
              <StyledLink to="/create" activeStyle={activeStyle}>
                <NavLinkText>Create</NavLinkText>
                <NavLinkIcon icon="plus" />
              </StyledLink>
              {!isAuthenticated() &&
                <NavButton onClick={this.login}>Log In</NavButton>}
              {isAuthenticated() &&
                this.props.user &&
                <ActivityDropdown
                  open={this.state.activityListOpen}
                  toggle={this.toggleActivitiesList}
                  socket={this.props.socket}
                  user={this.props.user}
                />}
              {isAuthenticated() &&
                this.props.user &&
                <AccountDropdown logout={this.logout} user={this.props.user} />}
            </Nav>
          </InnerWrapper>
        </Header>

        <Switch>
          <Route exact path="/" component={routes.Home} />
          <Route exact path="/create" component={routes.Create} />
          <Route exact path="/painting/:id" component={routes.Painting} />
          <Route exact path="/section/:token" component={routes.Editor} />
          <Route
            exact
            path="/account/paintings"
            render={props => {
              return <UserPaintings user={this.props.user} {...props} />;
            }}
          />
          <Route
            exact
            path="/callback"
            render={props => {
              if (/access_token|id_token|error/.test(props.location.hash)) {
                this.props.auth.handleAuthentication();
              }
              return <Callback {...props} />;
            }}
          />
        </Switch>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />
        {this.props.needsRegistration &&
          <Register setUser={this.props.setUser} auth={this.props.auth} />}
      </Wrapper>
    );
  }
}

export default Layout;
