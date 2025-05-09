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

export const card = (card: string): Card => {
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
  const blackHand = black.map(card).sort((a, b) => b.rank - a.rank);
  const whiteHand = white.map(card).sort((a, b) => b.rank - a.rank);

  const blackPairs = blackHand.filter(
    (c, i) => blackHand.filter((d) => d.rank == c.rank).length == 2
  );
  const whitePairs = blackHand.filter(
    (c, i) => blackHand.filter((d) => d.rank == c.rank).length == 2
  );

  if (blackPairs.length > 0 || whitePairs.length > 0) {
    return "pair:";
  }

  const blackHighestCard = blackHand.at(0);
  const whiteHighestCard = whiteHand.at(0);

  if (!blackHighestCard || !whiteHighestCard) throw new Error("no high cards");
  const highestCard =
    blackHighestCard.rank > whiteHighestCard.rank
      ? blackHighestCard
      : whiteHighestCard;

  let newWinner = determineWinner(blackHand, whiteHand);

  return `${newWinner} wins - high card: ${highestCard.label}`;
};

const determineWinner = (blackHand: Card[], whiteHand: Card[]): string => {
  const winnerCard = blackHand
    .map((blackCard, i) => ({
      blackRank: blackCard.rank,
      whiteRank: whiteHand[i]?.rank ?? 0,
    }))
    .find(({ blackRank, whiteRank }) => blackRank !== whiteRank);

  if (!winnerCard) throw new Error("no winner card");

  return winnerCard.blackRank > winnerCard.whiteRank ? "Black" : "White";
};
