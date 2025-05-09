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

export const pokerGame = (black: Array<string>, white: Array<string>) => {
  const blackHand = black.map(parseCard).sort((a, b) => b.rank - a.rank);
  const whiteHand = white.map(parseCard).sort((a, b) => b.rank - a.rank);

  const twoPairs = determineWinningTwoPair(blackHand, whiteHand);

  if (twoPairs) {
    return `${twoPairs[0]} wins - two pairs: ${twoPairs[1]?.label}`;
  }

  const pairs = determineWinningPair(blackHand, whiteHand);

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

const determineWinningPair = (blackHand: Card[], whiteHand: Card[]) => {
  const pairWinner =
    (getPairs(blackHand).at(0)?.rank || -1) >
    (getPairs(whiteHand).at(0)?.rank || -1)
      ? "Black"
      : "White";

  const pair = (
    [getPairs(blackHand).at(0), getPairs(whiteHand).at(0)].filter(
      Boolean
    ) as Card[]
  ).sort((a, b) => a.rank - b.rank);
  const winningPair = pair.at(-1);

  if (!winningPair) return null;

  if (getPairs(blackHand).at(0)?.rank == getPairs(whiteHand).at(0)?.rank) {
    const winningHighCard = determineHighCardWinner(blackHand, whiteHand);
    if (!winningHighCard) return null;
    return [winningHighCard[0], winningPair] as const;
  }

  return [pairWinner, winningPair] as const;
};

const determineWinningTwoPair = (blackHand: Card[], whiteHand: Card[]) => {
  const blackPairs = getPairs(blackHand);
  const whitePairs = getPairs(whiteHand);

  const pair = (
    [blackPairs.at(0), whitePairs.at(0)].filter(Boolean) as Card[]
  ).sort((a, b) => a.rank - b.rank);

  if (blackPairs.length != 4 && whitePairs.length != 4) return null;

  const pairWinner =
    (blackPairs.at(0)?.rank || -1) == (whitePairs.at(0)?.rank || -1)
      ? (blackPairs.at(-1)?.rank || -1) > (whitePairs.at(-1)?.rank || -1)
        ? "Black"
        : "White"
      : (blackPairs.at(0)?.rank || -1) > (whitePairs.at(0)?.rank || -1)
        ? "Black"
        : "White";

  if (
    blackPairs.at(0)?.rank == whitePairs.at(0)?.rank &&
    blackPairs.at(-1)?.rank == whitePairs.at(-1)?.rank
  ) {
    const winningHighCard = determineHighCardWinner(blackHand, whiteHand);
    if (!winningHighCard) return null;
    return [winningHighCard[0], pair.at(-1)] as const;
  }

  return [pairWinner, pair.at(-1)] as const;
};

const getPairs = (blackHand: Card[]) =>
  blackHand.filter(
    (c) => blackHand.filter((d) => d.rank == c.rank).length == 2
  );
