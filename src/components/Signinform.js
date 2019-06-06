import React from "react";
import uuid from "uuid";
import database from "../firebase/firebase";
import { firebase } from "../firebase/firebase";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user ? props.user.email : "",
      password: props.user ? props.user.password : "",
      error: ""
    };
  }

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = e => {
    e.preventDefault();
    var ref = database.ref("users");
    var password = [];
    var authToken = [];
    ref
      .orderByChild("email")
      .equalTo(this.state.email)
      .on("child_added", function(snapshot) {
        password.push(snapshot.val().password);
        authToken.push(snapshot.val().authToken);
      });

    if (!this.state.email || !this.state.password) {
      this.setState(() => ({ error: "Please provide Email, and Password " }));
      console.log(this.state.error);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error.message);
        });
    }
  };

  render() {
    return (
      <div className="box-layout">
        {this.state.error && <p>{this.state.error}</p>}

        <form onSubmit={this.onSubmit}>
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
          <button className="btn btn-outline-info" type="submit">
            Log me in!
          </button>
        </form>
      </div>
    );
  }
}
