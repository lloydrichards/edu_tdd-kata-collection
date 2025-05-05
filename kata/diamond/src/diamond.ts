export const prettyDiamond = (letter: string) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const alpha = alphabet.findIndex((d) => d == letter.toUpperCase());

  const width = alpha + alpha + 1;
  const middleIdx = Math.floor(width / 2);
  const row = "".padEnd(width, " ");
  const result = Array.from({ length: width }).map((_, y) =>
    row
      .split("")
      .map((_, x) => {
        if (x == middleIdx && y == 0) return "A";
        if (x == middleIdx && y == width - 1) return "A";

        if (x == width - y - middleIdx - 1) return alphabet[y];
        if (x == width + y - middleIdx - 1) return alphabet[y];

        if (x == width - y + middleIdx - 1)
          return alphabet[middleIdx - (y % middleIdx)];
        if (x == y - middleIdx) return alphabet[middleIdx - (y % middleIdx)];

        if (y == middleIdx && x == 0) return letter;
        if (y == middleIdx && x == width - 1) return letter;
        return " ";
      })
      .join("")
  );

  return result;
};
