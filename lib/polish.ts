// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Prepares a quantitative noun for declension based on its count.
 * @param singular - The singular form of the noun (used for 1).
 * @param paucal - The paucal form of the noun (used for 2, 3, 4).
 * @param plural - The plural form of the noun (used for 0, 5 and above).
 * @returns an object containing a function used to decline the noun numerically.
 * @example const declineApple = quantitativeNoun('jabłko', 'jabłka', 'jabłek');
 * @example declineApple.declineNumeric(1) // '1 jabłko'
 * @example declineApple.declineNumeric(2) // '2 jabłka'
 * @example declineApple.declineNumeric(5) // '5 jabłek'
 */
export function quantitativeNoun(
  singular: string,
  paucal: string,
  plural: string,
) {
  /**
   * Declines a quantitative noun based on its count using manually-provided grammatical forms.
   * @param count - The numeric count.
   * @returns The declined noun with the count as a space-separated string.
   * @example quantitativeNoun('jabłko', 'jabłka', 'jabłek').declineNumeric(1) // '1 jabłko'
   * @example quantitativeNoun('jabłko', 'jabłka', 'jabłek').declineNumeric(2) // '2 jabłka'
   * @example quantitativeNoun('jabłko', 'jabłka', 'jabłek').declineNumeric(5) // '5 jabłek'
   */
  function declineNumeric(count: number): string {
    const countString = count.toString();
    if (count === 1) {
      return `${countString} ${singular}`;
    }
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
      // Exception for numbers ending with 12, 13 and 14, which always use the plural-many form
      return `${countString} ${plural}`;
    }
    const lastDigit = count % 10;
    const isMany = lastDigit <= 1 || lastDigit >= 5;
    return `${countString} ${isMany ? plural : paucal}`;
  }

  return { declineNumeric };
}
