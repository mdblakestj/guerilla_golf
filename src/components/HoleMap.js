import { connect } from "react-redux";
import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Row, Col, Card, CardDeck } from "react-bootstrap";
import CampaignDetails from "./CampaignListItem";

export const CampaignList = props => (
  <div>
    <h1>Holes</h1>

    <Map center={[45, -71]} zoom="7">
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.campaigns.map(campaign => {
        return (
          <Marker position={[campaign.lat, campaign.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        );
      })}
    </Map>
  </div>
);

const mapStateToProps = state => {
  return {
    campaigns: state.campaigns
  };
};

const ConnectedCampaignList = connect(mapStateToProps)(CampaignList);

export default ConnectedCampaignList;
