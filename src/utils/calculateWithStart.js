function getTimeFromStartFromAPI(startPoint, places, totalTripTime) {
    console.log("received to getTimeFromStartFromAPI: ", 'startPoint', startPoint, 'places', places, 'totalTripTime', totalTripTime)
    let placesAddressesOnly = [];
    for (let i = 0; i < places.length; i++) {
      placesAddressesOnly.push(places[i].formatted_address);
    }
  
    let request = {
      origins: [startPoint.formatted_address],
      destinations: placesAddressesOnly,
      travelMode: "DRIVING",
    };
    return new Promise((resolve, reject) => {
      var service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(request, (response, status) => {
  
        if (status === "OK") {
          let newPlaces = [];
          let foundTimes = response.rows[0].elements;
          for (let i = 0; i < places.length; i++) {
            let currentPlace = places[i];
            let currentTimeFromStart = Math.floor(
              foundTimes[i].duration.value / 60
            );
            if (Number(currentPlace.minsToSpend) + currentTimeFromStart < totalTripTime) {
              currentPlace.timeFromStart = currentTimeFromStart;
              newPlaces.push(currentPlace);
            }
            resolve(newPlaces);
          }
        }
      });
    });
  }
  
  export async function getTimeFromStart(startPoint, places, totalTripTime = 0) {
    console.log("received to getTimeFromStart: ", 'startPoint', startPoint, 'places', places, 'totalTripTime', totalTripTime)

    if (!startPoint || !places || !places.length) {
      return {
        error: "Starting point or places to visit are not specified",
        newPlaces: [],
      };
    }
  
    let newPlaces = await getTimeFromStartFromAPI(
      startPoint,
      places,
      totalTripTime
    );
  
    return newPlaces;
  }
