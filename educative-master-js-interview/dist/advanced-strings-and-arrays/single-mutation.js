/*
Single Mutation
Instructions

There are 3 types of possible string mutations:
character insertion, character deletion, or character substitution.

Write a function that accepts 2 strings and returns true
if the strings are the same except for 0 or 1 mutations. Return false otherwise.

Inputs: String, String
Output: Boolean

Examples:
  Single Deletion:
    'abcd', 'abc'
    'abcd', 'acd'

  Single Insertion:
    'abcd', 'abcde'
    'abcd', 'abXcd'

  Single Substitution:
    'abcd', 'abXd'
    'abcd', 'Xbcd'
*/
export function singleMutation1(str1, str2) {
    if (Math.abs(str1.length - str2.length) > 1) {
        return false;
    }
    let mutations = 0;
    for (let i = 0, j = 0; i < str1.length || j < str2.length; i++, j++) {
        if (str1[i] !== str2[j]) {
            mutations++;
            if (mutations > 1) {
                return false;
            }
            if (str1.length > str2.length) {
                j--;
            }
            else if (str1.length < str2.length) {
                i--;
            }
        }
    }
    return true;
}
// Time O(n)
// Space O(1)
singleMutation1('abcd', 'abc'); //?
singleMutation1('abcd', 'abXcd'); //?
singleMutation1('abcd', 'abXd'); //?
singleMutation1('abcd', 'abXY'); //?
singleMutation1('abcd', 'ab'); //?
singleMutation1('abcd', 'abcdef'); //?
//--- perf
singleMutation1('abcd', 'abcdef'); //?. $
singleMutation1('abcd', 'ab'); //?. $
/*
Conclusion

We add yet another tool to our repertoire: the double-condition for-loop.
These come in handy when we need to process different pieces of data simultaneously.
If we find that we need to compare items at each iteration and
we can’t do it by looping through just one of the data sets,
we might be able to apply a second condition to our loop.
*/ 
