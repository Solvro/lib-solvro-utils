// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { quantitativeNoun } from "../lib/polish.ts";

describe("polish.ts", () => {
  describe("quantitativeNoun", () => {
    it("should handle normal cases", () => {
      const category = quantitativeNoun("kategoria", "kategorie", "kategorii");
      expect(category.declineNumeric(0)).to.equal("0 kategorii");
      expect(category.declineNumeric(1)).to.equal("1 kategoria");
      expect(category.declineNumeric(2)).to.equal("2 kategorie");
      expect(category.declineNumeric(5)).to.equal("5 kategorii");

      const option = quantitativeNoun("opcja", "opcje", "opcji");
      expect(option.declineNumeric(0)).to.equal("0 opcji");
      expect(option.declineNumeric(1)).to.equal("1 opcja");
      expect(option.declineNumeric(2)).to.equal("2 opcje");
      expect(option.declineNumeric(3)).to.equal("3 opcje");
      expect(option.declineNumeric(4)).to.equal("4 opcje");
      expect(option.declineNumeric(5)).to.equal("5 opcji");
      expect(option.declineNumeric(11)).to.equal("11 opcji");
      expect(option.declineNumeric(15)).to.equal("15 opcji");
      expect(option.declineNumeric(21)).to.equal("21 opcji");
      expect(option.declineNumeric(22)).to.equal("22 opcje");
    });

    it("should handle exception cases", () => {
      const category = quantitativeNoun("kategoria", "kategorie", "kategorii");
      expect(category.declineNumeric(12)).to.equal("12 kategorii");
      expect(category.declineNumeric(22)).to.equal("22 kategorie");
      expect(category.declineNumeric(113)).to.equal("113 kategorii");
      expect(category.declineNumeric(123)).to.equal("123 kategorie");

      const option = quantitativeNoun("opcja", "opcje", "opcji");
      expect(option.declineNumeric(12)).to.equal("12 opcji");
      expect(option.declineNumeric(13)).to.equal("13 opcji");
      expect(option.declineNumeric(14)).to.equal("14 opcji");
    });

    it("should work with the JSDoc apple example", () => {
      const apple = quantitativeNoun("jabłko", "jabłka", "jabłek");
      expect(apple.declineNumeric(1)).to.equal("1 jabłko");
      expect(apple.declineNumeric(2)).to.equal("2 jabłka");
      expect(apple.declineNumeric(5)).to.equal("5 jabłek");
    });
  });
});
