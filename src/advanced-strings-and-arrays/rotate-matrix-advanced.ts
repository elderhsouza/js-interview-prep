/*
Rotate Square Matrix in Place

Write a function that takes a square matrix as input.
A square matrix has the same number of rows and columns, e.g. 3 x 3, 4 x 4, 5 x 5.
It should return the same matrix rotated 90 degrees clockwise.
The rotation should happen in place, meaning you may not create any extra matrixes or arrays in your function.

Input: Array of arrays of numbers
Output: Array of arrays of numbers

---

Example

An input of:

[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]]

yields an output of:

[[7, 4, 1],
 [8, 5, 2],
 [9, 6, 3]]

Hints
  Start at the border and work your way in.
  We’ll need some placeholder variables.
*/

//TODO: implement
export function rotateMatrixInPlace1(matrix: number[][]): number[][] {
  return matrix;
}

rotateMatrixInPlace1([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
// expect [[7, 4, 1], [8, 5, 2], [9, 6, 3]]