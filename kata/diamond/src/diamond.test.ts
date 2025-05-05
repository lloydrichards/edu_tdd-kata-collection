import { describe, expect, it } from "bun:test";
import { prettyDiamond } from "./diamond";

// - [x] When A is given, return only A
// - [x] When B is given, return middle as `B B`
// - [x] When B is given, return head and tail as ` A `'s
// - [ ] When C is given, return middle as `C  C`
// - [ ] When C is given, return two ` B B `'s
// - [ ] When C is given, return head and tail as `  A  `

describe("A", () => {
  it("return only A", () => {
    expect(prettyDiamond("A")).toEqual([`A`]);
  });
});

describe("B", () => {
  it("middle as `B B`", () => {
    expect(prettyDiamond("B").at(1)).toEqual(`B B`);
  });
  it("return start and end with ` A `'s", () => {
    expect(prettyDiamond("B").at(0)).toEqual(` A `);
    expect(prettyDiamond("B").at(-1)).toEqual(` A `);
  });
  it("should be a diamond", () => {
    expect(prettyDiamond("B")).toEqual([" A ", "B B", " A "]);
  });
});

describe("C", () => {
  it("middle as `C   C`", () => {
    expect(prettyDiamond("C")).toContain(`C   C`);
  });
  it("return start and end with ` A `'s", () => {
    expect(prettyDiamond("C").at(0)).toEqual(`  A  `);
    expect(prettyDiamond("C").at(-1)).toEndWith(`  A  `);
  });
  it("should be a diamond", () => {
    expect(prettyDiamond("C")).toEqual([
      "  A  ",
      " B B ",
      "C   C",
      " B B ",
      "  A  ",
    ]);
  });
});
describe("D", () => {
  it("should be a diamond", () => {
    expect(prettyDiamond("D")).toEqual([
      "   A   ",
      "  B B  ",
      " C   C ",
      "D     D",
      " C   C ",
      "  B B  ",
      "   A   ",
    ]);
  });
});
