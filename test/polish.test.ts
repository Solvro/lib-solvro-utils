// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { declineNumeric } from "../lib/polish.ts";

describe("polish.ts", () => {
  describe("declineNumeric", () => {
    it("should handle normal cases", () => {
      expect(declineNumeric(0, "kategoria", "kategorie", "kategorii")).to.equal(
        "0 kategorii",
      );
      expect(declineNumeric(1, "kategoria", "kategorie", "kategorii")).to.equal(
        "1 kategoria",
      );
      expect(declineNumeric(2, "kategoria", "kategorie", "kategorii")).to.equal(
        "2 kategorie",
      );
      expect(declineNumeric(5, "kategoria", "kategorie", "kategorii")).to.equal(
        "5 kategorii",
      );

      expect(declineNumeric(0, "opcja", "opcje", "opcji")).to.equal("0 opcji");
      expect(declineNumeric(1, "opcja", "opcje", "opcji")).to.equal("1 opcja");
      expect(declineNumeric(2, "opcja", "opcje", "opcji")).to.equal("2 opcje");
      expect(declineNumeric(3, "opcja", "opcje", "opcji")).to.equal("3 opcje");
      expect(declineNumeric(4, "opcja", "opcje", "opcji")).to.equal("4 opcje");
      expect(declineNumeric(5, "opcja", "opcje", "opcji")).to.equal("5 opcji");
      expect(declineNumeric(11, "opcja", "opcje", "opcji")).to.equal(
        "11 opcji",
      );
      expect(declineNumeric(15, "opcja", "opcje", "opcji")).to.equal(
        "15 opcji",
      );
      expect(declineNumeric(21, "opcja", "opcje", "opcji")).to.equal(
        "21 opcji",
      );
      expect(declineNumeric(22, "opcja", "opcje", "opcji")).to.equal(
        "22 opcje",
      );
    });

    it("should handle exception cases", () => {
      expect(
        declineNumeric(12, "kategoria", "kategorie", "kategorii"),
      ).to.equal("12 kategorii");
      expect(
        declineNumeric(22, "kategoria", "kategorie", "kategorii"),
      ).to.equal("22 kategorie");
      expect(
        declineNumeric(113, "kategoria", "kategorie", "kategorii"),
      ).to.equal("113 kategorii");
      expect(
        declineNumeric(123, "kategoria", "kategorie", "kategorii"),
      ).to.equal("123 kategorie");

      expect(declineNumeric(12, "opcja", "opcje", "opcji")).to.equal(
        "12 opcji",
      );
      expect(declineNumeric(13, "opcja", "opcje", "opcji")).to.equal(
        "13 opcji",
      );
      expect(declineNumeric(14, "opcja", "opcje", "opcji")).to.equal(
        "14 opcji",
      );
    });

    it("should work with the JSDoc apple example", () => {
      expect(declineNumeric(1, "jabłko", "jabłka", "jabłek")).to.equal(
        "1 jabłko",
      );
      expect(declineNumeric(2, "jabłko", "jabłka", "jabłek")).to.equal(
        "2 jabłka",
      );
      expect(declineNumeric(5, "jabłko", "jabłka", "jabłek")).to.equal(
        "5 jabłek",
      );
    });
  });
});
