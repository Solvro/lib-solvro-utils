import fs from "node:fs";

import { parseICS } from "../lib/ics.ts";

describe("ics.ts", () => {
  it("should parse example file", () => {
    const icsFile = fs.readFileSync("test/files/ics/test.ics", {
      encoding: "utf8",
    });
    const expected = JSON.parse(
      fs.readFileSync("test/files/ics/test.json", { encoding: "utf8" }),
    ) as object;

    const parsed = parseICS(icsFile);

    expect(parsed).to.deep.equal(expected);
  });
});
