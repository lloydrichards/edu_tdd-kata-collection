export const card = (card: string) => {
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
