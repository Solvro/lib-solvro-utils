// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { wait } from "../lib/promises.ts";
import { RequestBundler } from "../lib/request_bundler.ts";

describe("request_bundler.ts", function () {
  this.timeout(700);
  this.slow(450);

  it("should bundle concurrent requests with the same key", async () => {
    const handler = chai.spy(async () => {
      await wait(100);
      return 1;
    });

    const bundler = new RequestBundler();

    const p1 = bundler.run("key1", handler);
    const p2 = bundler.run("key1", handler);

    expect(handler).to.have.been.called.exactly(1);
    await expect(p1).to.eventually.equal(1);
    await expect(p2).to.eventually.equal(1);
  });

  it("should not bundle concurrent requests with different keys", async () => {
    const handler = chai.spy(async () => {
      await wait(100);
      return 1;
    });

    const bundler = new RequestBundler();

    const p1 = bundler.run("key1", handler);
    const p2 = bundler.run("key2", handler);

    expect(handler).to.have.been.called.exactly(2);
    await expect(p1).to.eventually.equal(1);
    await expect(p2).to.eventually.equal(1);
  });

  it("should use the first handler for concurrent requests", async () => {
    const handler1 = chai.spy(async () => {
      await wait(100);
      return 1;
    });
    const handler2 = chai.spy(async () => {
      await wait(100);
      return 2;
    });

    const bundler = new RequestBundler();

    const p1 = bundler.run("key1", handler1);
    const p2 = bundler.run("key1", handler2);

    expect(handler1).to.have.been.called.exactly(1);
    expect(handler2).to.not.have.been.called();
    await expect(p1).to.eventually.equal(1);
    await expect(p2).to.eventually.equal(1);
  });

  it("should forget about the request after it finishes", async () => {
    const handler = chai.spy(async () => {
      await wait(100);
      return 1;
    });

    const bundler = new RequestBundler();

    const p1 = bundler.run("key1", handler);
    await expect(p1).to.eventually.equal(1);

    const p2 = bundler.run("key1", handler);
    await expect(p2).to.eventually.equal(1);

    expect(handler).to.have.been.called.exactly(2);
  });

  it("should forget about the request if handler throws", async () => {
    const handler1 = chai.spy(async () => {
      await wait(100);
      throw new Error("elo żelo");
    });
    const handler2 = chai.spy(async () => {
      await wait(100);
      return 1;
    });

    const bundler = new RequestBundler();

    const p1 = bundler.run("key1", handler1);
    await expect(p1).to.be.rejectedWith("elo żelo");

    const p2 = bundler.run("key1", handler2);
    await expect(p2).to.eventually.equal(1);

    expect(handler1).to.have.been.called.exactly(1);
    expect(handler2).to.have.been.called.exactly(1);
  });
});
