# Solvro utils

A collection of small utility functions that can be used both on the backend and frontend.

## Contents

### arrays

- `chunkArray` - a function to split an array into smaller chunks of a given size. inspired by [rust's slice::chunks()](https://doc.rust-lang.org/std/primitive.slice.html#method.chunks)
- `zip` - a function to iterate over two arrays at once, inspired by [python's zip() function](https://docs.python.org/3/library/functions.html#zip)

### ics

Contains the main `parseICS` function, which parses the provided ICS text to a JSON representation.

- `BEGIN`/`END` are treated as nested object delimeters.
- Nested objects can either be an object, or an array of objects on the parent object, depending if there are repeats of that object type.
  - if an object contains only one object of a type, the key corresponding to that type will contain an object
  - if it contains multiple objects of a type, the key corresponding to that type will contain an array
- Regular properties with : delimeters are treated as strings.
- Inline objects with ; delimeters are represented as objects.

### map

Contains the `ExtendedMap` class, an extension of the vanilla `Map` with the following extra methods:

- `getOrInsert`, `getOrInsertWith`, `getOrInsertWithAsync` - getter methods that insert a default value if a key does not exist. probably inspired by [rust's map Entry structs](https://doc.rust-lang.org/std/collections/hash_map/enum.Entry.html). useful for building Map-based caches.

An existing vanilla `Map` instance can be converted to an `ExtendedMap` with the `extendMap()` function. (beware: contains prototype shenanigans)
... or you can extend the entire vanilla `Map` prototype with `extendGlobally()`... but please don't do that in library code.

#### Extending the vanilla `Map` prototype

Use the following snippet to access `ExtendedMap` functions on any `Map` instance.
Make sure to either run this at the start of your program, or before using any `ExtendedMap` functions on a `Map` object.

```ts
import { ExtendedMap, extendGlobally } from "@solvro/utils/map";

declare global {
  interface Map<K, V> {
    getOrInsert: ExtendedMap<K, V>["getOrInsert"];
    getOrInsertWith: ExtendedMap<K, V>["getOrInsertWith"];
    getOrInsertWithAsync: ExtendedMap<K, V>["getOrInsertWithAsync"];
  }
}

extendGlobally();
```

### option

- `*Map` - Basically Rust's [Option::map](https://doc.rust-lang.org/std/option/enum.Option.html#method.map) ported to JS. Read the JSDoc comments for details.
- `assert*` - assertion functions that ensure the given value is not null/undefined (depending on function)

### promises

- `wait` - returns a promise that resolves after some time (the classic new promise -> set timeout that everyone had to write at least once)

### semaphore

Contains a simple async `Semaphore` class.
Useful for limiting concurrent task counts.

## License

This library is licensed under MPL-2.0.
