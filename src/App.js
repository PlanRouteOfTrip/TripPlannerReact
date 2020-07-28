import React from "react";
import MapContainer from "./components/MapContainer";
import TripResults from "./components/TripResults"
import ConnectedPlacesToVisit from "./components/PlacesToVisit"

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* </header> */}
      <div>
        {/* <MapContainer /> */}
      </div>
      <div>
        <div>
          <ConnectedPlacesToVisit />
        </div>
        <div>
          <TripResults />
        </div>
      </div>
    </div>
  );
}

export default App;
