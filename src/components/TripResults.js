import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import PlaceIcon from "@material-ui/icons/Place";

const TripResults = (props) => {
  const setOfTheBest = props.setOfTheBest;

  return (
    <List style={{alignSelf: "center"}}>
      {setOfTheBest.map((tripOption, i) => {
        return (
          <ListItem key={`tripoption${i}`}>
            <ListItemText>
            
              <p><DirectionsCarIcon />
                TRIP OPTION {i + 1}: total trip time -
                {tripOption[tripOption.length - 1]} mins
              </p>
              <List>
              {tripOption.map((place, j) => {
                if (typeof place === "object") {
                  return (
                    <ListItem key={`placeintrip${i}${j}`}>
                      <PlaceIcon />
                      <ListItemText>
                        {place.name} - {place.minsToSpend} mins
                      </ListItemText>
                      {place.alert ? <p id="alert">{place.alert}</p> : <p></p>}
                    </ListItem>
                  );
                }
              })}
              </List>
              <br />
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

const mapStateToProps = (state) => ({
  setOfTheBest: state.setOfTheBest,
});

const ConnectedTripResults = connect(mapStateToProps)(TripResults);

export default ConnectedTripResults;
