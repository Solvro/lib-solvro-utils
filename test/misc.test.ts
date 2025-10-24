// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { isPlainObject } from "../lib/misc.ts";

describe("misc.ts", () => {
  describe("isPlainObject", () => {
    class Test {}
    const TESTS: { value: unknown; name: string; result: boolean }[] = [
      {
        value: {},
        name: "empty plain object",
        result: true,
      },
      {
        value: { elo: "żelo" },
        name: "populated plain object",
        result: true,
      },
      {
        value: null,
        name: "null",
        result: false,
      },
      {
        value: undefined,
        name: "undefined",
        result: false,
      },
      {
        value: 1,
        name: "integer",
        result: false,
      },
      {
        value: 1.1,
        name: "float",
        result: false,
      },
      {
        value: NaN,
        name: "NaN",
        result: false,
      },
      {
        value: Infinity,
        name: "infinity",
        result: false,
      },
      {
        value: "elo żelo",
        name: "string",
        result: false,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        value: () => {},
        name: "arrow function",
        result: false,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        value() {},
        name: "method",
        result: false,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function, object-shorthand
        value: function () {},
        name: "classic function",
        result: false,
      },
      {
        value: true,
        name: "boolean (true)",
        result: false,
      },
      {
        value: false,
        name: "boolean (false)",
        result: false,
      },
      {
        value: [],
        name: "empty array",
        result: false,
      },
      {
        value: ["elo żelo"],
        name: "populated array",
        result: false,
      },
      {
        value: Test,
        name: "class",
        result: false,
      },
      {
        value: new Test(),
        name: "class instance",
        result: false,
      },
    ];

    for (const test of TESTS) {
      it(`${test.name} -> ${test.result}`, () => {
        expect(isPlainObject(test.value)).to.equal(test.result);
      });
    }
  });
});
