import React from "react";
import { addPlace, addFinish, addStart, calculateOptions } from "../store";
import { connect } from "react-redux";
import PlacesToVisit from "./PlacesToVisit";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: "",
      startTime: "",
      endPoint: "",
      endTime: "",
      curPoint: "",
      curMinsToSpend: "",
    };
  }

  render() {
    return (
      <div>
        <h2>Create Your Trip:</h2>
        <form className="startForm">
          <div className="start"> 
          <TextField
            value={this.state.startPoint}
            label="Name or Address of your starting point *"
            // variant="outlined"
            style={{width: "60%", marginLeft: "20px", marginRight: "20px"}}
            margin="dense"
            onChange={(e) => this.setState({ startPoint: e.target.value })}
          />
          <br />
            <TextField
              id="datetime-start"
              type="datetime-local"
              label="starting date and time *"
              style={{width: "40%", marginLeft: "20px", marginRight: "20px"}}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.startTime}
              onChange={(e) => this.setState({ startTime: e.target.value })}
            />
          </div>
          <div id="button">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              this.props.addStart(
                this.state.startPoint,
                this.state.startTime,
                this.props.map
              );
            }}
          >
            Set Start
          </Button>
          </div>
        </form>
        <form className="finishForm">
          <div className="finish">
          <TextField
            value={this.state.endPoint}
            label="Name or Address of your finish point"
            // variant="outlined"
            style={{width: "60%", marginLeft: "20px", marginRight: "20px"}}
            margin="dense"
            onChange={(e) => this.setState({ endPoint: e.target.value })}
          />
          <br />
            <TextField
              id="datetime-end"
              type="datetime-local"
              label="finish date and time *"
              style={{width: "40%", marginLeft: "20px", marginRight: "20px"}}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.endTime}
              onChange={(e) => this.setState({ endTime: e.target.value })}
            />
          </div>
          <div id="button">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              if (this.state.endPoint === "")
                this.setState({ endPoint: this.state.startPoint });
              this.props.addFinish(
                this.state.endPoint,
                this.state.endTime,
                this.props.map
              );
            }}
          >
            Set Finish
          </Button>
          </div>
        </form>
        <form className="locationsForm">
          <h3 style={{alignSelf: "center"}}>Places to visit:</h3>
          <PlacesToVisit/>
          <div className="locations">
          <TextField
            label="Name or Address of place *"
            // variant="outlined"
            margin="dense"
            style={{width: "60%", marginLeft: "20px", marginRight: "20px"}}
            value={this.state.curPoint}
            onChange={(e) => {
              this.setState({ curPoint: e.target.value });
            }}
          />
          <TextField
            label="Time to spend in minutes *"
            // variant="outlined"
            margin="dense"
            style={{width: "40%", marginLeft: "20px", marginRight: "20px"}}
            value={this.state.curMinsToSpend}
            onChange={(e) => this.setState({ curMinsToSpend: e.target.value })}
          />
          </div>
          <div id="button">
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              this.props.addPlace(
                this.state.curPoint,
                this.state.curMinsToSpend,
                this.props.map
              );
              this.setState({ curPoint: "", curMinsToSpend: "" });
            }}
          >
            Add place to the list
          </Button>
          </div>
        </form>
        <div id="button">
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            this.props.calculateOptions(
              this.props.startPoint,
              this.props.startTime,
              this.props.endPoint,
              this.props.endTime,
              this.props.places
            );
          }}
        >
          Find best options of the trip
        </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  places: state.placesToVisit,
  startPoint: state.startPoint,
  startTime: state.startTime,
  endPoint: state.endPoint,
  endTime: state.endTime,
});

const mapDispatchToProps = (dispatch) => ({
  addPlace: (name, mins, map) => dispatch(addPlace(name, mins, map)),
  addStart: (place, time, map) => dispatch(addStart(place, time, map)),
  addFinish: (place, time, map) => dispatch(addFinish(place, time, map)),
  calculateOptions: (startPoint, startTime, endPoint, endTime, places) =>
    dispatch(
      calculateOptions(startPoint, startTime, endPoint, endTime, places)
    ),
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default ConnectedForm;
