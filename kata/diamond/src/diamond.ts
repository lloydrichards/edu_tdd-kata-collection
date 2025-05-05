export const prettyDiamond = (letter: string) => {
  if (letter === "A") return ["A"];
  if (letter === "B") return [" A ", "B B", " A "];
  if (letter === "C") return ["  A  ", " B B ", "C   C", " B B ", "  A  "];

  return [
    "   A   ",
    "  B B  ",
    " C   C ",
    "D     D",
    " C   C ",
    "  B B  ",
    "   A   ",
  ];
};
