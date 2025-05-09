import { describe, expect, it } from "bun:test";
import { card, pokerGame } from "./poker";

// - [x] should accept two hand of cards
//        Input: Black: 2H 3D 5S 9C KD White: 2C 3H 4S 8C AH
//        Output: White wins - high card: Ace
// - [x] should return winner with high card
// - [x] should accept heart cards
// - [x] should accept diamond cards
// - [x] should accept spade cards
// - [x] should accept club cards
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
  describe("suits", () => {
    it("should accept heart cards", () => {
      expect(card("2H")).toEqual({ suit: "HEART", value: 2 });
    });
    it("should accept diamond cards", () => {
      expect(card("2D")).toEqual({ suit: "DIAMOND", value: 2 });
    });
    it("should accept spade cards", () => {
      expect(card("2S")).toEqual({ suit: "SPADE", value: 2 });
    });
    it("should accept club cards", () => {
      expect(card("2C")).toEqual({ suit: "CLUB", value: 2 });
    });
    it("should not accept invalid suits", () => {
      expect(() => card("2X")).toThrow();
      expect(() => card("2M")).toThrow();
      expect(() => card("2P")).toThrow();
      expect(() => card("2L")).toThrow();
    });
  });
  describe("value", () => {
    [2, 3, 4, 5, 6, 7, 8, 9].forEach((value) =>
      it(`should accept ${value} card`, () => {
        expect(card(`${value}H`)).toEqual({
          suit: "HEART",
          value,
        });
      })
    );
    it("should not accept 1 cards", () => {
      expect(() => card("1H")).toThrow();
    });
  });
});
