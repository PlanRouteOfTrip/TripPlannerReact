import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {getTimeFromStart} from "./utils/calculateWithStart"
import {getTimeToFinish} from "./utils/calculateWithFinish"
import {diff_hours} from "./utils/calculateTotalTripTime"
import {getSets} from "./utils/calculateTripOptions"


const FETCH_PLACES = "FETCH_PLACES";
const REMOVE_PLACE = "REMOVE_PLACE";
const ADD_PLACE = "ADD_PLACE";
const ADD_START = "ADD_START";
const ADD_FINISH = "ADD_FINISH";
const CALCULATE_OPTIONS = "CALCULATE_OPTIONS";

export const fetchPlaces = () => {
  return {
    type: FETCH_PLACES,
  };
};

export const removePlace = (name, markerId) => {
  return {
    type: REMOVE_PLACE,
    name,
    markerId,
  };
};

const addedPlace = (place) => {
  return {
    type: ADD_PLACE,
    place,
  };
};

const calculatedOptions = (setOfTheBest) => {
    return {
        type: CALCULATE_OPTIONS,
        setOfTheBest,
    }
}

export const addPlace = (place, mins, map) => {
  return async (dispatch) => {
    try {
      let newFoundPlace = await getFoundPlace(place, map);
      newFoundPlace.minsToSpend = Number(mins);
      dispatch(addedPlace(newFoundPlace));
    } catch (error) {
      console.log("Error with finding place", error);
    }
  };
};

function getFoundPlace(place, map, operation) {
  var request = {
    query: place,
    fields: ["name", "geometry", "formatted_address", "place_id"],
  };
  let infowindow = new window.google.maps.InfoWindow();
  return new Promise((resolve, reject) => {
    let service = new window.google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, async function (results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let foundPoint = await createMarker(
          results[0],
          map,
          service,
          infowindow,
          operation
        );
        console.log("found place", foundPoint);
        map.setCenter(results[0].geometry.location);
        resolve(foundPoint);
      }
    });
  });
}
let group = [];

let currentId = 0;
let uniqueId = function () {
  return ++currentId;
};

async function createMarker(place, map, service, infowindow, operation) {
  try {
    var id = uniqueId();
    var marker;
    if (operation) {
        marker = new window.google.maps.Marker({
        id: id,
        operation: operation,
        map: map,
        animation: window.google.maps.Animation.DROP,
        position: place.geometry.location,
        placeId: place.place_id,
      });
    } else {
        marker = new window.google.maps.Marker({
        id: id,
        map: map,
        animation: window.google.maps.Animation.DROP,
        position: place.geometry.location,
        placeId: place.place_id,
      });
    }

    // auto-zooming according chosen markers
    if (marker.operation) {
      let groupDuplicate = [...group]
      let markToRemove = groupDuplicate.filter(mark => mark.operation === marker.operation)
      if (markToRemove.length) removeMarker(markToRemove[0].id)
    }
    group.push(marker);
    const bounds = new window.google.maps.LatLngBounds();
    group.map((item) => {
      bounds.extend(item.position);
      return item.id;
    });
    map.fitBounds(bounds);

    window.google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });

    let goalPlace = await getGoalPlace(marker.placeId, service);
    goalPlace.markerId = marker.id;
    return goalPlace;
  } catch (error) {
    console.log("error", error);
  }
}

function removeMarker(id) {
  let marker = group.filter((mark) => mark.id === id);
  marker[0].setMap(null);
  group = group.filter((el) => el.id !== id);
}

function getGoalPlace(placeId, service) {
  let request = {
    placeId: placeId,
    fields: ["name", "formatted_address", "opening_hours"],
  };

  return new Promise((resolve, reject) => {
    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(place);
      }
    });
  });
}

const addedStart = (place, time) => {
  return {
    type: ADD_START,
    place,
    time,
  };
};

const addedFinish = (place, time) => {
  return {
    type: ADD_FINISH,
    place,
    time,
  };
};

export const addStart = (place, time, map) => {
  return async (dispatch) => {
    try {
      let newStartPlace = await getFoundPlace(place, map, "start");
      dispatch(addedStart(newStartPlace, time));
    } catch (error) {
      console.log("Error with finding place", error);
    }
  };
};

export const addFinish = (place, time, map) => {
  return async (dispatch) => {
    try {
      let newFinishPlace = await getFoundPlace(place, map, "finish");
      dispatch(addedFinish(newFinishPlace, time));
    } catch (error) {
      console.log("Error with finding place", error);
    }
  };
};

export const calculateOptions = (startPoint, startTime, endPoint, endTime, places) => {
    console.log("sent to thunk: ", "startPoint", startPoint, 'startTime', startTime, 'endPoint', endPoint, 'endTime', endTime, 'places', places)
    return async (dispatch) => {
        let totalTripTime = diff_hours(endTime, startTime)
        console.log('totalTripTime', totalTripTime)
        let withTimeFromStart = await getTimeFromStart(startPoint, places, totalTripTime)
        let withTimeToFinish = await getTimeToFinish(endPoint, withTimeFromStart, totalTripTime)
        for (let i = 0; i < withTimeToFinish.length; i++) {
            withTimeToFinish[i].index = i;
          }
        let setOfTheBest = await getSets(withTimeToFinish, totalTripTime, startTime)
        console.log("setOfTheBest from thunk", setOfTheBest)
        dispatch(calculatedOptions(setOfTheBest))
    }
}

const initialState = {
  startPoint: {
    formatted_address: "130 Hope St, Ridgewood, NJ 07450, USA",
    name: "130 Hope St" 
  },
  startTime: "2020-07-31T13:31",
  endPoint: {
    formatted_address: "130 Hope St, Ridgewood, NJ 07450, USA",
    name: "130 Hope St"
  },
  endTime: "2020-07-31T15:31",
  placesToVisit: [],
  setOfTheBest: [],
};

// const initialState = {
//   startPoint: {
//     formatted_address: "2214 E 29th St, Brooklyn, NY 11229, USA",
//     name: "2214 E 29th St" 
//   },
//   startTime: "2020-07-30T05:05",
//   endPoint: {
//     formatted_address: "2214 E 29th St, Brooklyn, NY 11229, USA",
//     name: "2214 E 29th St"
//   },
//   endTime: "2020-07-30T07:05",
//   placesToVisit: [],
//   setOfTheBest: [],
// };

// const initialState = {
//   startPoint: "",
//   startTime: "",
//   endPoint: "",
//   endTime: "",
//   placesToVisit: [],
//   setOfTheBest: [],
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      return {};
    case REMOVE_PLACE:
      removeMarker(action.markerId);
      let places = state.placesToVisit;
      let newPlaces = places.filter((place) => {
        if (place.name !== action.name) return place;
      });
      return { ...state, placesToVisit: newPlaces };
    case ADD_PLACE:
      return {
        ...state,
        placesToVisit: [...state.placesToVisit, action.place],
      };
    case ADD_START:
      console.log("START PLACE: ", action.place)
      console.log("START TIME: ", action.time, typeof action.time)
      return { ...state, startPoint: action.place, startTime: action.time };
    case ADD_FINISH:
      return { ...state, endPoint: action.place, endTime: action.time };
    case CALCULATE_OPTIONS:
        return {...state, setOfTheBest: action.setOfTheBest}
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
