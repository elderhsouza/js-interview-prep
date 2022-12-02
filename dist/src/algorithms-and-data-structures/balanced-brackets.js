/*
Balanced Brackets

Given a string, return true if it contains
all balanced parentheses (), curly-brackets {}, and square-brackets [].

Input: String
Output: Boolean

Examples

isBalanced("(x + y) - (4)"); // -> true
isBalanced("(((10 ) ()) ((?)(:)))"); // -> true
isBalanced("[{()}]"); // -> true
isBalanced("(50)("); // -> false
isBalanced("[{]}"); // -> false
*/
export function isBalanced1(string) {
    const openStack = [];
    const open = '([{';
    const close = ')]}';
    const matches = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    for (const char of string) {
        // If it's an open bracket, push it into our array
        if (open.includes(char)) {
            openStack.push(char);
            // If it's a close bracket
        }
        else if (close.includes(char)) {
            // pop an item from the open brackets array.
            const lastOpenBracket = openStack.pop();
            // If the open and close bracket don't match, return false
            if (matches[char] !== lastOpenBracket) {
                return false;
            }
        }
    }
    // Ensures there are no characters left on the stack
    return openStack.length === 0;
}
isBalanced1('(x + y) - (4)');
isBalanced1('(((10 ) ()) ((?)(:)))'); //?. $
isBalanced1('[{()}]');
isBalanced1('(50)(');
isBalanced1('{(})');
isBalanced1('()');
isBalanced1('(]');
//TODO: can I solve this with Regex and is it faster?
//# sourceMappingURL=balanced-brackets.js.map