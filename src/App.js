import React from "react";
import MapContainer from "./components/MapContainer";
import TripResults from "./components/TripResults";
import PlacesToVisit from "./components/PlacesToVisit";
import Form from "./components/Form";
// import { Map, GoogleApiWrapper } from "google-maps-react";
// import { GOOGLE_MAP_KEY } from "./secret";

function App() {
  return (
    <div className="container">
      <MapContainer />
      <div className="form">
        <Form />
        {/* <PlacesToVisit />
        <TripResults /> */}
      </div> 
    </div>
  );
}

export default App;

// export default GoogleApiWrapper({
//   apiKey: GOOGLE_MAP_KEY,
// })(App);
