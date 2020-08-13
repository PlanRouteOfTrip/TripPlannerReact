import React from "react";
import { removePlace } from "../store";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const PlacesToVisit = (props) => {
  const places = props.places;
  const removePlace = props.removePlace;

  return (
    <List dense style={{alignSelf: "center"}}>
      {places.map((place) => {
        return (
          //TBD: change key to place ID later
          <ListItem key={`marker${place.markerId}`}>
            <RemoveCircleOutlineIcon
              onClick={(e) => {
                e.preventDefault();
                removePlace(place.name, place.markerId);
              }}
            />
            <ListItemText>
              {place.name} - {place.formatted_address}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
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
