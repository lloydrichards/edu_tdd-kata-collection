import { answer, prettyDiamond } from "./hiker";
import { expect, describe, it } from "bun:test";

describe("answer", () => {
  it("to life the universe and everything", () => {
    expect(answer()).toEqual(42);
  });
});

// - [ ] When A is given, return only A
// - [ ] When B is given, return middle as `B B`
// - [ ] When B is given, return head and tail as ` A `'s
// - [ ] When C is given, return middle as `C  C`
// - [ ] When C is given, return two ` B B `'s
// - [ ] When C is given, return head and tail as `  A  `

describe("only A", () => {
  it("return only A", () => {
    expect(prettyDiamond("A")).toEqual(`A`);
  });
});
