import React from "react";
import UserForm from "./UserForm";
import { startAddUser } from "../actions/users";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardDeck } from "react-bootstrap";

const NewUser = props => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      backgroundColor: "#F0F0F0"
    }}
  >
    <br />
    <Card className="text-center" style={{ width: "25rem" }}>
      <Card.Header>Have an account? Login</Card.Header>
      <Card.Body>
        <UserForm
          onSubmit={user => {
            props.dispatch(startAddUser(user));
            props.history.push("/");
          }}
        />
        <Card.Text />
      </Card.Body>
    </Card>
  </div>
);

export default connect()(NewUser);
