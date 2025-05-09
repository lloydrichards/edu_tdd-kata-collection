import { describe, expect, it } from "bun:test";
import { card, pokerGame } from "./poker";

// - [x] should accept two hand of cards
//        Input: Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH
//        Output: White wins - high card: Ace
// - [x] should return winner with high card
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

describe("pokerGame", () => {
  it("should accept two hand of cards", () => {
    expect(
      pokerGame(["2H", "3D", "5S", "9C", "KD"], ["2C", "3H", "4S", "8C", "AH"])
    ).toBe("White wins - high card: Ace");
  });
});
describe("card", () => {
  it("should accept heart cards", () => {
    expect(card("2H")).toEqual({ suit: "HEART" });
  });
  it("should accept diamond cards", () => {
    expect(card("2D")).toEqual({ suit: "DIAMOND" });
  });
  it("should accept spade cards", () => {
    expect(card("2S")).toEqual({ suit: "SPADE" });
  });
});
