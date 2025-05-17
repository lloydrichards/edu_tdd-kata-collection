import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { Cell, GameOfLife, nextCell, parseInput } from "./game_of_life";

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
        expect(result[0]?.[0]).toEqual(
          new Cell({
            x: 0,
            y: 0,
            isAlive: false,
          })
        );
      })
    );
    it.effect(
      "when given a multiline generation, should return array of cells",
      () =>
        Effect.gen(function* () {
          const result = yield* parseInput(".*..\n....");
          expect(result[0]?.[0]).toEqual(
            new Cell({
              x: 0,
              y: 0,
              isAlive: false,
            })
          );
        })
    );
  });

  describe("nextCell", () => {
    it.effect("when given a cell, should return a cell", () =>
      Effect.gen(function* () {
        const result = yield* nextCell(
          new Cell({ x: 0, y: 0, isAlive: false })
        );
        expect(result).toEqual(
          new Cell({
            x: 0,
            y: 0,
            isAlive: false,
          })
        );
      })
    );
  });
});
