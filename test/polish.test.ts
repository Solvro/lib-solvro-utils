// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { QuantitativeNoun } from "../lib/polish.ts";

describe("polish.ts", () => {
  describe("QuantitativeNoun", () => {
    describe(".decline", () => {
      it("should handle normal cases", () => {
        const category = new QuantitativeNoun(
          "kategoria",
          "kategorie",
          "kategorii",
        );
        expect(category.decline(0)).to.equal("0 kategorii");
        expect(category.decline(1)).to.equal("1 kategoria");
        expect(category.decline(2)).to.equal("2 kategorie");
        expect(category.decline(5)).to.equal("5 kategorii");

        const option = new QuantitativeNoun("opcja", "opcje", "opcji");
        expect(option.decline(0)).to.equal("0 opcji");
        expect(option.decline(1)).to.equal("1 opcja");
        expect(option.decline(2)).to.equal("2 opcje");
        expect(option.decline(3)).to.equal("3 opcje");
        expect(option.decline(4)).to.equal("4 opcje");
        expect(option.decline(5)).to.equal("5 opcji");
        expect(option.decline(11)).to.equal("11 opcji");
        expect(option.decline(15)).to.equal("15 opcji");
        expect(option.decline(21)).to.equal("21 opcji");
        expect(option.decline(22)).to.equal("22 opcje");
      });

      it("should handle exception cases", () => {
        const category = new QuantitativeNoun(
          "kategoria",
          "kategorie",
          "kategorii",
        );
        expect(category.decline(12)).to.equal("12 kategorii");
        expect(category.decline(22)).to.equal("22 kategorie");
        expect(category.decline(113)).to.equal("113 kategorii");
        expect(category.decline(123)).to.equal("123 kategorie");

        const option = new QuantitativeNoun("opcja", "opcje", "opcji");
        expect(option.decline(12)).to.equal("12 opcji");
        expect(option.decline(13)).to.equal("13 opcji");
        expect(option.decline(14)).to.equal("14 opcji");
      });
    });

    describe(".singular/.paucal/.plural", () => {
      it("configured strings should be accessible", () => {
        const category = new QuantitativeNoun(
          "kategoria",
          "kategorie",
          "kategorii",
        );
        expect(category.singular).to.equal("kategoria");
        expect(category.paucal).to.equal("kategorie");
        expect(category.plural).to.equal("kategorii");

        const option = new QuantitativeNoun("opcja", "opcje", "opcji");
        expect(option.singular).to.equal("opcja");
        expect(option.paucal).to.equal("opcje");
        expect(option.plural).to.equal("opcji");
      });

      it("modifying strings after creation should cause TS errors", function () {
        this.slow(2000);
        this.timeout(5000);

        expect(`
          import {QuantitativeNoun} from "../lib/polish.ts";

          const option = new QuantitativeNoun("opcja", "opcje", "opcji");
          option.singular = "kategoria";
        `).to.not.compile();

        expect(`
          import {QuantitativeNoun} from "../lib/polish.ts";

          const option = new QuantitativeNoun("opcja", "opcje", "opcji");
          option.paucal = "kategorie";
        `).to.not.compile();

        expect(`
          import {QuantitativeNoun} from "../lib/polish.ts";

          const option = new QuantitativeNoun("opcja", "opcje", "opcji");
          option.plural = "kategorii";
        `).to.not.compile();
      });
    });

    it("should work with the JSDoc apple example", () => {
      const apple = new QuantitativeNoun("jabłko", "jabłka", "jabłek");
      expect(apple.decline(1)).to.equal("1 jabłko");
      expect(apple.decline(2)).to.equal("2 jabłka");
      expect(apple.decline(5)).to.equal("5 jabłek");
      expect(apple.singular).to.equal("jabłko");
      expect(apple.paucal).to.equal("jabłka");
      expect(apple.plural).to.equal("jabłek");
    });
  });
});
