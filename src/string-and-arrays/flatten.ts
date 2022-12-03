/*
Flatten Array

Instructions:
Write a function that will take an array of deeply nested arrays and extract every item,
flattening the array.
It should return a new array that contains the items of each internal array,
preserving order.

Input: Array
Output: Array

Examples:
flatten([ [ [ [1], 2], 3], [4], [], [[5]]]);
// -> [1, 2, 3, 4, 5]

flatten(['abc', ['def', ['ghi', ['jkl']]]]);
// -> ['abc', 'def', 'ghi', 'jkl']

Hints:
As in the last problem, we have to process every item we receive.
There’s no way to get around that so the best time complexity we can hope for is O(n).
*/

export function recursiveFlatten(nestedArray: unknown[]): unknown[] {
  const flattened: unknown[] = [];

  for (const element of nestedArray) {
    if (Array.isArray(element)) {
      flattened.push(...recursiveFlatten(element));
    } else {
      flattened.push(element);
    }
  }

  return flattened;
}

recursiveFlatten([ [ [ [1], 2], 3], [4], [], [[5]]]); //?
// -> [1, 2, 3, 4, 5]

recursiveFlatten(['abc', ['def', ['ghi', ['jkl']]]]); //?
// -> ['abc', 'def', 'ghi', 'jkl']

//---------------------------------------------------------------------

export function modernFlatten(nestedArray: unknown[]): unknown[] {
  return nestedArray.flat(Infinity);
}

modernFlatten([ [ [ [1], 2], 3], [4], [], [[5]]]); //?
// -> [1, 2, 3, 4, 5]

modernFlatten(['abc', ['def', ['ghi', ['jkl']]]]); //?
// -> ['abc', 'def', 'ghi', 'jkl']