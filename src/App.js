import React from "react";
import MapContainer from "./components/MapContainer";
import TripResults from "./components/TripResults"
import ConnectedPlacesToVisit from "./components/PlacesToVisit"
import Form from './components/Form'

function App() {
  return (
    <div className="container">
        {/* <div className="map">
        <MapContainer />
      </div> */}
        <div className="form">
        <Form />
        </div>
        <div>
          <ConnectedPlacesToVisit />
        </div>
        <div>
          <TripResults />
        </div>
    </div>
  );
}

export default App;
