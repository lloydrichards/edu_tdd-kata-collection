import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { GameOfLife } from "./hiker";

describe("gameOfLife", () => {
  it.effect("when given an input, should return a generation", () =>
    Effect.gen(function* () {
      const result = yield* GameOfLife("");
      expect(result).toBe("");
    })
  );
});
