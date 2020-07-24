import React from "react";
import MapContainer from "./components/MapContainer";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* </header> */}
      <div>
        <MapContainer />
      </div>
      <div>
        <div>
          <p>Component Form</p>
        </div>
        <div>
          <p>Component Result</p>
        </div>
      </div>
    </div>
  );
}

export default App;
