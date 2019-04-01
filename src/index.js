import React from "react";
import ReactDOM from "react-dom";
import Page from "./components/Page";
import { Provider } from "react-redux";
import store from './redux'

const Root = () => (
  <Provider store={store}>
    <Page />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
