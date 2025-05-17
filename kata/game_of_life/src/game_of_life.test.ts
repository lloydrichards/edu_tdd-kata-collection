import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { GameOfLife } from "./game_of_life";

describe("gameOfLife", () => {
  it.effect(
    "when given an input, should return a generation of the same size",
    () =>
      Effect.gen(function* () {
        const generation =
          "........\n" +
          "........\n" +
          "....*...\n" +
          "...**...\n" +
          ".....*..\n" +
          "........";
        const result = yield* GameOfLife(generation);
        expect(result).toHaveLength(generation.length);
      })
  );
});
