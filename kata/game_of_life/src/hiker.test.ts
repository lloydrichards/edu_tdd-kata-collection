import { Effect } from "effect";
import { answer, GameOfLife } from "./hiker";
import { expect, describe, it } from "@effect/vitest";

describe("answer", () => {
  it("to life the universe and everything", () => {
    expect(answer()).toEqual(42);
  });
});

describe("gameOfLife", () => {
  it.effect("when given an input, should return a generation", () =>
    Effect.gen(function* () {
      const result = yield* GameOfLife("");
      expect(result).toBe("");
    })
  );
});
