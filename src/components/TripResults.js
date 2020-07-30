import React from "react";
import { connect } from "react-redux";

const TripResults = (props) => {
    const setOfTheBest = props.setOfTheBest

    console.log('setOfTheBest from TripResults props', setOfTheBest)

    return (
      <div>
        {setOfTheBest.map((tripOption, i) => {
            return (
                <div key={`tripoption${i}`}>
                <p>TRIP OPTION {i + 1}:</p>
                {tripOption.map((place, j) => {
                    return (
                        <div key={`placeintrip${i}${j}`}>
                            <p>{place.name}</p>
                        </div>
                    )
                })}
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

