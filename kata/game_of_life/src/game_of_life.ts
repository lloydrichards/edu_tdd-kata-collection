import { Effect, pipe, Schema } from "effect";

export const nextCell = (current: Cell) =>
  Effect.gen(function* () {
    return current;
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
