// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { ExtendedMap, extendGlobally, extendMap } from "../lib/map.ts";

describe("map.ts", () => {
  describe("ExtendedMap", () => {
    it("basic map functionality", () => {
      const map = new ExtendedMap<string, number>();
      expect(map.get("a")).to.equal(undefined);
      expect(map.get("b")).to.equal(undefined);

      map.set("a", 1);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(undefined);

      map.set("a", 2);
      expect(map.get("a")).to.equal(2);
      expect(map.get("b")).to.equal(undefined);

      map.set("b", 3);
      expect(map.get("a")).to.equal(2);
      expect(map.get("b")).to.equal(3);

      map.set("b", 4);
      expect(map.get("a")).to.equal(2);
      expect(map.get("b")).to.equal(4);
    });

    it("getOrInsert", () => {
      const map = new ExtendedMap<string, number>();
      expect(map.get("a")).to.equal(undefined);
      expect(map.get("b")).to.equal(undefined);

      expect(map.getOrInsert("a", 1)).to.equal(1);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(undefined);

      expect(map.getOrInsert("a", 2)).to.equal(1);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(undefined);

      expect(map.getOrInsert("b", 3)).to.equal(3);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(3);

      expect(map.getOrInsert("b", 4)).to.equal(3);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(3);
    });

    it("getOrInsertWith", () => {
      let next_num = 1;
      const generateDefault = chai.spy(() => next_num++);
      const map = new ExtendedMap<string, number>();
      expect(map.get("a")).to.equal(undefined);
      expect(map.get("b")).to.equal(undefined);

      // insert a new key - call the spy
      expect(map.getOrInsertWith("a", generateDefault)).to.equal(1);
      expect(generateDefault).to.have.been.called.exactly(1);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(undefined);

      // insert an existing key - spy not called
      expect(map.getOrInsertWith("a", generateDefault)).to.equal(1);
      expect(generateDefault).to.have.been.called.exactly(1);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(undefined);

      // insert a new key - call the spy
      expect(map.getOrInsertWith("b", generateDefault)).to.equal(2);
      expect(generateDefault).to.have.been.called.exactly(2);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(2);

      // insert an existing key - spy not called
      expect(map.getOrInsertWith("b", generateDefault)).to.equal(2);
      expect(generateDefault).to.have.been.called.exactly(2);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(2);
    });

    it("getOrInsertWithAsync", async () => {
      let next_num = 1;
      const generateDefault = chai.spy(async () => next_num++);
      const map = new ExtendedMap<string, number>();
      expect(map.get("a")).to.equal(undefined);
      expect(map.get("b")).to.equal(undefined);

      // insert a new key - call the spy
      await expect(
        map.getOrInsertWithAsync("a", generateDefault),
      ).to.eventually.equal(1);
      expect(generateDefault).to.have.been.called.exactly(1);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(undefined);

      // insert an existing key - spy not called
      await expect(
        map.getOrInsertWithAsync("a", generateDefault),
      ).to.eventually.equal(1);
      expect(generateDefault).to.have.been.called.exactly(1);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(undefined);

      // insert a new key - call the spy
      await expect(
        map.getOrInsertWithAsync("b", generateDefault),
      ).to.eventually.equal(2);
      expect(generateDefault).to.have.been.called.exactly(2);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(2);

      // insert an existing key - spy not called
      await expect(
        map.getOrInsertWithAsync("b", generateDefault),
      ).to.eventually.equal(2);
      expect(generateDefault).to.have.been.called.exactly(2);
      expect(map.get("a")).to.equal(1);
      expect(map.get("b")).to.equal(2);
    });
  });

  describe("extendMap", () => {
    const extendTypeError = "Expected the existing map to be a vanilla map!";

    it("extends a vanilla map", () => {
      const map = new Map();
      map.set("a", 1);
      expect(map).to.not.be.an.instanceof(ExtendedMap);
      expect(map.get("a")).to.equal(1);

      extendMap(map);
      expect(map).to.be.an.instanceof(ExtendedMap);
      expect(map).to.have.a.property("getOrInsert");
      expect(map).to.have.a.property("getOrInsertWith");
      expect(map).to.have.a.property("getOrInsertWithAsync");
      expect(map.get("a")).to.equal(1);
    });

    it("noops on an ExtendedMap", () => {
      const map = new ExtendedMap();
      map.set("a", 1);
      expect(map).to.be.an.instanceof(ExtendedMap);
      expect(map.get("a")).to.equal(1);

      extendMap(map);
      expect(map).to.be.an.instanceof(ExtendedMap);
      expect(map.get("a")).to.equal(1);
    });

    it("throws on other object types", () => {
      // @ts-expect-error - wrong type, duh
      expect(() => extendMap({})).to.throw(extendTypeError);

      // @ts-expect-error - wrong type, duh
      expect(() => extendMap(1)).to.throw(extendTypeError);

      // @ts-expect-error - wrong type, duh
      expect(() => extendMap("")).to.throw(extendTypeError);

      class EpicMap<K, V> extends Map<K, V> {}
      // not caught by TS
      expect(() => extendMap(new EpicMap())).to.throw(extendTypeError);
    });
  });

  describe("extendGlobally", () => {
    let mapPrototypeBackup: Record<string, PropertyDescriptor> = {};

    before(() => {
      // back up the Map prototype
      mapPrototypeBackup = Object.getOwnPropertyDescriptors(Map.prototype);
    });

    after(() => {
      // restore the Map prototype
      for (const key of Object.keys(
        Object.getOwnPropertyDescriptors(Map.prototype),
      )) {
        // @ts-expect-error - ts not very smart
        delete Map.prototype[key];
      }
      Object.defineProperties(globalThis.Map.prototype, mapPrototypeBackup);
    });

    it("extends the Map prototype", () => {
      const map = new Map();
      map.set("a", 1);
      expect(map).to.not.be.an.instanceof(ExtendedMap);
      expect(map).to.not.have.a.property("getOrInsert");
      expect(map).to.not.have.a.property("getOrInsertWith");
      expect(map).to.not.have.a.property("getOrInsertWithAsync");
      expect(Map.prototype).to.not.have.a.property("getOrInsert");
      expect(Map.prototype).to.not.have.a.property("getOrInsertWith");
      expect(Map.prototype).to.not.have.a.property("getOrInsertWithAsync");
      expect(map.get("a")).to.equal(1);

      extendGlobally();

      expect(map).to.not.be.an.instanceof(ExtendedMap);
      expect(map).to.have.a.property("getOrInsert");
      expect(map).to.have.a.property("getOrInsertWith");
      expect(map).to.have.a.property("getOrInsertWithAsync");
      expect(Map.prototype).to.have.own.property("getOrInsert");
      expect(Map.prototype).to.have.own.property("getOrInsertWith");
      expect(Map.prototype).to.have.own.property("getOrInsertWithAsync");
      expect(map.get("a")).to.equal(1);
    });
  });
});
