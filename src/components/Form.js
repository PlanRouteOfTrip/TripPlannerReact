import React from 'react'


export default class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            startPoint: '',
            startTime: 0,
            endPoint: '',
            endTime: 0,
            pointsToVisit: [],
            curPoint: '',
            curMinsToSpend: 0,
            placeInput: '',
            dayInput: 0,
            timeInput: 0
        }
        this.addPoint = this.addPoint.bind(this)
        this.submitFinish = this.submitFinish.bind(this)
        this.submitStart = this.submitStart.bind(this)
    }

    async addPoint(point, mins) {
    
        let addedPoint
        let newPlace = await this.getFoundPlace(point);
        console.log('new place', newPlace)
        if (newPlace.opening_hours) {
            addedPoint = {
                name: newPlace.name,
                address: newPlace.formatted_address,
                minsToSpend: Number(minutes),
                hours: newPlace.opening_hours,
            };
        } else {
            addedPoint = {
                name: newPlace.name,
                address: newPlace.formatted_address,
                minsToSpend: Number(minutes),
            };
        }

        this.setState({
            pointsToVisit: [...this.state.pointsToVisit, addedPoint]
        })
        console.log(this.state.pointsToVisit)
    }

    getFoundPlace(place) {
        var request = {
        query: place,
        fields: ["name", "geometry", "formatted_address", "place_id"],
    };
        return new Promise((resolve, reject) => {
            service = new google.maps.places.PlacesService(map);
            service.findPlaceFromQuery(request, async function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    let foundPoint = await createMarker(results[0]);
                     map.setCenter(results[0].geometry.location);
                    resolve(foundPoint);
                }
            });
        });
    }

    submitStart(place, day, time) {
        this.setState({
            startPoint: place,
            startTime: new Date(day + 'T' + time)
        })
    }

    submitFinish(place, day, time) {
        this.setState({
            endPoint: place,
            endTime: new Date(day + 'T' + time)
        })
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
            value = {this.state.placeInput}
            placeholder="Name or Address of your starting point"
            onChange={e => this.setState({placeInput: e.target.value})}
          /><br />
          <div id="timeDate">
            <input type="date" name="startDate" value={this.state.dayInput} onChange={e => this.setState({dayInput: e.target.value})}/>
            <input type="time" name="startTime" value={this.state.timeInput} onChange={e => this.setState({timeInput: e.target.value})}/>
          </div>
          <button type="submit" id="addStart" onClick={() => this.submitStart(this.state.placeInput, this.state.dayInput, this.state.timeInput)}>Set Start</button>
        </form>
        <form className="finish">
          <h3>2. Final Destination: </h3>
          <input
            type="text"
            name="endPoint"
            value = {this.state.placeInput}
            placeholder="Name or Address of your finish point"
            onChange={e => this.setState({placeInput: e.target.value})}
          /><br />
          <div id="timeDate">
            <input type="date" name="endDay" value={this.state.dayInput} onChange={e => this.setState({dayInput: e.target.value})}/>
            <input type="time" name="endTime" value={this.state.timeInput} onChange={e => this.setState({timeInput: e.target.value})}/>
          </div>
          <button type="submit" id="addFinish" onClick={() => this.submitFinish(this.state.placeInput, this.state.dayInput, this.state.timeInput)}>Set Finish</button>
        </form>
        <form className="locations">
          <h3>3. Places to visit:</h3>
          <input
            type="text"
            name="curPoint"
            placeholder="Name or Address of place"
            onChange={e => {
                console.log(e.target.value)
                this.setState({curPoint: e.target.value})}}
          /><br />
          <input
            type="number"
            name="curMinsToSpend"
            placeholder="Time you plan to spend there in minutes"
            onChange={e => this.setState({curMinsToSpend: e.target.value})}
          /><br />
          <button type="submit" id="addPoint" onClick={(evt) => {
              evt.preventDefault()
              this.addPoint(this.state.curPoint, this.state.curMinsToSpend)}}>
            Add place to the list
          </button>
        </form>
        <div>
          <h5>All places to visit on this trip:</h5>
          <ul id="listAllPlaces"></ul>
        </div>
        <button type="button" id="findTrips">
          4. Find best options of the trip
        </button>
        <div>
          <h2>Best trip options:</h2>
          <ul id="bestTripOptions"></ul>
        </div>
      </div>
        )
    }
}