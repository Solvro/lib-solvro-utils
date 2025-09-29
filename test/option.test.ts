import {
  assertDefined,
  assertNotNull,
  nullableMap,
  optionMap,
} from "../lib/option.ts";

describe("option.ts", () => {
  describe("optionMap", () => {
    it("should call function with value if value is not undefined", () => {
      const fn = chai.spy((v: number) => v + 1);

      expect(optionMap(1, fn)).to.be.equal(2);
      expect(fn).to.have.been.called.exactly(1);
    });

    it("should not call function if value is undefined", () => {
      const fn = chai.spy((v: number) => v + 1);

      expect(optionMap(undefined, fn)).to.equal(undefined);
      expect(fn).to.not.have.been.called();
    });

    it("should call function if value is null", () => {
      const fn = chai.spy((v: unknown) => v === null);

      expect(optionMap(null, fn)).to.equal(true);
      expect(fn).to.have.been.called.exactly(1);
    });
  });

  describe("nullableMap", () => {
    it("should call function with value if value is not null", () => {
      const fn = chai.spy((v: number) => v + 1);

      expect(nullableMap(1, fn)).to.be.equal(2);
      expect(fn).to.have.been.called.exactly(1);
    });

    it("should not call function if value is null", () => {
      const fn = chai.spy((v: number) => v + 1);

      expect(nullableMap(null, fn)).to.equal(null);
      expect(fn).to.not.have.been.called();
    });

    it("should call function if value is undefined", () => {
      const fn = chai.spy((v: unknown) => v === undefined);

      expect(nullableMap(undefined, fn)).to.equal(true);
      expect(fn).to.have.been.called.exactly(1);
    });
  });

  describe("assertDefined", () => {
    it("should not throw if value is not undefined", () => {
      expect(assertDefined(1)).to.equal(1);
    });

    it("should not throw if value is null", () => {
      expect(assertDefined(null)).to.equal(null);
    });

    it("should throw if value is undefined", () => {
      expect(() => {
        assertDefined(undefined);
      }).to.throw("Expected value to be defined");
    });

    it("should use custom string", () => {
      expect(() => {
        assertDefined(undefined, "special thing");
      }).to.throw("Expected special thing to be defined");
    });
  });

  describe("assertNotNull", () => {
    it("should not throw if value is not undefined", () => {
      expect(assertNotNull(1)).to.equal(1);
    });

    it("should not throw if value is undefined", () => {
      expect(assertNotNull(undefined)).to.equal(undefined);
    });

    it("should throw if value is null", () => {
      expect(() => {
        assertNotNull(null);
      }).to.throw("Expected value to not be null");
    });

    it("should use custom string", () => {
      expect(() => {
        assertNotNull(null, "special thing");
      }).to.throw("Expected special thing to not be null");
    });
  });
});
