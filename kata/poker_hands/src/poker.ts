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

export const card = (card: string) => {
  const [value, rank] = getValueFor(card);
  return {
    suit: getSuitFor(card),
    value,
    rank,
  };
};

export const pokerGame = (black: Array<string>, white: Array<string>) => {
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
  const blackHand = black.map(card).sort((a, b) => b.rank - a.rank);
  const blackHighestCard = blackHand.at(0);

  const whiteHand = white.map(card).sort((a, b) => b.rank - a.rank);
  const whiteHighestCard = whiteHand.at(0);

  if (!blackHighestCard || !whiteHighestCard) throw new Error("no high hards");
  const highestCard =
    blackHighestCard.rank > whiteHighestCard.rank
      ? blackHighestCard
      : whiteHighestCard;

  return `White wins - high card: ${labels[highestCard.rank]}`;
};
