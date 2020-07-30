export function checkOpenHours(routes, start, matrix) {
  console.log('I am here! Checking open hours!')
    for (let j = 0; j < routes.length; j++) {
      let timer = 0;
      let places = routes[j];
      for (let i = 0; i < places.length; i++) {
        let timeToFirstPoint = places[0].timeFromStart;
        let point = places[i];
        // if we on first point need add time from start to know what time we will be there
        if (i === 0) {
          timer = new Date(
            new Date(start).getTime() + timeToFirstPoint * 60 * 1000
          );
          // if not the first point, add time from previous point to current from matrix
        } else {
          timer = new Date(
            new Date(timer).getTime() +
              matrix[point.index][places[i - 1].index] * 60 * 1000
          );
        }
        // if point has property "hours" need to check if place will be opened
        if (point.opening_hours) {
          // find day when you will come to the point
          // O - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday
          let idxDay = timer.getDay();
          // get open and close time of current place
          // 0 - Monday, 1 - Tuesday, 2 - Wednesday, 3 - Thursday, 4 - Friday, 5 - Saturday, 6 - Sunday
          let idxDayOfPlace = idxDay - 1;
          if (idxDayOfPlace < 0) idxDayOfPlace = 6;
          // check if there is schedule on this day, if not  -> it's closed
          if (point.opening_hours.periods[idxDayOfPlace]) {
            let opening = point.opening_hours.periods[idxDayOfPlace].open.hours;
            let closing = point.opening_hours.periods[idxDayOfPlace].close.hours;
            // DON'T COUNT MINUTES OF OPENING FOR NOW !!!!!
            let arrivalHours = timer.getHours();
            // let arrivalMinutes = timer.getMinutes();
            // check if place is opened at the time of arriving to the point
            if (arrivalHours >= opening && arrivalHours < closing) {
              timer = new Date(
                new Date(timer).getTime() + point.minsToSpend * 60 * 1000
              );
              let leavingHours = timer.getHours();
              // check if the place is still opened at the time of leaving of the place
              if (leavingHours >= closing) {
                  // add alert
                  routes[j][i].alert = `${routes[j][i].name} might be closed!`
              }
            } else {
                // if place will be still/ already closed at the time of arrival
              // add alert 
              routes[j][i].alert = `${routes[j][i].name} might be closed!`
            }
          } else {
              // if place will be closed at this day
            // add alert
            routes[j][i].alert = `${routes[j][i].name} might be closed!`
          }
        } else {
            // if there is no schedule for this place just continue count timer
          timer = new Date(
            new Date(timer).getTime() + point.minsToSpend * 60 * 1000
          );
        }
      }
    }
    return routes
  }
  