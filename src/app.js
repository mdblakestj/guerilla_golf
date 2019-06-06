import React from "react";
import ReactDOM from "react-dom";
//import 'normalize.css/normalize.css';
import "./styles/styles.scss";
import AppRouter, { history } from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { startSetCampaigns } from "./actions/campaigns";
// import {setTextFilter} from './actions/filters';
// import getVisibleExpenses from './selectors/expenses'
import { firebase } from "./firebase/firebase";
import { login, logout } from "./actions/auth";
import "./../node_modules/bootstrap/scss/bootstrap.scss";
import LoadingPage from "./components/LoadingPage";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};
store.dispatch(startSetCampaigns());
ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetCampaigns()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/home");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
