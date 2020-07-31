export const getSetOfTheBest = (set, num = 3) => {
    let setOfTheBest = []
    let minLength = Math.min(set.length, num)
    //sort all possible sets (ascending order)
    set.sort((a, b) => a[a.length - 1] - b[b.length - 1])
  
    //take first n elements from the sorted sets
    for (let i = 0; i < minLength; i++) {
      setOfTheBest.push(set[i])
    }
  
    return setOfTheBest
  }

