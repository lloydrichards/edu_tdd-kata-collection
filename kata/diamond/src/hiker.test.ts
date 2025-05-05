import { answer } from "./hiker";
import { expect, describe, it } from "bun:test";

describe("answer", () => {
  it("to life the universe and everything", () => {
    expect(answer()).toEqual(42);
  });
});
