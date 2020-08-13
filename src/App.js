import React from "react";
import TripResults from "./components/TripResults";
import Form from "./components/Form";
import Box from "@material-ui/core/Box";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      map: "",
    };
  }
  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.5941732, lng: -73.9443477 },
      zoom: 10,
    });
    this.setState({ map: map });
  }
  render() {
    const myStyle = {
      width: 700,
      height: 800
    }
    return (
      <div>
        <Box display="flex" flexDirection="raw">
          <Box style={myStyle} id="map"></Box>
          <Box display="flex" flexDirection="column" id="form">
            <Form map={this.state.map} />
            <TripResults />
          </Box>
        </Box>
      </div>
    );
  }
}
