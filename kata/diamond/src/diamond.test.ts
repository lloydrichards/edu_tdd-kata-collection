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
    expect(prettyDiamond("A")).toEqual(`A`);
  });
});

describe("B", () => {
  it("middle as `B B`", () => {
    expect(prettyDiamond("B")).toInclude(`B B`);
  });
  it("return start and end with ` A `'s", () => {
    expect(prettyDiamond("B")).toStartWith(` A `);
    expect(prettyDiamond("B")).toEndWith(` A `);
  });
  it("should be a diamond", () => {
    expect(prettyDiamond("B")).toBe(
      ` A 
B B
 A `
    );
  });
});

describe("C", () => {
  it("middle as `C   C`", () => {
    expect(prettyDiamond("C")).toInclude(`C   C`);
  });
  it("return start and end with ` A `'s", () => {
    expect(prettyDiamond("C")).toStartWith(`  A  `);
    expect(prettyDiamond("C")).toEndWith(`  A  `);
  });
  it("should be a diamond", () => {
    expect(prettyDiamond("C")).toBe(
      `  A  
 B B 
 C   C
 B B 
  A  `
    );
  });
});
