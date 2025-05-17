import { Effect, pipe } from "effect";

export const parseInput = (input: string) =>
  Effect.gen(function* () {
    return input.split("");
  });

export const GameOfLife = Effect.fn("GameOfLife")(function* (n: string) {
  return n;
});
