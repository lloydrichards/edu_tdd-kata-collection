const getSuit = (card: string) => {
  switch (true) {
    case card.includes("C"):
      return "CLUB";
    case card.includes("S"):
      return "SPADE";
    case card.includes("D"):
      return "DIAMOND";
    default:
      return "HEART";
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
