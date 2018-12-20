import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./reducers/Reducers";

const devToolsExtension =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, devToolsExtension)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
