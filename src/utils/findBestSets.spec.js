import { getSetOfTheBest } from "./findBestSets"

test('getSetOfTheBest returns empty array if set is empty array', () => {
    expect(getSetOfTheBest([])).toEqual([]);
});

test('getSetOfTheBest returns set as is if its length less than num', () => {
    expect(getSetOfTheBest([[{}, 5]])).toEqual([[{}, 5]]);
    expect(getSetOfTheBest([[{}, 5], [{}, 10], [{}, 4]], 3)).toEqual([[{}, 4], [{}, 5], [{}, 10]]);
});

test('getSetOfTheBest returns set of the best', () => {
    expect(getSetOfTheBest([[{}, 5], [{}, 10], [{}, 4]], 2)).toEqual([[{}, 4], [{}, 5]]);
    expect(getSetOfTheBest([[{}, 5], [{}, 10], [{}, 4], [{}, 4], [{}, 17], [{}, 3]], 3)).toEqual([[{}, 3], [{}, 4], [{}, 4]]);
});
