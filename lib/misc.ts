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
