import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const FETCH_PLACES = "FETCH_PLACES";
const REMOVE_PLACE = "REMOVE_PLACE";
const ADD_PLACE = "ADD_PLACE";
const ADD_START = "ADD_START";
const ADD_FINISH = "ADD_FINISH";

export const fetchPlaces = () => {
  return {
    type: FETCH_PLACES,
  };
};

export const removePlace = (name, id) => {
  return {
    type: REMOVE_PLACE,
    name,
    id
  };
};

const addedPlace = (place) => {
  return {
    type: ADD_PLACE,
    place,
  };
};

export const addPlace = (place, map) => {
  return async (dispatch) => {
    try {
      let newFoundPlace = await getFoundPlace(place, map);
      dispatch(addedPlace(newFoundPlace));
    } catch (error) {
      console.log("Error with finding place", error);
    }
  };
};

function getFoundPlace(place, map) {
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
          infowindow
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
let uniqueId = function() {
    return ++currentId;
}

async function createMarker(place, map, service, infowindow) {
  try {
    var id = uniqueId()
    var marker = new window.google.maps.Marker({
      id: id,
      map: map,
      animation: window.google.maps.Animation.DROP,
      position: place.geometry.location,
      placeId: place.place_id,
    });
    
    // auto-zooming according chosen markers
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
    goalPlace.id = marker.id
    return goalPlace;
  } catch (error) {
    console.log("error", error);
  }
}

function removeMarker(id) {
    let marker = group.filter(mark => mark.id === id); 
    marker[0].setMap(null);
    group = group.filter(el => el.id !== id)
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
      let newStartPlace = await getFoundPlace(place, map);
      dispatch(addedStart(newStartPlace, time));
    } catch (error) {
      console.log("Error with finding place", error);
    }
  };
};

export const addFinish = (place, time, map) => {
  return async (dispatch) => {
    try {
      let newFinishPlace = await getFoundPlace(place, map);
      dispatch(addedFinish(newFinishPlace, time));
    } catch (error) {
      console.log("Error with finding place", error);
    }
  };
};

const initialState = {
  startPoint: {},
  startTime: null,
  endPoint: {},
  endTime: null,
  placesToVisit: [],
  setOfThreeBest: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      return {};
    case REMOVE_PLACE:
      removeMarker(action.id)
      let places = state.placesToVisit;
      let newPlaces = places.filter((place) => {
        if (place.name !== action.name) return place;
      });
      return { ...state, placesToVisit: newPlaces };
    case ADD_PLACE:
      console.log("state", state)
      return {
        ...state,
        placesToVisit: [...state.placesToVisit, action.place],
      };
    case ADD_START:
      return { ...state, startPoint: action.place, startTime: action.time };
    case ADD_FINISH:
      return { ...state, endPoint: action.place, endTime: action.time };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
