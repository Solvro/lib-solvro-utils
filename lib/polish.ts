// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * An object representing a noun prepared for declension based on its count.
 *
 * Contains strings for the 3 possible forms of the noun,
 * and a method to pick the right form based on the count.
 *
 * @param singular - The singular form of the noun (used for 1).
 * @param paucal - The paucal form of the noun (used for 2, 3, 4).
 * @param plural - The plural form of the noun (used for 0, 5 and above).
 *
 * @example
 * const apple = new QuantitativeNoun('jabłko', 'jabłka', 'jabłek');
 * apple.decline(1) // '1 jabłko'
 * apple.decline(2) // '2 jabłka'
 * apple.decline(5) // '5 jabłek'
 * apple.singluar   // 'jabłko'
 * apple.paucal     // 'jabłka'
 * apple.plural     // 'jabłek'
 */
export class QuantitativeNoun {
  /**
   * The singular form of the noun (used for 1).
   */
  public readonly singular: string;
  /**
   * The paucal form of the noun (used for 2, 3, 4).
   */
  public readonly paucal: string;
  /**
   * The plural form of the noun (used for 0, 5 and above).
   */
  public readonly plural: string;

  public constructor(singular: string, paucal: string, plural: string) {
    this.singular = singular;
    this.paucal = paucal;
    this.plural = plural;
  }

  /**
   * Declines a quantitative noun based on its count using manually-provided grammatical forms.
   * @param count - The numeric count.
   * @returns The declined noun with the count as a space-separated string.
   * @example
   * const apple = new QuantitativeNoun('jabłko', 'jabłka', 'jabłek');
   * apple.decline(1) // '1 jabłko'
   * apple.decline(2) // '2 jabłka'
   * apple.decline(5) // '5 jabłek'
   */
  public decline(count: number): string {
    if (count === 1) {
      return `${count} ${this.singular}`;
    }
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
      // Exception for numbers ending with 12, 13 and 14, which always use the plural-many form
      return `${count} ${this.plural}`;
    }
    const lastDigit = count % 10;
    const isMany = lastDigit <= 1 || lastDigit >= 5;
    return `${count} ${isMany ? this.plural : this.paucal}`;
  }
}
