// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
// If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

/**
 * Map, but with extra convienence functions
 *
 * If only TS had traits... (or another form of safe external class extensions)
 */
export class ExtendedMap<K, V> extends Map<K, V> {
  /**
   * Retrieves the existing value under the given key, or inserts a default value and returns it
   *
   * WILL BREAK IF YOU INSERT `undefined` INTO THE MAP
   * PLEASE DO NOT INSERT `undefined` INTO MAPS
   *
   * @param key key to look up
   * @param defaultValue the default value
   * @returns the retrieved value or the inserted value (if no value existed)
   */
  public getOrInsert(key: K, defaultValue: V): V {
    const existing = this.get(key);
    if (existing !== undefined) {
      return existing;
    }
    this.set(key, defaultValue);
    return defaultValue;
  }

  /**
   * Retrieves the existing value under the given key, or inserts a default value and returns it
   *
   * WILL BREAK IF YOU INSERT `undefined` INTO THE MAP
   * PLEASE DO NOT INSERT `undefined` INTO MAPS
   *
   * @param key key to look up
   * @param defaultValue function used to generate a default value for a given key
   * @returns the retrieved value or the inserted value (if no value existed)
   */
  public getOrInsertWith(key: K, defaultValue: (key: K) => V): V {
    const existing = this.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const newValue = defaultValue(key);
    this.set(key, newValue);
    return newValue;
  }

  /**
   * Retrieves the existing value under the given key, or inserts a default value and returns it
   *
   * WILL BREAK IF YOU INSERT `undefined` INTO THE MAP
   * PLEASE DO NOT INSERT `undefined` INTO MAPS
   *
   * @param key key to look up
   * @param defaultValue async function used to generate a default value for a given key
   * @returns the retrieved value or the inserted value (if no value existed)
   */
  public async getOrInsertWithAsync(
    key: K,
    defaultValue: (key: K) => Promise<V>,
  ): Promise<V> {
    const existing = this.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const newValue = await defaultValue(key);
    this.set(key, newValue);
    return newValue;
  }
}

/**
 * Extends an existing Map object by converting it to an ExtendedMap
 *
 * this literally just changes the prototype of the given object to ExtendedMap.
 * for safety, it will only extend vanilla Map instances.
 * note that this will mutate the input object
 * this function is defined as an "assert" just to troll TS
 *
 * @param existing existing map instance to extend
 * @throws if existing is not a vanilla or extended map
 */
export function extendMap<K, V>(
  existing: Map<K, V>,
): asserts existing is ExtendedMap<K, V> {
  if (existing instanceof ExtendedMap) {
    return;
  }
  if (Object.getPrototypeOf(existing) !== Map.prototype) {
    throw new Error("Expected the existing map to be a vanilla map!");
  }
  Object.setPrototypeOf(existing, ExtendedMap.prototype);
}

/**
 * Extends the vanilla Map prototype with the ExtendedMap functions
 *
 * You may need to add some type delcarations to make TS happy.
 * Don't run this in libraries, use ExtendedMap and extendMap instead.
 */
export function extendGlobally() {
  const proto = globalThis.Map.prototype as ExtendedMap<unknown, unknown>;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  proto.getOrInsert = ExtendedMap.prototype.getOrInsert;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  proto.getOrInsertWith = ExtendedMap.prototype.getOrInsertWith;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  proto.getOrInsertWithAsync = ExtendedMap.prototype.getOrInsertWithAsync;
}
