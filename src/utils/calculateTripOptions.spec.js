import { createPossibleTrips } from "./calculateTripOptions"

test('createPossibleTrips returns [[]] if points are empty array', () => {
    expect(createPossibleTrips([])).toEqual([[]]);
});

test('createPossibleTrips returns array of correct length', () => {
    let result1 = createPossibleTrips([{}])
    let result2 = createPossibleTrips([{}, {}])
    let result3 = createPossibleTrips([{}, {}, {}])
    expect(result1.length).toBe(1);
    expect(result2.length).toBe(2);
    expect(result3.length).toBe(6);
});

