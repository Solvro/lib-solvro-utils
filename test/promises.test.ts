import { wait } from "../lib/promises.ts";

describe("promises.ts", () => {
  describe("wait", function () {
    this.timeout(1000);
    this.slow(500);

    it("resolves after the given amount of time", async () => {
      const start = performance.now();
      await expect(wait(201)).to.eventually.equal(undefined);
      const elapsed = performance.now() - start;
      expect(elapsed).to.be.greaterThanOrEqual(200);
    });
  });
});
