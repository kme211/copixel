import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

const supportsHistory = "pushState" in window.history;

const App = () => (
  <BrowserRouter forceRefresh={!supportsHistory}>
    <Layout />
  </BrowserRouter>
);

export default App;
