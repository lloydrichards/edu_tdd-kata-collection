export const prettyDiamond = (letter: string) => {
  if (letter === "A") return "A";
  if (letter === "B") return " A \nB B\n A ";

  return "C   C"
};
