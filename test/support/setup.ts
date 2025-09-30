// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import spies from "chai-spies";

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var chai: Chai.ChaiStatic;
  // eslint-disable-next-line vars-on-top, no-var
  var expect: Chai.ExpectStatic;
}

globalThis.chai = use(chaiAsPromised);
globalThis.chai = chai.use(spies);
globalThis.expect = chai.expect;
