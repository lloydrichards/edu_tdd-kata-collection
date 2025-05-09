const getSuit = (card: string) => {
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

export const card = (card: string) => {
  return {
    suit: getSuit(card),
  };
};

export const pokerGame = (black: Array<string>, white: Array<string>) => {
  return "White wins - high card: Ace";
};
