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
    it.effect("when given a cell, should return is the cell is alive", () =>
      Effect.gen(function* () {
        const cell = new Cell({ x: 0, y: 0, isAlive: false });
        const result = yield* nextCell([0, 0], [[cell]]);
        expect(result).toEqual(cell.isAlive);
      })
    );
    describe("underpopulation", () => {
      // 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
      it.effect("when a live cell has no neighbours, should return dead", () =>
        Effect.gen(function* () {
          const game = yield* parseInput(".*.");
          const result = yield* nextCell([0, 1], game);
          expect(result).toEqual(false);
        })
      );
      it.effect("when a live cell has one neighbours, should return dead", () =>
        Effect.gen(function* () {
          const game = yield* parseInput(".*.\n.*.\n...");
          const result = yield* nextCell([0, 1], game);
          expect(result).toEqual(false);
        })
      );
    });
  });
});
