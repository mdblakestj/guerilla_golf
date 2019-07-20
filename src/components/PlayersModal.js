import { connect } from "react-redux";
import React, { Component } from "react";
import { Button, Modal, Container, Form } from "react-bootstrap";
import CampaignDetails from "./CampaignListItem";
import { firebase } from "../firebase/firebase";
import { withRouter } from "react-router-dom";

class PlayersModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onPlayersChange = this.onPlayersChange.bind(this);
    this.onsubmit = this.onSubmit.bind(this);

    this.state = {
      show: false,
      players: "",
      error: ""
    };
  }

  handleClose(props) {
    this.setState({ show: false });
    this.props.history.push("/MyCampaigns");
  }
  onPlayersChange = e => {
    const players = e.target.value;
    this.setState(() => ({ players }));
  };

  handleShow() {
    this.setState({ show: true });
  }
  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onSubmit = e => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    if (this.state.players === "") {
      this.setState(() => ({
        error: "Please enter number of players"
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        players: this.state.players,
        createdBy: user.uid
      });
    }
  };
  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Play Course
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            How many Players?
            <Form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Players"
                autoFocus
                value={this.state.players}
                onChange={this.onPlayersChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Play
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(PlayersModal);
