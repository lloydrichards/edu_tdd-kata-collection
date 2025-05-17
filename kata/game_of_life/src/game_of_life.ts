import { Effect, pipe, Schema } from "effect";

export const nextCell = (curIdx: [number, number], generation: Cell[][]) =>
  Effect.gen(function* () {
    const currentCell = generation[curIdx[0]]?.[curIdx[1]];
    const neighbours = [
      generation[curIdx[0] - 1]?.[curIdx[1]],
      generation[curIdx[0]]?.[curIdx[1] + 1],
      generation[curIdx[0] + 1]?.[curIdx[1]],
      generation[curIdx[0]]?.[curIdx[1] - 1],
    ].filter((d) => d != undefined);

    if (neighbours.filter((c) => c.isAlive).length < 2) return false;

    return currentCell?.isAlive;
  });

export class Cell extends Schema.Class<Cell>("Cell")({
  x: Schema.Number,
  y: Schema.Number,
  isAlive: Schema.Boolean,
}) {}

export const parseInput = (input: string) =>
  Effect.gen(function* () {
    const parts = input.split("\n").map((s) => s.split(""));
    return parts.map((r, y) =>
      r.map((c, x) => new Cell({ x, y, isAlive: c == "*" }))
    );
  });

export const GameOfLife = Effect.fn("GameOfLife")(function* (n: string) {
  return n;
});
