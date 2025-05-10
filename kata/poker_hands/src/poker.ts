type Card = {
  suit: string;
  value: number;
  label: string;
  rank: number;
};

const getSuitFor = (card: string) => {
  switch (true) {
    case card.includes("C"):
      return "CLUB";
    case card.includes("S"):
      return "SPADE";
    case card.includes("D"):
      return "DIAMOND";
    case card.includes("H"):
      return "HEART";
    default:
      throw new Error("[getSuit] suit is not accepted");
  }
};

const getValueFor = (card: string) => {
  const validFace: Array<any> = ["J", "Q", "K", "A"];
  const validValues: Array<any> = ["2", "3", "4", "5", "6", "7", "8", "9", "T"];

  if (validFace.includes(card[0])) {
    const idx = validFace.findIndex((v) => v === card[0]);
    return [10, idx + validValues.length] as const;
  }

  const valueIdx = validValues.findIndex((v) => v === card[0]);

  if (valueIdx === -1) throw new Error("value is not accepted");

  return [valueIdx + 2, valueIdx] as const;
};

export const parseCard = (card: string): Card => {
  const labels = [
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  const [value, rank] = getValueFor(card);
  const label = labels[rank] || "";
  return {
    suit: getSuitFor(card),
    value,
    label,
    rank,
  };
};
const hasFlush = (hand: Card[]) =>
  hand.map((d) => d.suit).every((d) => d === hand.at(0)?.suit);
const hasStraight = (hand: Card[]) =>
  hand.reduce(
    (acc, cur, idx) => acc && cur.rank === (hand[0]?.rank || -1) + idx,
    true
  );

export const classifyHand = (hand: Card[]) => {
  const hands: Array<[keyof typeof ranks, boolean, Card | null]> = [
    ["STRAIGHT_FLUSH", hasStraight(hand) && hasFlush(hand), null],
    [
      "FOUR_OF_KIND",
      getSameRank(4)(hand).length === 4,
      getSameRank(4)(hand).at(-1) || null,
    ],
    [
      "FULL_HOUSE",
      getSameRank(2)(hand).length === 2 && getSameRank(3)(hand).length === 3,
      getSameRank(3)(hand).at(-1) || null,
    ],
    ["FLUSH", hasFlush(hand), null],
    ["STRAIGHT", hasStraight(hand), null],
    [
      "THREE_OF_KIND",
      getSameRank(3)(hand).length === 3,
      getSameRank(3)(hand).at(-1) || null,
    ],
    [
      "TWO_PAIR",
      getSameRank(2)(hand).length === 4,
      getSameRank(2)(hand).at(-1) || null,
    ],
    [
      "PAIR",
      getSameRank(2)(hand).length === 2,
      getSameRank(2)(hand).at(-1) || null,
    ],
  ];
  const result = hands.find(([_, pred]) => pred);

  if (!result) return [null, null];
  return [result[0], result[2]] as const;
};

const ranks = {
  STRAIGHT_FLUSH: {
    label: "straight flush",
    rank: 8,
    hasHighCard: false,
  },
  FOUR_OF_KIND: {
    label: "four of a kind",
    rank: 7,
    hasHighCard: true,
  },
  FULL_HOUSE: {
    label: "full house",
    rank: 6,
    hasHighCard: false,
  },
  FLUSH: {
    label: "flush",
    rank: 5,
    hasHighCard: false,
  },
  STRAIGHT: {
    label: "straight",
    rank: 4,
    hasHighCard: false,
  },
  THREE_OF_KIND: {
    label: "three of a kind",
    rank: 3,
    hasHighCard: true,
  },
  TWO_PAIR: {
    label: "two pair",
    rank: 2,
    hasHighCard: true,
  },
  PAIR: {
    label: "pair",
    rank: 1,
    hasHighCard: true,
  },
};

export const scoreHand = (hand: Card[]) => {
  const [type, card] = classifyHand(hand);
  if (!type) return null;
  const handScore = ranks[type].rank * 1000;
  const cardScore = card?.rank || 0;
  const highCardScore = ranks[type].hasHighCard
    ? (getSameRank(1)(hand).at(-1)?.rank || 0) / 100
    : 0;

  return {
    score: handScore + cardScore + highCardScore,
    label: ranks[type].label || "",
    cardLabel: card?.label,
    highCard: ranks[type].hasHighCard ? getSameRank(1)(hand).at(-1) : undefined,
  };
};

export const pokerGame = (black: Array<string>, white: Array<string>) => {
  const blackHand = black.map(parseCard).sort((a, b) => b.rank - a.rank);
  const whiteHand = white.map(parseCard).sort((a, b) => b.rank - a.rank);

  const twoPairs = determineWinningTwoPair(blackHand, whiteHand);

  const determineWinFor = makeWinningFor(blackHand, whiteHand);

  const threeOfAKind = determineWinFor(getSameRank(3));

  if (threeOfAKind) {
    return `${threeOfAKind[0]} wins - three of a kind: ${threeOfAKind[1]?.label}`;
  }

  if (twoPairs) {
    return `${twoPairs[0]} wins - two pairs: ${twoPairs[1]?.label}`;
  }

  const pairs = determineWinFor(getSameRank(2));

  if (pairs) {
    return `${pairs[0]} wins - pair: ${pairs[1]?.label}`;
  }

  const highCard = determineHighCardWinner(blackHand, whiteHand);

  if (highCard) {
    return `${highCard[0]} wins - high card: ${highCard[1].label}`;
  }
  return "Tie";
};

const determineHighCardWinner = (blackHand: Card[], whiteHand: Card[]) => {
  const winnerCard = blackHand
    .map((blackCard, i) => ({
      blackRank: blackCard.rank,
      whiteRank: whiteHand[i]?.rank ?? 0,
    }))
    .find(({ blackRank, whiteRank }) => blackRank !== whiteRank);

  if (!winnerCard) return null;

  return winnerCard.blackRank > winnerCard.whiteRank
    ? (["Black", blackHand.at(0)!] as const)
    : (["White", whiteHand.at(0)!] as const);
};

const makeWinningFor =
  (blackHand: Card[], whiteHand: Card[]) => (fn: (hand: Card[]) => Card[]) => {
    const pair = (
      [fn(blackHand).at(0), fn(whiteHand).at(0)].filter(Boolean) as Card[]
    ).sort((a, b) => a.rank - b.rank);

    if (!pair.at(-1)) return null;

    if (isEqual(fn(blackHand).at(0), fn(whiteHand).at(0))) {
      const winningHighCard = determineHighCardWinner(blackHand, whiteHand);
      if (!winningHighCard) return null;
      return [winningHighCard[0], pair.at(-1)] as const;
    }

    return [
      isGreater(fn(blackHand).at(0), fn(whiteHand).at(0)) ? "Black" : "White",
      pair.at(-1),
    ] as const;
  };

const determineWinningTwoPair = (blackHand: Card[], whiteHand: Card[]) => {
  const blackPairs = getSameRank(2)(blackHand);
  const whitePairs = getSameRank(2)(whiteHand);

  const pair = (
    [blackPairs.at(0), whitePairs.at(0)].filter(Boolean) as Card[]
  ).sort((a, b) => a.rank - b.rank);

  if (blackPairs.length != 4 && whitePairs.length != 4) return null;

  const pairWinner = isEqual(blackPairs.at(0), whitePairs.at(0))
    ? isGreater(blackPairs.at(-1), whitePairs.at(-1))
      ? "Black"
      : "White"
    : isGreater(blackPairs.at(0), whitePairs.at(0))
      ? "Black"
      : "White";

  if (
    isEqual(blackPairs.at(0), whitePairs.at(0)) &&
    isEqual(blackPairs.at(-1), whitePairs.at(-1))
  ) {
    const winningHighCard = determineHighCardWinner(blackHand, whiteHand);
    if (!winningHighCard) return null;
    return [winningHighCard[0], pair.at(-1)] as const;
  }

  return [pairWinner, pair.at(-1)] as const;
};

const getSameRank = (n: number) => (blackHand: Card[]) =>
  blackHand.filter(
    (c) => blackHand.filter((d) => d.rank == c.rank).length == n
  );

const isEqual = (a?: Card, b?: Card) => a?.rank == b?.rank;
const isGreater = (a?: Card, b?: Card) => (a?.rank || -1) > (b?.rank || -1);
