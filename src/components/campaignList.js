import React from "react";
import { connect } from "react-redux";
import CampaignDetails from "./CampaignListItem";
import getVisibleExpenses from "../selectors/expenses";
import { Container, Row, Col, Card, CardDeck } from "react-bootstrap";
export const CampaignList = props => (
  <div className="campaign-list">
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
  </div>
);

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

const ConnectedCampaignList = connect(mapStateToProps)(CampaignList);

export default ConnectedCampaignList;
