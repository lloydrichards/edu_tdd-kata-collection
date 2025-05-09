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
// - [x] should accept 1-10 cards
// - [x] should accept face cards
// - [x] should not accept none face cards
// - [x] should rank number cards with T highest
// - [x] should rank face cards above numbers
// - [ ] should return winner with pair
// - [ ] should return winner with two pair

describe("card", () => {
  describe("suits", () => {
    it("should accept heart cards", () => {
      expect(card("2H")["suit"]).toEqual("HEART");
    });
    it("should accept diamond cards", () => {
      expect(card("2D")["suit"]).toEqual("DIAMOND");
    });
    it("should accept spade cards", () => {
      expect(card("2S")["suit"]).toEqual("SPADE");
    });
    it("should accept club cards", () => {
      expect(card("2C")["suit"]).toEqual("CLUB");
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
        expect(card(`${value}H`)["suit"]).toEqual("HEART");
        expect(card(`${value}H`)["value"]).toEqual(value);
        expect(card(`${value}H`)["rank"]).toEqual(value - 2);
      })
    );
    it("should not accept 1 cards", () => {
      expect(() => card("1H")).toThrow();
    });
    it(`should accept T (10) card`, () => {
      expect(card("TH")["suit"]).toEqual("HEART");
      expect(card("TH")["value"]).toEqual(10);
      expect(card("TH")["rank"]).toEqual(8);
    });

    ["J", "Q", "K", "A"].forEach((value, idx) =>
      it(`should accept ${value} face card`, () => {
        expect(card(`${value}H`)["suit"]).toEqual("HEART");
        expect(card(`${value}H`)["value"]).toEqual(10);
        expect(card(`${value}H`)["rank"]).toEqual(9 + idx);
      })
    );
  });
});

describe("pokerGame", () => {
  describe("high card", () => {
    it("should accept two hand of cards", () => {
      expect(
        pokerGame(
          ["2H", "3D", "5S", "9C", "KD"],
          ["2C", "3H", "4S", "8C", "AH"]
        )
      ).toBe("White wins - high card: Ace");
    });
    it("should not accept invalid cards", () => {
      expect(() =>
        pokerGame(
          ["2X", "3D", "5S", "9C", "KD"],
          ["2C", "3H", "4S", "8C", "AH"]
        )
      ).toThrow();
    });
    it("should return high card", () => {
      expect(
        pokerGame(
          ["2H", "3D", "5S", "9C", "JD"],
          ["2C", "3H", "4S", "8C", "QH"]
        )
      ).toBe("White wins - high card: Queen");
      expect(
        pokerGame(
          ["2H", "3D", "5S", "9C", "JD"],
          ["2C", "3H", "4S", "8C", "TH"]
        )
      ).toBe("Black wins - high card: Jack");
    });
    it("should return winner with next high card on tie", () => {
      expect(
        pokerGame(
          ["2H", "3D", "5S", "9C", "JD"],
          ["2C", "3H", "4S", "8C", "JH"]
        )
      ).toBe("Black wins - high card: Jack");
    });
  });

  describe("pairs", () => {
    it("should return winner, pair and value", () => {
      expect(
        pokerGame(
          ["2H", "3D", "9S", "9C", "JD"],
          ["2C", "3H", "4S", "8C", "JH"]
        )
      ).toBe("Black wins - pair: Nine");
    });
  });
});
