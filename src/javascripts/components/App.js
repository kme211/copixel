import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Auth from '../services/Auth';
import history from '../services/history';


const auth = new Auth();

const App = () => (
  <BrowserRouter history={history}>
    <Layout auth={auth}/>
  </BrowserRouter>
);

export default App;
