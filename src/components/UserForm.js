import React from "react";
import moment from "moment";
// import Foundation from "react-foundation";
import { firebase } from "../firebase/firebase";
import { Container, Row, Col, Card, CardDeck, Button } from "react-bootstrap";

const now = moment();

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user ? props.user.firstName : "",
      lastName: props.user ? props.user.lastName : "",
      email: props.user ? props.user.email : "",
      password: props.user ? props.user.password : "",
      password2: props.user ? props.user.password2 : "",
      authToken: props.user ? props.user.authToken : "",
      createdAt: props.user ? moment(props.user.createdAt) : moment(),
      error: ""
    };
  }

  onlastNameChange = e => {
    const lastName = e.target.value;
    this.setState(() => ({ lastName }));
  };
  onfirstNameChange = e => {
    const firstName = e.target.value;
    this.setState(() => ({ firstName }));
  };
  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };
  onPassword2Change = e => {
    const password2 = e.target.value;
    this.setState(() => ({ password2 }));
  };
  onDateChange = createdAt => {
    this.setState(() => ({ createdAt }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      !this.state.lastName ||
      !this.state.firstName ||
      !this.state.email ||
      !this.state.password ||
      !this.state.password2
    ) {
      this.setState(() => ({
        error: "Please provide First Name, LastName, Email, and Password "
      }));
      console.log(this.state.error);
    } else if (this.state.password !== this.state.password2) {
      this.setState(() => ({ error: "Please provide matching passwords" }));
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="first name"
            autoFocus
            value={this.state.firstName}
            onChange={this.onfirstNameChange}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="last name"
            autoFocus
            value={this.state.lastName}
            onChange={this.onlastNameChange}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="email"
            autoFocus
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="password"
            autoFocus
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            autoFocus
            value={this.state.password2}
            onChange={this.onPassword2Change}
          />
          <button className="btn btn-outline-info" type="submit">
            Create Account
          </button>
          {this.state.error && <p>{this.state.error}</p>}
        </form>
      </div>
    );
  }
}
