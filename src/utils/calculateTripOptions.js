import { getSetOfTheBest } from "./findBestSets";
import { fillTravelTimes } from "./createTravelTimeMatrix";
import {checkOpenHours} from './openHours'

export const createPossibleTrips = (points) => {
  const permutations = [];

  const permutate = (cur, rest) => {
    if (rest.length === 0) {
      permutations.push(cur);
      return;
    }

    for (let i = 0; i < rest.length; i++) {
      permutate([...cur, rest[i]], [...rest.slice(0, i), ...rest.slice(i + 1)]);
    }
  };

  permutate([], points);
  return permutations;
};

export async function getSets(places, totalTripTime, startTime) {
  let finalSet = [];
  let bestSet = [];
  let matrix = await fillTravelTimes(places)
  console.log('matrix', matrix)
  let tripsOptions = createPossibleTrips(places);
  // console.log("tripsOptions.length", tripsOptions.length)

  for (let i = 0; i < tripsOptions.length; i++) {
    let time =
      tripsOptions[i][0].minsToSpend +
      tripsOptions[i][0].timeFromStart +
      tripsOptions[i][tripsOptions[i].length - 1].timeToFinish;
    let trip = tripsOptions[i];
    for (let j = 1; j < places.length; j++) {
        time =
        time +
        matrix[trip[j - 1].index][trip[j].index] +
        trip[j].minsToSpend;
      //if time greater than totalTripTime we need to cut rest of the points in this trip and break this loop
      if (time > totalTripTime) {
        trip = trip.slice(0, j);
        console.log("trip sliced", trip)
        break;
      }
    }
    console.log('trip before adding totalTripTime', trip)
    trip.push(time)
    console.log("final trip", trip)
    //check if trip is already in finalSet
    if (!checkSet(finalSet, trip)) {
      finalSet.push(trip);
    }
  }

  // pick 3 best sets
  bestSet = getSetOfTheBest(finalSet);
  let finalSets = checkOpenHours(bestSet, startTime, matrix)

  return finalSets;
}

export const checkSet = (curSet, trip) => {
  // to count times when trip not equal one of the sets from curSet
  let countOfFalse = 0;

  if (!curSet.length) return false;

  for (let i = 0; i < curSet.length; i++) {
    if (curSet[i].length === trip.length) {
      let idx = 0;
      while (idx < trip.length) {
        if (
          curSet[i][idx].index === trip[idx].index &&
          curSet[i][idx].minsToSpend === trip[idx].minsToSpend
        )
          idx++;
        else {
          countOfFalse++;
          break;
        }
      }
    }
  }
  // if countOfFalse less than curSet length - true, this trip already in set
  return countOfFalse < curSet.length;
};

