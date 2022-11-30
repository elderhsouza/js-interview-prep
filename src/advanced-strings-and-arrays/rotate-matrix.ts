/*
Rotate Matrix

A matrix in JavaScript can be represented as an array of arrays. For example, here is a 3 x 3 matrix:

[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]]

Write a function that takes a matrix as input and returns a new matrix.
This new matrix should represent the original matrix rotated 90 degrees clockwise.
The original matrix should be unchanged.
This function should work for both square and rectangular matrixes.

Input: Array of Arrays of Numbers
Output: Array of Arrays of Numbers

Example
When given the matrix above as input, the output should be:

[[7, 4, 1],
 [8, 5, 2],
 [9, 6, 3]]

Hints
  We’ll need to start by creating a new, empty matrix.
  The new matrix dimensions will need to be switched, e.g. 2 x 3 becomes 3 x 2.
  We’ll need to process every item.
*/

export function rotateClockWise1(matrix: readonly number[][]): number[][] {
  const newMatrix: number[][] = matrix[0].map(() => []);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      newMatrix[j][matrix.length - 1 - i] = matrix[i][j];
    }
  }

  return newMatrix;
}

// rotateClockWise1([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); //?
// rotateClockWise1([[1, 2, 3]]); //?
// rotateClockWise1([[1, 2, 3], [4, 5, 6]]); //?

//---

export function rotateClockWise2(matrix: readonly number[][]): number[][] {
  return matrix.reduce<number[][]>(
    (reduced, row) => {
      for (let i = 0; i < matrix[0].length; i++) {
        reduced[i].unshift(row[i]);
      }
      return reduced;
    },
    matrix[0].map(() => [])
  );
}

// rotateClockWise2([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); //?
// rotateClockWise2([[1, 2, 3]]); //?
// rotateClockWise2([[1, 2, 3], [4, 5, 6]]); //?

//---

export function rotateClockWise3(matrix: readonly number[][]): number[][] {
  return matrix.reduce<number[][]>(
    (rotated, _, rowIndex) => {
      for (let colIndex = 0; colIndex < rotated.length; colIndex++) {
        rotated[colIndex][matrix.length - 1 - rowIndex] = matrix[rowIndex][colIndex];
      }
      return rotated;
    },
    matrix[0].map(() => [])
  );
}

// rotateClockWise3([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); //?
// rotateClockWise3([[1, 2, 3]]); //?
// rotateClockWise3([[1, 2, 3], [4, 5, 6]]); //?