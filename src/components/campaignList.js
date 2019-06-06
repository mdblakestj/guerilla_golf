import React from "react";
import { connect } from "react-redux";
import CampaignDetails from "./CampaignListItem";
import getVisibleExpenses from "../selectors/expenses";
import { Container, Row, Col, Card, CardDeck } from "react-bootstrap";
export const CampaignList = props => (
  <div className="campaign-list">
    <Container>
      <Row>
        <h4>Featured Engines </h4>
      </Row>
      {props.campaigns.map(campaign => {
        return (
          <Row key={campaign.id}>
            <CampaignDetails key={campaign.id} {...campaign} />
          </Row>
        );
      })}
      <br />
      <hr />
      <h3>All Engines</h3>
      <CardDeck>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      ;
    </Container>
  </div>
);

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

const ConnectedCampaignList = connect(mapStateToProps)(CampaignList);

export default ConnectedCampaignList;
