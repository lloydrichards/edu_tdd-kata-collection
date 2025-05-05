export const prettyDiamond = (letter: string) => {
  const alphabet = ["A", "B", "C", "D", "E"];

  if (letter === "C") {
    const alpha = alphabet.findIndex((d) => d == "C");
    const point = alphabet[0]!.padEnd(alpha + 1, " ").padStart(alpha + 3, " ");
    const facets = [point, " B B "];
    return [
      ...facets,
      alphabet[alpha]!.padEnd(alpha + 2, " ")! + alphabet[alpha]!,
      ...facets.toReversed(),
    ];
  }

  const alpha = alphabet.findIndex((d) => d == letter);

  const width = alpha + alpha + 1;
  const middleIdx = Math.floor(width / 2);
  const row = "".padEnd(width, " ");
  return Array.from({ length: width }).map((_, y) =>
    row
      .split("")
      .map((_, x) => (x == y ? letter : " "))
      .join("")
  );
};
