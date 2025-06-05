import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import spies from "chai-spies";

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var chai: Chai.ChaiStatic;
}

globalThis.chai = use(chaiAsPromised);
globalThis.chai = chai.use(spies);
