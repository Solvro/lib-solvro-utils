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
 * Asserts that the provided optional value is not `undefined`
 *
 * Basically Rust's [Option::unwrap](https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap) ported to JS.
 * If the input value is undefined, throws an error.
 * Otherwise, returns the value unchanged.
 *
 * @param value the input value
 * @param [valueName="value"] a description of the value, used in the thrown error
 * @returns the input value unchanged
 * @throws TypeError "Expected ${valueName} to be defined" if the value is undefined
 */
export function assertDefined<T>(value: T | undefined, valueName: string = "value"): T {
  if (value === undefined) {
    throw new TypeError(`Expected ${valueName} to be defined`);
  }
  return value;
}

/**
 * Asserts that the provided nullable value is not `null`
 *
 * Basically Rust's [Option::unwrap](https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap) ported to JS.
 * This one's for nullables, because apparently JS chose to have 2 "null" values instead of the correct number - 0.
 * If the input value is null, immediately retuns null.
 * If the input value is undefined, throws an error.
 * Otherwise, returns the value unchanged.
 *
 * @param value the input value
 * @param [valueName="value"] a description of the value, used in the thrown error
 * @returns the input value unchanged
 * @throws TypeError "Expected ${valueName} to not be null" if the value is null
 */
export function assertNotNull<T>(value: T | undefined, valueName: string = "value"): T {
  if (value === undefined) {
    throw new TypeError(`Expected ${valueName} to not be null`);
  }
  return value;
}
