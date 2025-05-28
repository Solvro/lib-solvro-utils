// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * A simple async semaphore
 *
 * Useful for limiting the amount of concurrent tasks
 */
export class Semaphore {
  /**
   * The current semaphore capacity
   *
   * Safe to modify after creation
   */
  capacity: number;
  #currentTasks: number;
  #waitingTasks: (() => void)[];

  /**
   * Create a new async semaphore
   *
   * @param capacity the max amount of concurrent tasks
   */
  constructor(capacity: number) {
    this.capacity = capacity;
    this.#currentTasks = 0;
    this.#waitingTasks = [];
  }

  /**
   * Get the amount of currently running tasks
   */
  public get currentTasks(): number {
    return this.#currentTasks;
  }

  /**
   * Submit a task to the semaphore
   *
   * The task function will be run after acquiring a semaphore slot,
   * which will be released after the promise resolves or rejects.
   *
   * @param task an async function to run in the semaphore context
   * @returns the return value of the task future
   */
  public async runTask<T>(task: () => Promise<T>): Promise<T> {
    // acquire the semaphore
    await this.acquire();
    try {
      // execute the task
      return await task();
    } finally {
      // don't forget to release
      this.release();
    }
  }

  protected acquire(): Promise<void> {
    // if we're under capacity, bump the count and resolve immediately
    if (this.capacity > this.#currentTasks) {
      this.#currentTasks += 1;
      return Promise.resolve();
    }
    // otherwise add ourselves to the queue
    return new Promise((resolve) => this.#waitingTasks.push(resolve));
  }

  protected release() {
    // try waking up the next task
    const nextTask = this.#waitingTasks.shift();
    if (nextTask === undefined) {
      // no task in queue, decrement task count
      this.#currentTasks -= 1;
    } else {
      // wake up the task
      nextTask();
    }
  }
}
