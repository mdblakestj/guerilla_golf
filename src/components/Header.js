import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import { Container, Row, Col, Button } from "react-bootstrap";

const Header = props => (
  <header>
    <Container>
      <Row>
        <Col>
          <h1>Collective Engine</h1>
        </Col>
        <Col>
          <div className="logout-button">
            {props.auth && (
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={props.startLogout}
              >
                Log Out
              </button>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="header">
            <NavLink to="/home" activeClassName="is-active" exact={true}>
              Home{" "}
            </NavLink>
            <NavLink to="/NewCampaign" activeClassName="is-active">
              New Engine
            </NavLink>
            {props.auth && (
              <NavLink to="/MyCampaigns" activeClassName="is-active">
                My Engines
              </NavLink>
            )}
            {!props.auth && (
              <NavLink to="/" activeClassName="is-active">
                Sign In
              </NavLink>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  </header>
);
const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state, props, dispatch) => {
  return {
    auth: state.auth.uid,
    startLogin: () => dispatch(startLogout())
  };
};

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default ConnectedHeader;
