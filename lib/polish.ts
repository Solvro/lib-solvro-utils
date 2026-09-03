// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Declines a quantitative noun based on its count using manual forms.
 * @param count - The numeric count.
 * @param singular - The singular form of the noun (used for 1).
 * @param paucal - The paucal form of the noun (used for 2, 3, 4).
 * @param plural - The plural form of the noun (used for 0, 5 and above).
 * @returns The declined noun with the count as a space-separated string.
 * @example declineNumeric(1, 'jabłko', 'jabłka', 'jabłek') // '1 jabłko'
 * @example declineNumeric(2, 'jabłko', 'jabłka', 'jabłek') // '2 jabłka'
 * @example declineNumeric(5, 'jabłko', 'jabłka', 'jabłek') // '5 jabłek'
 */
export function declineNumeric(
  count: number,
  singular: string,
  paucal: string,
  plural: string,
): string;

export function declineNumeric(
  count: number,
  singular: string,
  paucal: string,
  plural: string,
): string {
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
