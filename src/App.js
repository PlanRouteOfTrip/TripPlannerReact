import React from "react";
// import MapContainer from "./components/MapContainer";
// import TripResults from "./components/TripResults";
import PlacesToVisit from "./components/PlacesToVisit";
import Form from "./components/Form";


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
    return (
      <div className="container">
        {/* <MapContainer /> */}
        <div style={{ width: 400, height: 400 }} id="map"></div>
        <div className="form">
          <Form map={this.state.map} />
          <PlacesToVisit />
          {/* <TripResults /> */}
        </div>
      </div>
    );
  }
}

