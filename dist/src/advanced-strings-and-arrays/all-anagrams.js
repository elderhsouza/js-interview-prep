/*
All Anagrams
Instructions

Write a function that takes in an array of strings.
Return true if all strings are anagrams of one another and false
if even a single string is not an anagram of the others.

Input: Array of Strings
Output: Boolean

Examples

allAnagrams(['abcd', 'bdac', 'cabd']); // true
allAnagrams(['abcd', 'bdXc', 'cabd']); // false

Hints
  Think about what it means for two strings to be anagrams.
  They should all have the same characters present in the same number, perhaps in a different order.

  It would make sense to express the time complexity in terms of two variables.
*/
export function allAnagrams1(strings) {
    const sortedStrings = strings.map(str => {
        return str.split('').sort().join('');
        /*     ^
        Time: where 's' is the length of the string.
          O(s + (s * log(s)) + s)
            = O(2s + (s * log(s))
            = O(s * log(s))
        */
    });
    /*
    Time for map where 'a' is the length of the array is O(a).
    Time for sortedStrings is then O(a * s * log(s)).
    */
    for (let i = 1; i < strings.length; i++) {
        if (sortedStrings[i] !== sortedStrings[0]) {
            return false;
        }
    }
    // Time for loop is O(a * s)
    return true;
}
// Time O(a * s + a * s * log(s)) => O(a * s * log(s))
// Space O(a * s)
// allAnagrams1(['abcd', 'bdac', 'cabd']); //?
// allAnagrams1(['abcd', 'bdXc', 'cabd']); //?
// allAnagrams1(['bdXc', 'abcd', 'cabd']); //?
// allAnagrams1(['123', '132', '213', '231', '312', '321']); //?
// allAnagrams1(['123', '122']); //?
//---
function getCharCount(str) {
    const charCount = {};
    for (const char of str) {
        if (charCount[char] === undefined) {
            charCount[char] = 1;
        }
        else {
            charCount[char]++;
        }
    }
    return charCount;
}
export function allAnagrams2(strings) {
    if (strings.length === 0) {
        return true;
    }
    for (let i = 1; i < strings.length; i++) {
        if (strings[i].length !== strings[0].length) {
            return false;
        }
    }
    const firstCharCount = getCharCount(strings[0]);
    for (let i = 1; i < strings.length; i++) {
        const thisCharCount = getCharCount(strings[i]);
        for (const char in thisCharCount) {
            if (thisCharCount[char] !== firstCharCount[char]) {
                return false;
            }
        }
    }
    return true;
}
// allAnagrams2(['abcd', 'bdac', 'cabd']); //?
// allAnagrams2(['abcd', 'bdXc', 'cabd']); //?
// allAnagrams2(['bdXc', 'abcd', 'cabd']); //?
// allAnagrams2(['123', '132', '213', '231', '312', '321']); //?
// allAnagrams2(['123', '122']); //?
//---
export function allAnagrams3(strings) {
    if (strings.length === 0) {
        return false;
    }
    return new Set(strings.map(string => [...string].sort().join(''))).size === 1;
}
// allAnagrams3(['abcd', 'bdac', 'cabd']); //?
// allAnagrams3(['abcd', 'bdXc', 'cabd']); //?
// allAnagrams3(['bdXc', 'abcd', 'cabd']); //?
// allAnagrams3(['123', '132', '213', '231', '312', '321']); //?
// allAnagrams3(['123', '122']); //?
//---
// Hacky, but blazingly fast
export function allAnagrams4(strings) {
    if (strings.length === 0) {
        return false;
    }
    const charMap = new Map();
    for (const word of strings) {
        if (word.length !== strings[0].length) {
            return false;
        }
        [...word].forEach((char) => {
            return charMap.set(char, charMap.has(char)
                ? charMap.get(char) + 1
                : 1);
        });
    }
    const charMapValues = charMap.values();
    return (String(charMapValues.next().value + ',')
        .repeat(strings[0].length).slice(0, -1) === [...charMapValues].toString());
}
// allAnagrams4(['abcd', 'bdac', 'cabd']); //?
// allAnagrams4(['abcd', 'bdac', 'cab']); //?
// allAnagrams4([]); //?
// allAnagrams4(['bdXc', 'abcd', 'cabd']); //?
// allAnagrams4(['123', '132', '213', '231', '312', '321']); //?
// allAnagrams4(['123', '122']); //?
//# sourceMappingURL=all-anagrams.js.map