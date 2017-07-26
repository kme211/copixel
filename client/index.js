import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import App from "./components/App";

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <Component />
      </Provider>
    </div>,
    document.getElementById("root")
  );
};

render(App);