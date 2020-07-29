import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const FETCH_PLACES = "FETCH_PLACES";
const REMOVE_PLACE = "REMOVE_PLACE";
const ADD_PLACE = "ADD_PLACE";

export const fetchPlaces = () => {
  return {
    type: FETCH_PLACES,
  };
};

export const removePlace = (name) => {
  return {
    type: REMOVE_PLACE,
    name,
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
const group = [];

async function createMarker(place, map, service, infowindow) {
  try {
    var marker = new window.google.maps.Marker({
      map: map,
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

    return goalPlace;
  } catch (error) {
    console.log("error", error);
  }
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

const initialState = {
  startPoint: {},
  startTime: null,
  endPoint: {},
  placesToVisit: [],
  setOfThreeBest: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      return {};
    case REMOVE_PLACE:
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
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
