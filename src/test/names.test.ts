import { expect, test } from "bun:test";
import namesSorted from "../data/namesAlphabetic";

let names = namesSorted;

test("dates are formatted properly", () => {
  names.forEach(({ date, dateISO }) => {
    expect(new Date(date).getDate()).not.toBeNaN();
    expect(new Date(date).getMonth()).not.toBeNaN();
    expect(new Date(dateISO).getDate()).not.toBeNaN();
    expect(new Date(dateISO).getMonth()).not.toBeNaN();
  });
});
