export const prettyDiamond = (letter: string) => {
  const alphabet = ["A", "B", "C", "D", "E"];
  if (letter === "A") {
    const indexOfAlphabet = alphabet.findIndex((d) => d == "A");
    return [alphabet[indexOfAlphabet]];
  }
  if (letter === "B") {
    const alpha = alphabet.findIndex((d) => d == "B");
    const facets = [
      alphabet[alpha - 1]!.padEnd(alpha + 1, " ").padStart(alpha + 2, " "),
    ];
    return [
      ...facets,
      alphabet[alpha]!.padEnd(alpha + 1, " ")! + alphabet[alpha]!,
      ...facets.toReversed(),
    ];
  }
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
  return Array.from({ length: width }).map(() => row);
};
