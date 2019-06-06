import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import Header from "./../components/Header.js";
import NewCampaign from "../components/NewCampaign.js";
import NewUser from "../components/NewUser.js";
// import SignIn from './components/SignIn.js';
import Home from "../components/Home.js";
import Campaign from "../components/campaign";
import LogIn from "../components/Login";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import MyCampaigns from "../components/MyCampaigns";
import JoinEngine from "../components/JoinEngine";
import { Container, Row, Col } from "react-bootstrap";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LogIn} exact={true} />
        <Route path="/Home" component={Home} />
        <PrivateRoute path="/NewCampaign" component={NewCampaign} />
        <Route path="/MyCampaigns" component={MyCampaigns} />
        <Route path="/campaign/:id" component={Campaign} />
        <Route path="/NewUser" component={NewUser} />
        <Route path="/JoinEngine/:id" component={JoinEngine} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
