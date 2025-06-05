import { expect } from "chai";

import { chunkArray, zip } from "../lib/arrays.ts";

describe("arrays.ts", () => {
  describe("chunkArray", () => {
    it("12-length array with chunk size 4 => 3x4-element array output", () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const expected = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ];
      expect(chunkArray(testArray, 4)).to.deep.equal(expected);
    });
    it("11-length array with chunk size 4 => 2x4-element + 1x3-element output", () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const expected = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11],
      ];
      expect(chunkArray(testArray, 4)).to.deep.equal(expected);
    });
    it("13-length array with chunk size 4 => 3x4-element + 1x1-element output", () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13]];
      expect(chunkArray(testArray, 4)).to.deep.equal(expected);
    });
    it("empty input array => empty output array", () => {
      expect(chunkArray([], 4)).to.deep.equal([]);
    });
    it("array shorter/equal to chunk size => one output array", () => {
      expect(chunkArray([1, 2, 3, 4], 4)).to.deep.equal([[1, 2, 3, 4]]);
    });
  });

  describe("zip", () => {
    it("5-length + 5-length => 5-length", () => {
      const array1 = [1, 2, 3, 4, 5];
      const array2 = ["a", "b", "c", "d", "e"];
      const expected = [
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
        [5, "e"],
      ];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
    it("5-length + 4-length => 4-length", () => {
      const array1 = [1, 2, 3, 4, 5];
      const array2 = ["a", "b", "c", "d"];
      const expected = [
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
      ];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
    it("4-length + 5-length => 4-length", () => {
      const array1 = [1, 2, 3, 4];
      const array2 = ["a", "b", "c", "d", "e"];
      const expected = [
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
      ];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
    it("5-length + 6-length => 5-length", () => {
      const array1 = [1, 2, 3, 4, 5];
      const array2 = ["a", "b", "c", "d", "e", "f"];
      const expected = [
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
        [5, "e"],
      ];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
    it("6-length + 5-length => 5-length", () => {
      const array1 = [1, 2, 3, 4, 5, 6];
      const array2 = ["a", "b", "c", "d", "e"];
      const expected = [
        [1, "a"],
        [2, "b"],
        [3, "c"],
        [4, "d"],
        [5, "e"],
      ];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
    it("0-length + 5-length => 0-length", () => {
      const array1: number[] = [];
      const array2 = ["a", "b", "c", "d", "e"];
      const expected: [number, string][] = [];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
    it("5-length + 0-length => 0-length", () => {
      const array1 = [1, 2, 3, 4, 5];
      const array2: string[] = [];
      const expected: [number, string][] = [];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
    it("0-length + 0-length => 0-length", () => {
      const array1: number[] = [];
      const array2: string[] = [];
      const expected: [number, string][] = [];
      expect(zip(array1, array2)).to.deep.equal(expected);
    });
  });
});
