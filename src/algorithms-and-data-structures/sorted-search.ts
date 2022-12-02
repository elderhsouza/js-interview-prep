/*
Sorted Search
Instructions

Write a function that accepts a sorted array of integers and a number.
Return the index of that number if present.
The function should return -1 for target values not in the array.

Input: Array of Integers, Integer
Output: An integer from -1 onwards.

Examples:

search([1, 3, 6, 13, 17], 13); // -> 3
search([1, 3, 6, 13, 17], 12); // -> -1
*/

export function sortedSearch1(numbers: number[], target: number): number {
  for(let i = 0; i < numbers.length; i++) {
    if (numbers[i] === target) {
      return i;
    }
  }
  return -1;
}

sortedSearch1([1, 2, 3, 4, 5], 3);
sortedSearch1([1, 3, 5, 7, 9], 9);
sortedSearch1([1, 2, 4, 5], 3);
sortedSearch1([1, 2, 3, 4, 5], 7); //?. $

//---

export function sortedSearch2(numbers: number[], target: number): number {
  return numbers.indexOf(target);
}

sortedSearch2([1, 2, 3, 4, 5], 3);
sortedSearch2([1, 3, 5, 7, 9], 9);
sortedSearch2([1, 2, 4, 5], 3);
sortedSearch2([1, 2, 3, 4, 5], 7); //?. $

//---

export function sortedSearch3(numbers: number[], target: number): number {
  return numbers.findIndex((n) => n === target);
}

sortedSearch3([1, 2, 3, 4, 5], 3);
sortedSearch3([1, 3, 5, 7, 9], 9);
sortedSearch3([1, 2, 4, 5], 3);
sortedSearch3([1, 2, 3, 4, 5], 7); //?. $