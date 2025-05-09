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
  if (validFace.includes(card[0])) {
    return 10;
  }
  const validValues: Array<any> = ["2", "3", "4", "5", "6", "7", "8", "9", "T"];
  const value = card[0];
  const valueIdx = validValues.findIndex((v) => v === value);

  if (valueIdx === -1) throw new Error("value is not accepted");

  return valueIdx + 2;
};

export const card = (card: string) => {
  return {
    suit: getSuitFor(card),
    value: getValueFor(card),
  };
};

export const pokerGame = (black: Array<string>, white: Array<string>) => {
  return "White wins - high card: Ace";
};
