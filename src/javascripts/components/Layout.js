import React from "react";
import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import ReduxToastr from 'react-redux-toastr'
import * as routes from "../routes";
import styled from "styled-components";

const Wrapper = styled.div`
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    *, & {
      box-sizing: border-box;
    }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: tomato;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: tomato;
    display: block;
    margin: 0.25em;
    padding: 0.5em;
    transition: all 0.4s;
    border: 1px solid transparent;
    &:hover {
        border: 1px solid tomato;
    }
`;

const activeStyle = {
  border: "1px solid tomato",
  background: "tomato",
  color: "white"
};

const Layout = () => {
  return (
    <Wrapper>
      <Title>copixel</Title>
      <Nav>
        <StyledLink exact to="/" activeStyle={activeStyle}>
          Home
        </StyledLink>
        <StyledLink to="/create" activeStyle={activeStyle}>Create</StyledLink>
      </Nav>
      <Switch>
        <Route exact path="/" component={routes.HomePage} />
        <Route exact path="/create" component={routes.CreatePaintingPage} />
        <Route exact path="/painting/:id" component={routes.PaintingPage} />
        <Route exact path="/section/:token" component={routes.PaintingEditorPage} />
      </Switch>
      <ReduxToastr
        timeOut={0}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar/>
    </Wrapper>
  );
};

export default Layout;