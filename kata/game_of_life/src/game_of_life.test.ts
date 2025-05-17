import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { GameOfLife, parseInput } from "./game_of_life";

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

  describe("parseInput", () => {
    it.effect("when given generation, should return array of cells", () =>
      Effect.gen(function* () {
        const result = yield* parseInput("....");
        expect(result).toEqual([[".", ".", ".", "."]]);
      })
    );
    it.effect(
      "when given a multiline generation, should return array of cells",
      () =>
        Effect.gen(function* () {
          const result = yield* parseInput("....\n....");
          expect(result).toEqual([
            [".", ".", ".", "."],
            [".", ".", ".", "."],
          ]);
        })
    );
  });
});
