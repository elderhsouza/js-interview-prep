/*
Array Subset

Write a function that accepts two parameters, both arrays.
The arrays can have both strings and numbers. Return true if the second array is a subset of the first.

In other words, determine if every item in the 2nd array is also present somewhere in the 1st array.

Input: Array of Numbers & Strings, Array of Numbers & Strings

Output: Boolean
Examples

arraySubset([2, 1, 3], [1, 2, 3]); // -> true
arraySubset([2, 1, 1, 3], [1, 2, 3]); // -> true
arraySubset([1, 2], [1, 2, 3]); // -> false
arraySubset([1, 2, 3], [1, 2, 2, 3]); // -> false

Hints
  This problem has multiple solutions with different time complexities.
  We’ll need to consider how to deal with repeats, such as when an item is present twice.
*/

export function arraySubset1<Type extends (string | number)[]>(arr: Type, sub: Type): boolean {
  if(sub.length > arr.length) {
    return false;
  }

  for(const element of sub) {
    const arrIndex = arr.indexOf(element);
    if(arrIndex === -1) {
      return false;
    }
  }

  return true;
}

arraySubset1([2, 1, 3], [1, 2, 3]); // -> true
arraySubset1([2, 1, 1, 3], [1, 2, 3]); // -> true
arraySubset1([1, 2], [1, 2, 3]); // -> false
arraySubset1([1, 2, 3], [1, 2, 2, 3]); // -> false

//---

export function arraySubset2<Type extends (string | number)[]>(arr: Type, sub: Type): boolean {
  if(sub.length > arr.length) {
    return false;
  }

  const arrCount: Record<string | number, number> = {};

  for(const element of arr) {
    if(element in arrCount) {
      arrCount[element]++;
    } else {
      arrCount[element] = 1;
    }
  }

  for(const element of sub) {
    if(element in arrCount === false) {
      return false;
    }

    arrCount[element]--;
    if(arrCount[element] === 0) {
      delete arrCount[element];
    }
  }

  return true;
}

arraySubset2([2, 1, 3], [1, 2, 3]); // -> true
arraySubset2([2, 1, 1, 3], [1, 2, 3]); // -> true
arraySubset2([1, 2], [1, 2, 3]); // -> false
arraySubset2([1, 2, 3], [1, 2, 2, 3]); // -> false

//---

export function arraySubset3<Type extends (string | number | object)[]>(arr: Type, sub: Type): boolean {
  if(sub.length > arr.length) {
    return false;
  }

  const arrMap = new Map();

  for(const arrElement of arr) {
    if(arrMap.has(arrElement)) {
      arrMap.set(arrElement, arrMap.get(arrElement) + 1);
    } else {
      arrMap.set(arrElement, 1);
    }
  }

  for(const subElement of sub) {
    if(!arrMap.has(subElement)) {
      return false;
    }

    arrMap.set(subElement, arrMap.get(subElement) - 1);

    if(arrMap.get(subElement) === 0) {
      arrMap.delete(subElement);
    }
  }

  return true;
}

arraySubset3([2, 1, 3], [1, 2, 3]); // -> true
arraySubset3([2, 1, 1, 3], [1, 2, 3]); // -> true
arraySubset3([1, 2], [1, 2, 3]); // -> false
arraySubset3([1, 2, 3, {}], [1, 2, 3, {}]); // -> false

//--- perf

arraySubset1([1, 2, 3], [1, 2, 2, 3]); /*?.*/
arraySubset2([1, 2, 3], [1, 2, 2, 3]); /*?.*/
arraySubset3([1, 2, 3], [1, 2, 2, 3]); /*?.*/