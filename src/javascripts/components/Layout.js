import React from "react";
import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import ReduxToastr from "react-redux-toastr";
import * as routes from "../routes";
import styled from "styled-components";
import Inner from "./common/Inner";

const Wrapper = styled.div`
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    *, & {
      box-sizing: border-box;
    }
    canvas {
      display: block;
    }
`;

const Header = styled.div`
  background: white;
  
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
  color: #FC8A15;
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
    margin: 12px;
    padding: 6px;
    transition: all 0.4s;
    border: 1px solid transparent;
    &:hover {
        border: 1px solid #FC8A15;
    }
`;

const activeStyle = {
  border: "1px solid #FC8A15",
  background: "#FC8A15",
  color: "white"
};

const Layout = () => {
  return (
    <Wrapper>
      <Header>
        <InnerWrapper>
          <Title>copixel</Title>
          <Nav>
            <StyledLink exact to="/" activeStyle={activeStyle}>
              Home
            </StyledLink>
            <StyledLink to="/create" activeStyle={activeStyle}>
              Create
            </StyledLink>
          </Nav>
        </InnerWrapper>
      </Header>
      <Switch>
        <Route exact path="/" component={routes.HomePage} />
        <Route exact path="/create" component={routes.CreatePaintingPage} />
        <Route exact path="/painting/:id" component={routes.PaintingPage} />
        <Route
          exact
          path="/section/:token"
          component={routes.PaintingEditorPage}
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
    </Wrapper>
  );
};

export default Layout;
