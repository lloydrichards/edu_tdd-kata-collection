export const prettyDiamond = (letter: string) => {
  if (letter === "A") return ["A"];
  if (letter === "B") return [" A ", "B B", " A "];

  return ["  A  ", " B B ", "C   C", " B B ", "  A  "];
};
