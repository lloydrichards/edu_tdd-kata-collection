import { describe, expect, it } from "bun:test";
import { prettyDiamond } from "./diamond";

// - [x] When A is given, return only A
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
