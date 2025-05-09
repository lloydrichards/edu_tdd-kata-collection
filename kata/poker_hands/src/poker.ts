export const card = (card: string) => {
  if (card.includes("S"))
    return {
      suit: "SPADE",
    };
  if (card.includes("D"))
    return {
      suit: "DIAMOND",
    };
  return {
    suit: "HEART",
  };
};

export const pokerGame = (black: Array<string>, white: Array<string>) => {
  return "White wins - high card: Ace";
};
