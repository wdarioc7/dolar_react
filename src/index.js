import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./store/reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter basename={process.env.REACT_APP_BASEPATH}>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
