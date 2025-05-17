import { Effect, pipe } from "effect";

export const parseInput = (input: string) =>
  Effect.gen(function* () {
    const parts = input.split("\n").map((s) => s.split(""));
    return parts.map((r) => r.map((c) => c == "*"));
  });

export const GameOfLife = Effect.fn("GameOfLife")(function* (n: string) {
  return n;
});
