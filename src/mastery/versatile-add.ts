/*
Versatile Add

We'll cover the concepts of scope, closures, callbacks, and value vs. reference in this unique problem.
This problem tests your understanding of the core concepts of JavaScript.

In this problem, we’ll write a simple function that adds two numbers.
The challenge present is that this function will have to be extremely versatile.

This problem will test your understanding of:

  scope
  callbacks
  closures
  value vs. reference

If you understand these concepts well, this problem can still be extremely difficult,
but you have the ability to solve it.

Let’s get started.

Write a function that adds 2 numbers. It should work as follows:

add(3, 4); // -> 7
add(10, 12); // -> 22

However, it should also work as follows:

add(3)(4); // -> 7
add(10)(12); // -> 22

BONUS:

Make the following lines of code also function properly.

add(3)()(4); // -> 7
add(3)()()()(4); // -> 7
add(10)()()()()()()()()()()()(12); // -> 22

add()(3)(4); // -> 7
add()()()()(10)(12); // -> 22

add()(3)()(4); // -> 7
add()()()()()(10)()()()(12); // -> 22

Examples:
versatileAdd(3, 4)                   -> 7
versatileAdd(3)(4)                   -> 7
versatileAdd(3)()()()(4)             -> 7
versatileAdd()()()()()(10)()()()(12) -> 22

Hints
  Start with what you know and work down the examples.
*/

/*TODO
fix TS error: Argument of type 'number' is not assignable to parameter of type 'string'
  when executing with theses signatures for example
    - versatileAdd(3, 4 <- error)
    - versatileAdd()(3 <- error)(4)
*/

import { curry } from '../functional/curry';

export function versatileAdd(...numbers: number[]) {
  return curry(add, 2, ...numbers);
}

export function myAdd(a = 0, b = 0): number {
  return a + b;
}

//---

// with built-in currying
export function add(num1: number, num2: number) {
  if(num1 === undefined) {
    return add;
  }

  if(num2 === undefined) {
    return function innerAdd(num3) {
      if(num3 === undefined) {
        return innerAdd;
      }

      return num1 + num3;
    };
  }

  return num1 + num2;
}