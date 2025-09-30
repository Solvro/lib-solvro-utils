// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
import { ExtendedMap } from "./map.ts";

/**
 * An async "lock" that redirects duplicate requests to currently running ones
 */
export class RequestBundler<K, R> {
  private state = new ExtendedMap<K, Promise<R>>();

  /**
   * Runs a task within the context of the request bundler.
   *
   * It is guaranteed that only one task associated with a given key will be running at once.
   *
   * If there is no task running for a given key, this function will call the handler function and
   * will save the returned promise until it is resolved.
   * If there is a task already running for a given key, this function will NOT call the handler function,
   * and will instead return a promise for the already running task.
   */
  public run(key: K, handler: () => Promise<R>): Promise<R> {
    return this.state.getOrInsertWith(key, () => {
      const promise = handler();
      void promise.finally(() => {
        this.state.delete(key);
      });
      return promise;
    });
  }
}
