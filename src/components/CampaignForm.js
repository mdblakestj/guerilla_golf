import React from "react";
import moment from "moment";
import { firebase } from "../firebase/firebase";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";

const now = moment();

export default class CampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.campaign ? props.campaign.title : "",
      description: props.campaign ? props.campaign.description : "",
      triggerNumber: props.campaign ? props.campaign.triggerNumber : "",
      createdAt: props.campaign ? moment(props.campaign.createdAt) : moment(),
      createdBy: props.campaign ? props.campaign.createdBy : "",
      members: [],
      error: "",
      imageURL: "",
      image: null,
      url: "",
      emailList: "",
      uploadPercentage: 0
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onTriggerNumberChange = e => {
    const triggerNumber = e.target.value;
    this.setState(() => ({ triggerNumber }));
  };
  onDateChange = createdAt => {
    this.setState(() => ({ createdAt }));
  };

  onSubmit = e => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    if (
      !this.state.description ||
      !this.state.title ||
      !this.state.triggerNumber
    ) {
      this.setState(() => ({
        error: "Please provide title, description and trigger number"
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        title: this.state.title,
        description: this.state.description,
        createdAt: this.state.createdAt.valueOf(),
        triggerNumber: this.state.triggerNumber,
        createdBy: user.uid,
        members: [user.uid],
        imageURL: this.state.url,
        emailList: user.email
      });
    }
  };
  fileSelectedHandler = e => {
    const image = e.target.files[0];
    this.setState(() => ({ image }));
  };
  fileUploadHandler = () => {
    const { image } = this.state;
    const uploadTask = firebase
      .storage()
      .ref(`images/${image.name}`)
      .put(image);
    firebase
      .storage()
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        this.setState(() => ({ url }));
      });

    uploadTask.on(
      "state_changed",
      snapshot => {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ uploadPercentage: percentage });
      },
      function error(err) {
        console.log(err);
      },
      function complete() {}
    );
  };

  render() {
    return (
      <div className="form-div">
        {this.state.error && <p>{this.state.error}</p>}

        <div className="campaign-form">
          <h1 className="campaign-h1">Campaign Info</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group>
                <input
                  type="text"
                  placeholder="Title"
                  autoFocus
                  value={this.state.title}
                  onChange={this.onTitleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <input
                  type="number"
                  placeholder="Trigger Number"
                  autoFocus
                  value={this.state.triggerNumber}
                  onChange={this.onTriggerNumberChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <textarea
                  rows="4"
                  cols="50"
                  type="text"
                  placeholder="Description"
                  autoFocus
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
                />
              </Form.Group>
            </Form.Row>
            <button className="btn btn-outline-info" id="google-button">
              Form Submit
            </button>
          </Form>
          <input type="file" onChange={this.fileSelectedHandler} />
          <button
            className="btn btn-outline-info"
            id="google-button"
            onClick={this.fileUploadHandler}
          >
            Upload
          </button>
          <br />
          {this.state.uploadPercentage && this.state.uploadPercentage < 100 && (
            <ProgressBar
              style={{ width: "200px" }}
              now={this.state.uploadPercentage}
            />
          )}

          <img
            src={
              this.state.url ||
              "https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
            }
            alt="uploaded images"
            height="300"
            width="400"
          />
        </div>
      </div>
    );
  }
}
