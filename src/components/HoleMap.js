import { connect } from "react-redux";
import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Row, Col, Card, CardDeck } from "react-bootstrap";
import CampaignDetails from "./CampaignListItem";

// type State = {
//   lat: number,
//   lng: number,
//   zoom: number
// };
//
// export default class SimpleExample extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: props.user ? props.user.email : "",
//       password: props.user ? props.user.password : "",
//       error: "",
//       lat: 42.3876,
//       lng: -71.0995,
//       zoom: 14
//     };
//   }

export const CampaignList = props => (
  // {props.campaigns.map(campaign => {
  //   return (
  //     <Row key={campaign.id}>
  //       <CampaignDetails key={campaign.id} {...campaign} />
  //     </Row>
  //   );
  // })}
  <div>
    {props.campaigns.map(campaign => {
      return <h1>{campaign.lat}</h1>;
    })}

    <Map center={[45, -71]} zoom="7">
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.campaigns.map(campaign => {
        return (
          <Marker position={[campaign.lat, campaign.lng]}>
            {" "}
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

//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return (
//       <div>
//         {props.campaigns.map(campaign => {
//           return (
//             <Row key={campaign.id}>
//               <CampaignDetails key={campaign.id} {...campaign} />
//             </Row>
//           );
//         })}
//         <h1>Here</h1>
