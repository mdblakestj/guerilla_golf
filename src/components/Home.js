import React from "react";
import CampaignList from "./campaignList";
import { Container, Button, Alert } from "react-bootstrap";
import HoleMap from "./HoleMap";
import PlayersModal from "./PlayersModal";

const Home = () => (
  <div>
    <Container>
      <HoleMap />
      <br />
      <PlayersModal />
    </Container>
  </div>
);

export default Home;
