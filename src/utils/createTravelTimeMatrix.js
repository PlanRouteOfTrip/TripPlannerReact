function fillTravelTimesAPI(places) {
  return new Promise(async (resolve, reject) => {
    let error = "";
    let travelTimes = [];

    for (let i = 0; i < places.length; i++) {
      let innerArr = [];
      for (let j = 0; j < places.length; j++) {
        innerArr.push(0);
      }
      travelTimes.push(innerArr);
    }
    let addressesOnly = [...places].map((el) => el.formatted_address);

    for (let i = 0; i < travelTimes.length; i++) {
      for (let j = i + 1; j < travelTimes.length; j++) {
        travelTimes = await addTimeToMatrix(
          addressesOnly[i],
          addressesOnly.slice(i + 1),
          i,
          travelTimes,
          error
        );
        break;
      }
    }
    console.log('travel times', travelTimes)
    resolve(travelTimes);
    //   return {
    //     error: error,
    //     times: travelTimes,
    //   };
  });
}

const addTimeToMatrix = (address, restOfAddresses, i, matrix, error) => {
  var request = {
    origins: [address],
    destinations: restOfAddresses,
    travelMode: "DRIVING",
  }; 
  return new Promise((resolve, reject) => {
    var service = new window.google.maps.DistanceMatrixService();
  service.getDistanceMatrix( request, async function (response, status) {
      if (status === "OK") {
        let timesOfTravel = response.rows[0].elements;
        for (let k = i + 1; k < matrix.length; k++) {
          let singleTime = Math.floor(timesOfTravel[0].duration.value / 60);
          timesOfTravel.shift();
          matrix[i][k] = singleTime;
          matrix[k][i] = singleTime;
        }
        resolve(matrix)
      } else {
        error = "Unable to get travel time from matrix api";
      }
    }
  );
  })
  
};

export async function fillTravelTimes(places) {
  return await fillTravelTimesAPI(places);
}
