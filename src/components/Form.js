import React from "react";
import { addPlace, addFinish, addStart, calculateOptions } from "../store";
import { connect } from "react-redux";
import PlacesToVisit from "./PlacesToVisit";
import TextField from "@material-ui/core/TextField";
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

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
          <div className="start" style={{alignItems: "flex-start"}}> 
          <TextField
            value={this.state.startPoint}
            helperText="Name or address of your starting point"
            variant="outlined"
            margin="dense"
            style={{width: "50%", marginLeft: "20px", marginRight: "20px"}}
            onChange={(e) => this.setState({ startPoint: e.target.value })}
          />
            <TextField
              id="datetime-start"
              type="datetime-local"
              helperText="Starting date and time *"
              variant="outlined"
              size="small"
              margin="dense"
              style={{width: "30%", marginLeft: "20px", marginRight: "20px"}}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.startTime}
              onChange={(e) => this.setState({ startTime: e.target.value })}
            />
          <div style={{alignItems: "center", margin: "7px"}}>
          {(this.state.startPoint.length && this.state.startTime.length) ? <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              this.props.addStart(
                this.state.startPoint,
                this.state.startTime,
                this.props.map
              );
            }}
          >
            Set
          </Button> :
          <Button variant="contained" size="large" disabled>Set</Button> 
          }
          </div>
          </div>
        </form>
        <form className="finishForm" style={{alignItems: "flex-start"}}>
          <div className="finish">
          <TextField
            value={this.state.endPoint}
            helperText="Name or address of your finish point"
            variant="outlined"
            style={{width: "50%", marginLeft: "20px", marginRight: "20px"}}
            margin="dense"
            onChange={(e) => this.setState({ endPoint: e.target.value })}
          />
          <br />
            <TextField
              id="datetime-end"
              type="datetime-local"
              helperText="Finish date and time *"
              variant="outlined"
              style={{width: "30%", marginLeft: "20px", marginRight: "20px"}}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.endTime}
              onChange={(e) => this.setState({ endTime: e.target.value })}
            />
          <div style={{alignItems: "center", margin: "7px"}}>
          {(this.state.endTime.length) ? 
            <Button
            variant="contained"
            color="primary"
            size="large"
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
            Set
          </Button> : 
          <Button variant="contained" size="large" disabled>Set</Button>
          }
          </div>
          </div>
        </form>
        <form className="locationsForm">
          <h3 style={{alignSelf: "center"}}>Places to visit:</h3>
          <PlacesToVisit/>
          <div className="locations" style={{alignItems: "flex-start"}}>
          <TextField
            helperText="Name or address of place *"
            variant="outlined"
            margin="dense"
            style={{width: "50%", marginLeft: "20px", marginRight: "20px"}}
            value={this.state.curPoint}
            onChange={(e) => {
              this.setState({ curPoint: e.target.value });
            }}
          />
          <TextField
            helperText="Time to spend in minutes *"
            variant="outlined"
            margin="dense"
            style={{width: "30%", marginLeft: "20px", marginRight: "20px"}}
            value={this.state.curMinsToSpend}
            onChange={(e) => this.setState({ curMinsToSpend: e.target.value })}
          />
          <div style={{alignItems: "center", margin: "7px"}}>
          {(this.state.curPoint.length && this.state.curMinsToSpend.length) ? 
            <Button
            variant="contained"
            size="large"
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
            Add
          </Button> :
          <Button variant="contained" size="large" disabled>Add</Button>
          }
          </div>
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
