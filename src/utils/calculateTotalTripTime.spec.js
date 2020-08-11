import { diff_hours } from "./calculateTotalTripTime"

test('diff_hours returns correct value when > 1 hour', () => {
    expect(diff_hours("2020-07-31T17:31", "2020-07-31T15:31")).toBe(120);
});

test('diff_hours returns correct value when < 1 hour', () => {
    expect(diff_hours("2020-07-31T17:31", "2020-07-31T17:21")).toBe(10);
});

test('diff_hours returns 0 when finishTime < startTime', () => {
    expect(diff_hours("2020-07-31T15:31", "2020-07-31T17:21")).toBe(0);
});
