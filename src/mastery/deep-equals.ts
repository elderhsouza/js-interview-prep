/*
Deep Equals

Write a function that will take in two items of any type.
The function should perform a deep equality check.

Inputs: Any, Any
Output: Boolean

Hints
  Deep equality is used to check equivalence of objects and arrays.
  Because of the concept of value vs. reference in JavaScript,
  the equality operators (==, ===) can’t help us.
  They’ll always return false for two different arrays or objects even if they contain the same items.

  If we’re comparing objects or arrays,
  we need to go into them and check that each item is the same.
  If the item contains other arrays or objects, we need to go into those items as well.

  It’s entirely possible to have objects or arrays nested several levels deep.
  Our function will have to drill all the way down into every object.

  This problem tests several JavaScript concepts:
    Value vs. reference
    Quirks of different data types such as NaN and null
    Use of typeof
    Ability to reuse code
*/

export function deepEquals(a: unknown, b: unknown): boolean {
  if (typeof a !== typeof b) {
    return false;
  }

  if (a === null && b === null) {
    return true;
  }

  if (typeof a === 'object'
    && typeof b === 'object'
    && a !== null
    && b !== null
  ) {
    const keyCountA = Object.keys(a).length;
    const keyCountB = Object.keys(b).length;

    if (keyCountA === 0 && keyCountB === 0) {
      return true;
    }

    if  (keyCountA !== keyCountB) {
      return false;
    }

    for (const key in a) {
      if (deepEquals(a[key], b[key]) === false) {
        return false;
      }
    }

    return true;
  }

  return Object.is(a, b);
}
