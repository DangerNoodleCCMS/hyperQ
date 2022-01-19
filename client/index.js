import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from "./App";
import "styles.css"
import store from "./store";


ReactDOM.render (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

