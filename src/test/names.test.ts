import { expect, test } from "bun:test";
import namesSorted from "../data/namesAlphabetic";

let names = namesSorted;

test("dates are formatted properly", () => {
  names.forEach(({ date }) => {
    expect(new Date(date).getDate()).not.toBeNaN();
    expect(new Date(date).getMonth()).not.toBeNaN();
  });
});
