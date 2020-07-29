import React from "react";
import { addPlace, addPlaceThunk } from "../store";
import { connect } from "react-redux";
// import {DateTimePicker} from 'react-widgets'
// import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import PlacesToVisit from "./PlacesToVisit"


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: "",
      startDay: new Date(),
      startTime: "",
      endPoint: "",
      endDay: new Date(),
      endTime: "",
      curPoint: "",
      curMinsToSpend: 0,
    };
  }

  render() {
    const { map } = this.props;
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
            <input
              type="date"
              name="startDate"
              value={this.state.startDay}
              onChange={(e) => this.setState({ startDay: e.target.value })}
            />
            <input
              type="time"
              name="startTime"
              value={this.state.startTime}
              onChange={(e) => this.setState({ endDay: e.target.value })}
            />
            {/* <DateTimePicker value={this.state.startTime} onChange={e => this.setState({startTime: e.target.value})} /> */}
          </div>
          {/* <button type="submit" id="addStart" onClick={(e) => {
            e.preventDefault()
            console.log(this.state)
            this.submitStart(this.state.startPoint, this.state.startDay, this.state.startTime)}}> Set Start</button> */}
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
            <input
              type="date"
              name="endDay"
              value={this.state.endDay}
              onChange={(e) => this.setState({ endDay: e.target.value })}
            />
            <input
              type="time"
              name="endTime"
              value={this.state.endTime}
              onChange={(e) => this.setState({ endTime: e.target.value })}
            />
          </div>
          {/* <button type="submit" id="addFinish" onClick={(e) => {
            e.preventDefault()
            console.log(this.state)
            this.submitFinish(this.state.endPoint, this.state.endDay, this.state.endTime)}}> Set Finish </button> */}
        </form>
        <form className="locations">
          <h3>3. Places to visit:</h3>
          <PlacesToVisit />
          <input
            type="text"
            name="curPoint"
            placeholder="Name or Address of place"
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
              //TBD: clear the form, show placeholder
              this.setState({curPoint: ""})
            }}
          >
            Add place to the list
          </button>
        </form>
        {/* <div>
          <h5>All places to visit on this trip:</h5>
          <ul id="listAllPlaces"></ul>
        </div>
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
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default ConnectedForm;
