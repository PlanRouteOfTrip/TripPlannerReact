import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAP_KEY } from '../secret'

const mapStyles = {
  width: "68%",
  height: "100%",
};
class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
          lat: 40.5941732,
          lng: -73.9443477,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_KEY,
})(MapContainer);
