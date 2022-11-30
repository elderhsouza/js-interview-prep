/*
Instructions

Create a function that determines whether all characters in a string are unique or not.
Make it case-sensitive, meaning a string with both 'a' and 'A' could pass the test.

Input: String

Output: Boolean
Examples

isUnique('abcdef'); // -> true
isUnique('89%df#$^a&x'); // -> true
isUnique('abcAdef'); // -> true
isUnique('abcaef'); // -> false

Immediately, we know that we’ll have to process every character in the string.
The best time complexity possible for this algorithm is linear, or O(n).
There’s no way to get around that.
*/
export function performantIsUnique(str) {
    const chars = new Set();
    for (const thisChar of str) {
        if (chars.has(thisChar)) {
            return false;
        }
        chars.add(thisChar);
    }
    return true;
}
performantIsUnique('abcdef'); //?
performantIsUnique('89%df#$^a&x'); //?
performantIsUnique('abcAdef'); //?
performantIsUnique('abcaef'); //?
//---
export function modernIsUnique(str) {
    return (new Set(str).size === str.length);
}
modernIsUnique('abcdef'); //?
modernIsUnique('89%df#$^a&x'); //?
modernIsUnique('abcAdef'); //?
modernIsUnique('abcaef'); //?
