import { Semaphore } from "../lib/semaphore.ts";

describe("semaphore.ts", () => {
  // a semaphore class with public acquire/release methods for testing
  class OpenSemaphore extends Semaphore {
    public acquire(): Promise<void> {
      return super.acquire();
    }
    public release(): void {
      super.release();
    }
  }

  it("invalid capacity", () => {
    expect(() => new OpenSemaphore(0)).to.throw();
    expect(() => new OpenSemaphore(-1)).to.throw();
    expect(() => new OpenSemaphore(-2137)).to.throw();
  });

  it("static capacity", async () => {
    const alwaysResolved = Promise.resolve("not resolved");
    const semaphore = new OpenSemaphore(2);
    expect(semaphore.capacity).to.equal(2);
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 1
    await expect(
      Promise.race([semaphore.acquire(), alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(1);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 2
    await expect(
      Promise.race([semaphore.acquire(), alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 3 (over capacity)
    const acquirePromise = semaphore.acquire();
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal("not resolved");
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(1);

    // release 1, task 3 gets let in
    semaphore.release();
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(0);

    // release 2
    semaphore.release();
    expect(semaphore.currentTasks).to.equal(1);
    expect(semaphore.waitingTasks).to.equal(0);

    // release 3
    semaphore.release();
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);

    // release with no tasks running
    expect(() => semaphore.release()).to.throw();
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);
  });

  it("capacity increase", async () => {
    const alwaysResolved = Promise.resolve("not resolved");
    const semaphore = new OpenSemaphore(2);
    expect(semaphore.capacity).to.equal(2);
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 1
    await expect(
      Promise.race([semaphore.acquire(), alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(1);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 2
    await expect(
      Promise.race([semaphore.acquire(), alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 3 (over capacity)
    const acquirePromise = semaphore.acquire();
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal("not resolved");
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(1);

    // increase capacity
    semaphore.capacity = 4;
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(3);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 4
    await expect(
      Promise.race([semaphore.acquire(), alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(4);
    expect(semaphore.waitingTasks).to.equal(0);

    // release 1
    semaphore.release();
    expect(semaphore.currentTasks).to.equal(3);
    expect(semaphore.waitingTasks).to.equal(0);

    // release 2
    semaphore.release();
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(0);

    // release 3
    semaphore.release();
    expect(semaphore.currentTasks).to.equal(1);
    expect(semaphore.waitingTasks).to.equal(0);

    // release 4
    semaphore.release();
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);

    // release with no tasks running
    expect(() => semaphore.release()).to.throw();
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);
  });

  it("capacity decrease", async () => {
    const alwaysResolved = Promise.resolve("not resolved");
    const semaphore = new OpenSemaphore(2);
    expect(semaphore.capacity).to.equal(2);
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 1
    await expect(
      Promise.race([semaphore.acquire(), alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(1);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 2
    await expect(
      Promise.race([semaphore.acquire(), alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(0);

    // task 3 (over capacity)
    const acquirePromise = semaphore.acquire();
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal("not resolved");
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(1);

    // decrease capacity
    semaphore.capacity = 1;
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal("not resolved");
    expect(semaphore.currentTasks).to.equal(2);
    expect(semaphore.waitingTasks).to.equal(1);

    // release 1, task 3 still waiting
    semaphore.release();
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal("not resolved");
    expect(semaphore.currentTasks).to.equal(1);
    expect(semaphore.waitingTasks).to.equal(1);

    // release 2, task 3 let in
    semaphore.release();
    await expect(
      Promise.race([acquirePromise, alwaysResolved]),
    ).to.eventually.equal(undefined);
    expect(semaphore.currentTasks).to.equal(1);
    expect(semaphore.waitingTasks).to.equal(0);

    // release 3
    semaphore.release();
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);

    // release with no tasks running
    expect(() => semaphore.release()).to.throw();
    expect(semaphore.currentTasks).to.equal(0);
    expect(semaphore.waitingTasks).to.equal(0);
  });
});
