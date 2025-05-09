import { answer, pokerGame } from "./hiker";
import { expect, describe, it } from "bun:test";

// - [ ] should accept two hand of cards
// - [ ] should return winner with high card
// - [ ] should accept heart cards
// - [ ] should accept diamond cards
// - [ ] should accept spade cards
// - [ ] should accept club cards
// - [ ] should accept 1-10 cards
// - [ ] should accept face cards
// - [ ] should not accept none face cards
// - [ ] should rank number cards with T highest
// - [ ] should rank face cards above numbers
// - [ ] should return winner with pair
// - [ ] should return winner with two pair

describe("answer", () => {
  it("to life the universe and everything", () => {
    expect(answer()).toEqual(42);
  });
});

describe("pokerGame", () => {
  it("should accept two hand of cards", () => {
    expect(pokerGame(["", "", "", "", ""], ["", "", "", "", ""])).toBe("");
  });
});
