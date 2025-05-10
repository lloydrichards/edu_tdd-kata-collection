type Card = {
  suit: string;
  label: string;
  rank: number;
};

const cardLabels = [
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
  const validValues = ["2", "3", "4", "5", "6", "7", "8", "9", "T"];

  const faceIdx = ["J", "Q", "K", "A"].findIndex((v) => v === card[0]);
  const valueIdx = validValues.findIndex((v) => v === card[0]);

  if (faceIdx >= 0) return faceIdx + validValues.length;
  if (valueIdx === -1) throw new Error("value is not accepted");

  return valueIdx;
};

export const parseCard = (card: string): Card => {
  const rank = getValueFor(card);
  const label = cardLabels[rank] || "";
  return {
    suit: getSuitFor(card),
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
  const hands: Array<[(typeof ranks)[0]["key"], boolean, Array<Card | null>]> =
    [
      ["STRAIGHT_FLUSH", hasStraight(hand) && hasFlush(hand), [null]],
      [
        "FOUR_OF_KIND",
        getSameRank(4)(hand).length === 4,
        [getSameRank(4)(hand).at(-1) || null],
      ],
      [
        "FULL_HOUSE",
        getSameRank(2)(hand).length === 2 && getSameRank(3)(hand).length === 3,
        [getSameRank(3)(hand).at(-1) || null],
      ],
      ["FLUSH", hasFlush(hand), [null]],
      ["STRAIGHT", hasStraight(hand), [null]],
      [
        "THREE_OF_KIND",
        getSameRank(3)(hand).length === 3,
        [getSameRank(3)(hand).at(-1) || null],
      ],
      [
        "TWO_PAIR",
        getSameRank(2)(hand).length === 4,
        [
          getSameRank(2)(hand).at(-1) || null,
          getSameRank(2)(hand).at(0) || null,
        ],
      ],
      [
        "PAIR",
        getSameRank(2)(hand).length === 2,
        [getSameRank(2)(hand).at(-1) || null],
      ],
    ];
  const result = hands.find(([_, pred]) => pred);
  if (!result) return [null, null];
  return [result[0], result[2]] as const;
};

const ranks = [
  { key: "STRAIGHT_FLUSH", label: "straight flush", rank: 8 },
  { key: "FOUR_OF_KIND", label: "four of a kind", rank: 7 },
  { key: "FULL_HOUSE", label: "full house", rank: 6 },
  { key: "FLUSH", label: "flush", rank: 5 },
  { key: "STRAIGHT", label: "straight", rank: 4 },
  { key: "THREE_OF_KIND", label: "three of a kind", rank: 3 },
  { key: "TWO_PAIR", label: "two pairs", rank: 2 },
  { key: "PAIR", label: "pair", rank: 1 },
];

export const scoreHand = (hand: Card[]) => {
  const [type, card] = classifyHand(hand);
  const ranking = ranks.find((s) => s.key == type);
  if (!ranking) return null;
  const handScore = ranking.rank * 1000;
  const cardScore = (card?.[0]?.rank || 0) + (card?.[1]?.rank || 0);
  const highCardScore = (getSameRank(1)(hand).at(-1)?.rank || 0) / 100;

  return {
    score: handScore + cardScore + highCardScore,
    label: ranking.label || "",
    cardLabel: card?.[0]?.label,
    highCard: getSameRank(1)(hand).at(-1),
  };
};

export const pokerGame = (black: Array<string>, white: Array<string>) => {
  const blackHand = black.map(parseCard).sort((a, b) => b.rank - a.rank);
  const whiteHand = white.map(parseCard).sort((a, b) => b.rank - a.rank);

  const blackScore = scoreHand(blackHand);
  const whiteScore = scoreHand(whiteHand);

  if (blackScore && (blackScore.score || 0) > (whiteScore?.score || 0)) {
    return `Black wins - ${blackScore.label}: ${blackScore.cardLabel}`;
  }
  if (whiteScore && (whiteScore.score || 0) > (blackScore?.score || 0)) {
    return `White wins - ${whiteScore.label}: ${whiteScore.cardLabel}`;
  }

  const winnerCard = blackHand
    .map((blackCard, i) => ({
      black: blackCard,
      white: whiteHand[i]!,
    }))
    .find(({ black, white }) => black?.rank !== white?.rank);

  if (winnerCard) {
    const winningPlayer =
      (winnerCard.black?.rank || 0) > (winnerCard.white?.rank || 0)
        ? "Black"
        : "White";
    const winningCard =
      (winnerCard.black?.rank || 0) > (winnerCard.white?.rank || 0)
        ? winnerCard.black
        : winnerCard.white;
    return `${winningPlayer} wins - high card: ${winningCard?.label}`;
  }
  return "Tie";
};

const getSameRank = (n: number) => (blackHand: Card[]) =>
  blackHand
    .filter((c) => blackHand.filter((d) => d.rank == c.rank).length == n)
    .sort((a, b) => a.rank - b.rank);
