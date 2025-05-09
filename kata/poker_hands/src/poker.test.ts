import { describe, expect, it } from "bun:test";
import { classifyHand, parseCard, pokerGame } from "./poker";

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
      expect(parseCard("2H")["suit"]).toEqual("HEART");
    });
    it("should accept diamond cards", () => {
      expect(parseCard("2D")["suit"]).toEqual("DIAMOND");
    });
    it("should accept spade cards", () => {
      expect(parseCard("2S")["suit"]).toEqual("SPADE");
    });
    it("should accept club cards", () => {
      expect(parseCard("2C")["suit"]).toEqual("CLUB");
    });
    it("should not accept invalid suits", () => {
      expect(() => parseCard("2X")).toThrow();
      expect(() => parseCard("2M")).toThrow();
      expect(() => parseCard("2P")).toThrow();
      expect(() => parseCard("2L")).toThrow();
    });
  });
  describe("value", () => {
    [2, 3, 4, 5, 6, 7, 8, 9].forEach((value) =>
      it(`should accept ${value} card`, () => {
        expect(parseCard(`${value}H`)["suit"]).toEqual("HEART");
        expect(parseCard(`${value}H`)["value"]).toEqual(value);
        expect(parseCard(`${value}H`)["rank"]).toEqual(value - 2);
      })
    );
    it("should not accept 1 cards", () => {
      expect(() => parseCard("1H")).toThrow();
    });
    it(`should accept T (10) card`, () => {
      expect(parseCard("TH")["suit"]).toEqual("HEART");
      expect(parseCard("TH")["value"]).toEqual(10);
      expect(parseCard("TH")["rank"]).toEqual(8);
    });

    ["J", "Q", "K", "A"].forEach((value, idx) =>
      it(`should accept ${value} face card`, () => {
        expect(parseCard(`${value}H`)["suit"]).toEqual("HEART");
        expect(parseCard(`${value}H`)["value"]).toEqual(10);
        expect(parseCard(`${value}H`)["rank"]).toEqual(9 + idx);
      })
    );
  });
});

describe("pokerGame", () => {
  describe("high card", () => {
    // - Hands which do not fit any higher category are ranked by the value of their highest card.
    // - If the highest cards have the same value, the hands are ranked by the next highest, and so on.

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
    // - 2 of the 5 cards in the hand have the same value.
    // - Hands which both contain a pair are ranked by the value of the cards forming the pair.
    // - If these values are the same, the hands are ranked by the values of the cards not forming the pair, in decreasing order.

    it("should return winner, pair and value", () => {
      expect(
        pokerGame(
          ["2H", "3D", "9S", "9C", "JD"],
          ["2C", "3H", "4S", "8C", "JH"]
        )
      ).toBe("Black wins - pair: Nine");
    });
    it("should return the higher pair", () => {
      expect(
        pokerGame(
          ["2H", "3D", "9S", "9C", "JD"],
          ["2C", "3H", "4S", "JC", "JH"]
        )
      ).toBe("White wins - pair: Jack");
    });
    it("should select winner based on high card if tie", () => {
      expect(
        pokerGame(
          ["2H", "3D", "9S", "JS", "JD"],
          ["2C", "3H", "4S", "JC", "JH"]
        )
      ).toBe("Black wins - pair: Jack");
    });
  });

  describe("Two Pair", () => {
    // - The hand contains 2 different pairs.
    // - Hands which both contain 2 pairs are ranked by the value of their highest pair.
    // - Hands with the same highest pair are ranked by the value of their other pair.
    // - If these values are the same the hands are ranked by the value of the remaining card.

    it("should return two pairs and value", () => {
      expect(
        pokerGame(
          ["3H", "3D", "9S", "9C", "JD"],
          ["2C", "3H", "4S", "8C", "JH"]
        )
      ).toEqual("Black wins - two pairs: Nine");
    });
    it("should return the higher of the two pairs", () => {
      expect(
        pokerGame(
          ["3H", "3D", "9S", "9C", "JD"],
          ["2C", "4H", "4S", "JC", "JH"]
        )
      ).toEqual("White wins - two pairs: Jack");
    });
    it("should return the second pair on first tie", () => {
      expect(
        pokerGame(
          ["3H", "3D", "9S", "JS", "JD"],
          ["2C", "4H", "4S", "JC", "JH"]
        )
      ).toEqual("White wins - two pairs: Jack");
    });
    it("should return the high card on both tie", () => {
      expect(
        pokerGame(
          ["4H", "4D", "9S", "9S", "JD"],
          ["2C", "4H", "4S", "9C", "9H"]
        )
      ).toEqual("Black wins - two pairs: Nine");
    });
  });
});

describe("Three of a Kind", () => {
  // - Three of the cards in the hand have the same value.
  // - Hands which both contain three of a kind are ranked by the value of the 3 cards.
  it("should return three of a kind and value", () => {
    expect(
      pokerGame(["3H", "3D", "9S", "9C", "JD"], ["2C", "2H", "2S", "8C", "JH"])
    ).toEqual("White wins - three of a kind: Two");
  });
});

describe("classifyHand", () => {
  // - Three of the cards in the hand have the same value.
  // - Hands which both contain three of a kind are ranked by the value of the 3 cards.
  it("should classify as PAIR", () => {
    expect(classifyHand(["3H", "3D", "9S", "TC", "JD"].map(parseCard))).toEqual(
      "PAIR"
    );
  });
  it("should classify as TWO_PAIR", () => {
    expect(classifyHand(["3H", "3D", "9S", "9C", "JD"].map(parseCard))).toEqual(
      "TWO_PAIR"
    );
  });
  it("should classify as THREE_OF_KIND", () => {
    expect(classifyHand(["3H", "3D", "3S", "9C", "JD"].map(parseCard))).toEqual(
      "THREE_OF_KIND"
    );
  });
  it("should classify as FULL_HOUSE", () => {
    expect(classifyHand(["3H", "3D", "3S", "9C", "9D"].map(parseCard))).toEqual(
      "FULL_HOUSE"
    );
  });
  it("should classify as FOUR_OF_KIND", () => {
    expect(classifyHand(["3H", "3D", "3S", "3C", "JD"].map(parseCard))).toEqual(
      "FOUR_OF_KIND"
    );
  });
});
