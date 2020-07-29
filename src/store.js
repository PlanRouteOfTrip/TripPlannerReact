import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const FETCH_PLACES = "FETCH_PLACES"
const REMOVE_PLACE = "REMOVE_PLACE"
const ADD_PLACE = "ADD_PLACE"

const google = window.google

export const fetchPlaces = () => {
    return {
        type: FETCH_PLACES
    }
}

export const removePlace = (name) => {
    return {
        type: REMOVE_PLACE,
        name
    }
}


const addedPlace = (place) => {
    return {
        type: ADD_PLACE,
        place
    }
}

export const addPlace = (place) => {
    return async (dispatch) => {
        try {
            let newFoundPlace = await getFoundPlace(place)
            let newPlace = `${place} - ${newFoundPlace}`
            console.log("newPlace from add place thunk", newPlace)
            dispatch(addedPlace(newPlace))
        } catch (error) {
            console.log('Error with finding place', error)
        }
    }
}

function getFoundPlace(place) {
    var request = {
      query: place,
      fields: ["name", "geometry", "formatted_address", "place_id"],
    };
    return new Promise((resolve, reject) => {
      let service = new window.google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, async function (results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //   let foundPoint = await createMarker(results[0]);
          let foundPoint = await results[0]
            console.log("found address", foundPoint.formatted_address)
        //   map.setCenter(results[0].geometry.location);
          resolve(foundPoint.formatted_address);
        }
      });
    });
  }


// export const addPlaceThunk = place => {
//     console.log("place from thunk", place)
//     return async dispatch => {
//         try {
//             let addedPoint;
//             const newPlace = async dispatch => (place) => {
//                 console.log("place from google call", place)
//         var request = {
//         query: place,
//         fields: ["name", "geometry", "formatted_address", "place_id"],
//     };
//         return new Promise((resolve, reject) => {
//             service = new google.maps.places.PlacesService(map);
//             service.findPlaceFromQuery(request, async function (results, status) {
//                 if (status === google.maps.places.PlacesServiceStatus.OK) {
//                     let foundPoint = await createMarker(results[0]);
//                      map.setCenter(results[0].geometry.location);
//                     resolve(foundPoint);
//                 }
//             });
//         });
//             }
//             if (newPlace.opening_hours) {
//             addedPoint = {
//                 name: newPlace.name,
//                 address: newPlace.formatted_address,
//                 minsToSpend: Number(minutes),
//                 hours: newPlace.opening_hours,
//             };
//             } else {
//             addedPoint = {
//                 name: newPlace.name,
//                 address: newPlace.formatted_address,
//                 minsToSpend: Number(minutes),
//             };
//         }
//         dispatch(addPlace(addedPoint))
//         } catch (error) {
//             console.log('Problem with adding place to visit', error)
//         }
//     }
// }

// function getFoundPlace(place) {
//     console.log("place from google call", place)
//         var request = {
//         query: place,
//         fields: ["name", "geometry", "formatted_address", "place_id"],
//     };
//         return new Promise((resolve, reject) => {
//             service = new google.maps.places.PlacesService(map);
//             service.findPlaceFromQuery(request, async function (results, status) {
//                 if (status === google.maps.places.PlacesServiceStatus.OK) {
//                     let foundPoint = await createMarker(results[0]);
//                      map.setCenter(results[0].geometry.location);
//                     resolve(foundPoint);
//                 }
//             });
//         });
// }

const initialState = {
    startPoint: {},
    startTime: null,
    endPoint: {},
    placesToVisit: [{name: "place1"}, {name: "place2"}],
    setOfThreeBest: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACES:
            return {}
        case REMOVE_PLACE:
            let places = state.placesToVisit;
            let newPlaces = places.filter((place) => {
                if (place.name !== action.name) return place
            })
            return {...state, placesToVisit: newPlaces}
        case ADD_PLACE:
            console.log("action.place", action.place)
            console.log("google", google)
            let newPlace = {name: action.place}
            return {...state, placesToVisit: [...state.placesToVisit, newPlace]}
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
