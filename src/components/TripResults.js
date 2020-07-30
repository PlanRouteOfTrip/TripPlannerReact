import React from "react";
import { connect } from "react-redux";

const TripResults = (props) => {
    const setOfTheBest = props.setOfTheBest

    return (
      <div>
        {setOfTheBest.map((tripOption, i) => {
            return (
                <div key={`tripoption${i}`}>
                <p>TRIP OPTION {i + 1}: total trip time - {tripOption[0].totalTripTime}</p>
                <p>TRAVEL FROM START: {tripOption[0].timeFromStart} mins</p>
                {tripOption.map((place, j) => {
                    return (
                        <div key={`placeintrip${i}${j}`}>
                            <p>{place.name} - {place.minsToSpend} mins</p>
                        </div>
                    )
                })}
                <p>TRAVEL TO FINISH: {tripOption[tripOption.length - 1].timeToFinish} mins</p>
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

