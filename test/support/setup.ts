// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { AssertionError } from "assertion-error";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import spies from "chai-spies";
import path from "node:path";
import { create as createTSCompiler } from "ts-node-maintained";

const tsCompiler = createTSCompiler();

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var chai: Chai.ChaiStatic;
  // eslint-disable-next-line vars-on-top, no-var
  var expect: Chai.ExpectStatic;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Chai {
    interface Assertion {
      compile(): Assertion;
    }
  }
}

globalThis.chai = use(chaiAsPromised);
globalThis.chai = chai.use((chai, utils) => {
  chai.Assertion.addMethod("compile", function () {
    utils.expectTypes(this, ["string"]);
    const negate = utils.flag(this, "negate") as unknown;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const ssfi = utils.flag(this, "ssfi") as Function;

    // get the path of the caller
    const e = new Error();
    Error.captureStackTrace(e, ssfi);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let callerPath = /\((.+):\d+:\d+\)/.exec(e.stack!.split("\n")[1]!)![1]!;
    if (callerPath.includes("://")) {
      callerPath = new URL(callerPath).pathname;
    }
    const snippetFileName = path.join(
      path.dirname(callerPath),
      "ts_snippet.ts",
    );

    if (negate === true) {
      try {
        tsCompiler.compile(this._obj as string, snippetFileName);
        throw new AssertionError(
          "Expected TS code snippet to fail compilation",
          undefined,
          ssfi,
        );
      } catch {}
    } else {
      tsCompiler.compile(this._obj as string, snippetFileName);
    }
  });
});
globalThis.chai = chai.use(spies);
globalThis.expect = chai.expect;
