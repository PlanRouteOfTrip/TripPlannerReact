import React from "react";
import { addPlace, addFinish, addStart } from "../store";
import { connect } from "react-redux";
import PlacesToVisit from "./PlacesToVisit";
import TextField from "@material-ui/core/TextField";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: "",
      startTime: "",
      endPoint: "",
      endTime: "",
      curPoint: "",
      curMinsToSpend: 0,
    };
  }

  render() {
    return (
      <div>
        <h2>Create Your Trip:</h2>
        <form className="start">
          <h3>1. Starting Point:</h3>
          <input
            type="text"
            name="startDay"
            value={this.state.startPoint}
            placeholder="Name or Address of your starting point"
            onChange={(e) => this.setState({ startPoint: e.target.value })}
          />
          <br />
          <div id="timeDate">
            <TextField
              id="datetime-start"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.startTime}
              onChange={(e) => this.setState({startTime: e.target.value})}
            />
          </div>
          <button
            type="submit"
            id="addStart"
            onClick={(e) => {
              e.preventDefault();
              this.props.addStart(this.state.startPoint, this.state.startTime, this.props.map);
            }}
          >
            {" "}
            Set Start
          </button>
        </form>
        <form className="finish">
          <h3>2. Final Destination: </h3>
          <input
            type="text"
            name="endPoint"
            value={this.state.endPoint}
            placeholder="Name or Address of your finish point"
            onChange={(e) => this.setState({ endPoint: e.target.value })}
          />
          <br />
          <div id="timeDate">
            <TextField
              id="datetime-end"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.endTime}
              onChange={(e) => this.setState({endTime: e.target.value})}
            />
          </div>
          <button
            type="submit"
            id="addFinish"
            onClick={(e) => {
              e.preventDefault();
              this.props.addFinish(this.state.endPoint, this.state.endTime, this.props.map);
            }}
          >
            {" "}
            Set Finish{" "}
          </button>
        </form>
        <form className="locations">
          <h3>3. Places to visit:</h3>
          <PlacesToVisit />
          <input
            type="text"
            name="curPoint"
            placeholder="Name or Address of place"
            value={this.state.curPoint}
            onChange={(e) => {
              this.setState({ curPoint: e.target.value });
            }}
          />
          <br />
          {/* <input
            type="number"
            name="curMinsToSpend"
            placeholder="Time you plan to spend there in minutes"
            onChange={e => this.setState({curMinsToSpend: e.target.value})}
          /><br /> */}
          <button
            type="submit"
            id="addPoint"
            onClick={(e) => {
              e.preventDefault();
              this.props.addPlace(this.state.curPoint, this.props.map);
              this.setState({ curPoint: "" });
            }}
          >
            Add place to the list
          </button>
        </form>
        {/* 
        <button type="button" id="findTrips">
          4. Find best options of the trip
        </button>
        <div>
          <h2>Best trip options:</h2>
          <ul id="bestTripOptions"></ul>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  places: state.placesToVisit,
});

const mapDispatchToProps = (dispatch) => ({
  addPlace: (name, map) => dispatch(addPlace(name, map)),
  addStart: (place, time, map) => dispatch(addStart(place, time, map)),
  addFinish: (place, time, map) => dispatch(addFinish(place, time, map)),
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default ConnectedForm;
