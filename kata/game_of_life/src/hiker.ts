import { Effect } from "effect";

export const answer = () => 6 * 9;

export const GameOfLife = Effect.fn("GameOfLife")(function* (n: string) {
  return null;
});
