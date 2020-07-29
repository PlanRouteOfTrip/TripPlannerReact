import React from "react";
import { removePlace } from "../store";
import { connect } from "react-redux";

const PlacesToVisit = (props) => {
  const places = props.places;
  const removePlace = props.removePlace;

  return (
    <div>
      {places.map((place) => {
        return (
          //TBD: change key to place ID later
          <div key={place.name}>
                <p>
              {place.name} - {place.formatted_address}{" "}
            <button onClick={(e) => {
              e.preventDefault()
              removePlace(place.name, place.id)}}>X</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  places: state.placesToVisit,
});

const mapDispatchToProps = (dispatch) => ({
  removePlace: (name, id) => dispatch(removePlace(name, id)),
});

const ConnectedPlacesToVisit = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesToVisit);

export default ConnectedPlacesToVisit;
