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
export function deepEquals(a, b) {
    if (typeof a !== typeof b) {
        return false;
    }
    if (a === null && b === null) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return compareArray(a, b);
    }
    if (typeof a === 'object' && typeof b === 'object') {
        return compareObject(a, b);
    }
    return Object.is(a, b);
}
function compareArray(a, b) {
    // empty arrays are equal
    if (a.length === 0 && b.length === 0) {
        return true;
    }
    // arrays with different lengths are unequal
    if (a.length !== b.length) {
        return false;
    }
    return traverse(a, b);
}
function compareObject(a, b) {
    const propCountA = [...Object.keys(a)].length;
    const propCountB = [...Object.keys(b)].length;
    // empty objects are equal
    if (propCountA === 0 && propCountB === 0) {
        return true;
    }
    // objects with different property count are unequal
    if (propCountA !== propCountB) {
        return false;
    }
    return traverse(a, b);
}
function traverse(a, b) {
    const entries = Array.isArray(a) ? a.entries() : Object.entries(a);
    for (const [key] of entries) {
        if (deepEquals(a[key], b[key]) === false) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=deep-equals.js.map