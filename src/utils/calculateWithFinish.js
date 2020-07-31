function getTimeToFinishAPI(endPoint, places, totalTripTime) {
    console.log("received to getTimeToFinishAPI: ", 'endPoint', endPoint, 'places', places, 'totalTripTime', totalTripTime)
    let placesAddressesOnly = [];
    for (let i = 0; i < places.length; i++) {
      placesAddressesOnly.push(places[i].formatted_address);
    }
    let request = {
      origins: [endPoint.formatted_address],
      destinations: placesAddressesOnly,
      travelMode: "DRIVING",
    };
  
    return new Promise((resolve, reject) => {
      var service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(request, (response, status) => {
        if (status === "OK") {
          let finalPlaces = []
          let foundTimes = response.rows[0].elements;
          for (let i = 0; i < places.length; i++) {
            let curPlace = places[i];
            let curTimeToFinish = Math.floor(foundTimes[i].duration.value / 60);
            if (
              curPlace.minsToSpend + curTimeToFinish + curPlace.timeFromStart <
              totalTripTime
            ) {
              curPlace.timeToFinish = curTimeToFinish;
              finalPlaces.push(curPlace);
            }
            resolve(finalPlaces)
          }
        }
      });
    });
  }
  
  export async function getTimeToFinish(endPoint, places, totalTripTime = 0) {
    console.log("received to getTimeToFinish: ", 'endPoint', endPoint, 'places', places, 'totalTripTime', totalTripTime)
    
    if (!endPoint || !places || !places.length) {
      return {
        error: "Starting point/ending point or places to visit are not specified",
        finalPlaces: [],
      };
    }
    let finalPlaces = await getTimeToFinishAPI(endPoint, places, totalTripTime);
    return finalPlaces;
  }
