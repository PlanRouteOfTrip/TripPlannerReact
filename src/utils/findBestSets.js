export const getSetOfTheBest = (set, num = 3) => {
    let setOfTheBest = []
    //sort all possible sets (ascending order)
    set.sort((a, b) => a[0].totalTripTime - b[0].totalTripTime)
  
    //take first n elements from the sorted sets
    for (let i = 0; i < num; i++) {
      setOfTheBest.push(set[i])
    }
  
    return setOfTheBest
  }

