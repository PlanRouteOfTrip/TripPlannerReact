import React from "react";
import { connect } from "react-redux";

const TripResults = (props) => {
    const setOfTheBest = props.setOfTheBest

    return (
      <div>
        {setOfTheBest.map((tripOption, i) => {
            return (
                <div key={`tripoption${i}`}>
                <p>TRIP OPTION {i + 1}: total trip time - {tripOption[tripOption.length - 1]}</p>
                <p>TRAVEL FROM START: {tripOption[0].timeFromStart} mins</p>
                {tripOption.map((place, j) => {
                    if (typeof place === "object") {
                        return (
                        <div key={`placeintrip${i}${j}`}>
                            <p>{place.name} - {place.minsToSpend} mins</p>
                            {(place.alert) ? <p id="alert">{place.alert}</p> : <p></p>}
                        </div>
                    )
                    }
                    
                })}
                <p>TRAVEL TO FINISH: {tripOption[tripOption.length - 2].timeToFinish} mins</p>
                </div>
            )
        })}
      </div>
    );
}

const mapStateToProps = (state) => ({
    setOfTheBest: state.setOfTheBest,
  });
  
  const ConnectedTripResults = connect(mapStateToProps)(TripResults);
  
  export default ConnectedTripResults;

