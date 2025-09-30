// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Transforms an optional value using the given function.
 *
 * Basically Rust's [Option::map](https://doc.rust-lang.org/std/option/enum.Option.html#method.map) ported to JS.
 * If the input value is undefined, immediately retuns undefined.
 * Otherwise, returns the result of calling the given function with the input value.
 * The given function will never be called with an undefined value.
 *
 * @param input the input value
 * @param f the transform function
 * @returns undefined if input is undefined, otherwise the return value of f
 */
export function optionMap<T, R>(
  input: T | undefined,
  f: (input: T) => R,
): R | undefined {
  return input === undefined ? undefined : f(input);
}

/**
 * Transforms a nullable value using the given function.
 *
 * Basically Rust's [Option::map](https://doc.rust-lang.org/std/option/enum.Option.html#method.map) ported to JS.
 * This one's for nullables, because apparently JS chose to have 2 "null" values instead of the correct number - 0.
 * If the input value is null, immediately retuns null.
 * Otherwise, returns the result of calling the given function with the input value.
 * The given function will never be called with a null value.
 *
 * @param input the input value
 * @param f the transform function
 * @returns null if input is null, otherwise the return value of f
 */
export function nullableMap<T, R>(
  input: T | null,
  f: (input: T) => R,
): R | null {
  return input === null ? null : f(input);
}

/**
 * Transforms a nullable or optional value using the given function.
 *
 * Basically Rust's [Option::map](https://doc.rust-lang.org/std/option/enum.Option.html#method.map) ported to JS.
 * This one's for both undefined and null... because JS.
 * If the input value is null, immediately retuns null.
 * If the input value is undefined, immediately retuns undefined.
 * Otherwise, returns the result of calling the given function with the input value.
 * The given function will never be called with a null or undefined value.
 *
 * @param input the input value
 * @param f the transform function
 * @returns null or undefined if input is null or undefined, otherwise the return value of f
 */
export function nullishMap<T, R>(
  input: T | null | undefined,
  f: (input: T) => R,
): R | null | undefined {
  return input === null ? null : input === undefined ? undefined : f(input);
}

/**
 * Asserts that the provided optional value is not `undefined`
 *
 * If the input value is undefined, throws an error.
 *
 * @param value the input value
 * @param valueName a description of the value, used in the thrown error
 * @throws TypeError "Expected ${valueName} to be defined" if the value is undefined
 */
export function assertDefined<T>(
  value: T | undefined,
  valueName = "value",
): asserts value is T {
  if (value === undefined) {
    throw new TypeError(`Expected ${valueName} to be defined`);
  }
}

/**
 * Asserts that the provided nullable value is not `null`
 *
 * This one's for nullables, because apparently JS chose to have 2 "null" values instead of the correct number - 0.
 * If the input value is null, throws an error.
 *
 * @param value the input value
 * @param valueName a description of the value, used in the thrown error
 * @throws TypeError "Expected ${valueName} to not be null" if the value is null
 */
export function assertNotNull<T>(
  value: T | null,
  valueName = "value",
): asserts value is T {
  if (value === null) {
    throw new TypeError(`Expected ${valueName} to not be null`);
  }
}

/**
 * Asserts that the provided nullable or optional value is not `null` or `undefined`
 *
 * This one's for both undefined and null... because JS.
 * If the input value is null or undefined, throws an error
 *
 * @param value the input value
 * @param valueName a description of the value, used in the thrown error
 * @throws TypeError "Expected ${valueName} to be defined/not be null" if the value is null or undefined
 */
export function assertNotNullish<T>(
  value: T | null,
  valueName = "value",
): asserts value is T {
  if (value === null) {
    throw new TypeError(`Expected ${valueName} to not be null`);
  }
  if (value === undefined) {
    throw new TypeError(`Expected ${valueName} to be defined`);
  }
}
