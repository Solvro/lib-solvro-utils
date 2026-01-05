// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Checks whether the given value is a plain object.
 *
 * Passing in null, undefined, arrays or class instances will return false.
 * Only plain JS objects will return true.
 *
 * @param value the value to verify
 * @returns true if value is a plain object
 */
export function isPlainObject(value: unknown): value is object {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Utility function for ensuring that all possible cases of a switch statements were covered
 *
 * To use, call this function in the default case, passing in the value being switched on.
 * If this function is ever executed at runtime, an error will be thrown.
 *
 * @param value the value being switched on
 * @throws if ever executed at runtime
 */
export function assertExhaustive(value: never): never {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Unexpected value found at runtime: ${value}`);
}
