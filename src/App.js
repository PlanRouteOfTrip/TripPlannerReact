import React from "react";
import MapContainer from "./components/MapContainer";
import Form from './components/Form'


function App() {
  return (
    <div className="container">
      {/* <div className="map">
        <MapContainer />
      </div> */}
      <div className="form">
        <Form />
        <div>
          <p>Component Result</p>
        </div>
      </div>
    </div>
  );
}

export default App;
