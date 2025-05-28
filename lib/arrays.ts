// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Chunks the input array into smaller arrays, at most chunkSize in length each.
 *
 * Inspired by rust's `slice::chunks()`: https://doc.rust-lang.org/std/primitive.slice.html#method.chunks
 * @param array input array
 * @param chunkSize max length of arrays, must be a positive integer
 * @returns An array of array chunks of the requested size
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result = [];
  const input = Array.from(array);
  while (input.length > 0) {
    result.push(input.splice(0, chunkSize));
  }
  return result;
}

/**
 * Zips up two arrays.
 *
 * Inspired by python's `zip` function: https://docs.python.org/3/library/functions.html#zip
 * This allows you to match the items of one array to items of another array by indexes.
 * The resulting array will have the length of the shortest input array.
 *
 * @param a1 input array 1
 * @param a2 input array 2
 * @returns array of tuples of values from both input arrays
 */
export function zip<T1, T2>(a1: T1[], a2: T2[]): [T1, T2][] {
  const array1 = Array.from(a1);
  const array2 = Array.from(a2);
  const result: [T1, T2][] = [];
  while (array1.length > 0 && array2.length > 0) {
    const el1 = array1.shift() as T1;
    const el2 = array2.shift() as T2;
    result.push([el1, el2]);
  }
  return result;
}
