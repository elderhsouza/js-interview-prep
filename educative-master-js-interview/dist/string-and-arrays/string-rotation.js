/*
String Rotation

Instructions:
Create a function that takes in 2 strings as parameters.
Return true if the strings are rotations of each other. Otherwise, return false.

Input: String, String
Output: Boolean

---

Examples

The following sets of strings are rotations:

"rotation"  "tationro" "tionrota"

"javascript"  "scriptjava"  "iptjavascr"

"RotateMe"  "teMeRota"  "eRotateM"

Hints
  You may have to spend time thinking about how best to arrange these strings before processing in a loop.
  Think about ways to short-circuit the check.
*/
export function bruteStringRotation(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }
    for (let i = 0; i < str1.length; i++) {
        const rotation = str1.slice(i, str1.length) + str1.slice(0, i);
        if (rotation === str2) {
            return true;
        }
    }
    return false;
}
bruteStringRotation('tationro', 'rotation'); //-> true
bruteStringRotation('RotateMe', 'abcdefgh'); //-> false
//--
export function stringRotation(str1, str2) {
    return str1.length === str2.length && (str1 + str1).includes(str2);
}
stringRotation('tationro', 'rotation'); //-> true
stringRotation('RotateMe', 'abcdefgh'); //-> false
//--- perf
bruteStringRotation('tationro', 'rotation'); /*?.*/
stringRotation('RotateMe', 'abcdefgh'); /*?.*/
