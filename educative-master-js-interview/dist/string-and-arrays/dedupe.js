/*
Remove Dupes

Write a function that takes in a string and returns a new string.
The new string should be the same as the original with every duplicate character removed.

Input: String
Output: String

Examples

'abcd' -> 'abcd'
'aabbccdd' -> 'abcd'
'abcddbca' -> 'abcd'
'abababcdcdcd' -> 'abcd'
*/
export function removeDupes(str) {
    return [...new Set(str)].join('');
}
removeDupes('abcd'); //?
removeDupes('aabbccdd'); //?
removeDupes('abcddbca'); //?
removeDupes('abababcdcdcd'); //?
