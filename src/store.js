import {createStore} from 'redux'

const FETCH_PLACES = "FETCH_PLACES"
const REMOVE_PLACE = "REMOVE_PLACE"
const ADD_PLACE = "ADD_PLACE"

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

export const addPlace = (place) => {
    return {
        type: ADD_PLACE,
        place
    }
}

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
            let newPlace = {name: action.place}
            return {...state, placesToVisit: [...state.placesToVisit, newPlace]}
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
