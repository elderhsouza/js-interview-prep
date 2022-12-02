/*
Binary Search

We can come up with a better solution.
Since the array is sorted, we can essentially jump around the array until we find the index we’re looking for.

Finding a Word

Imagine looking for a word in a dictionary.
Would it be efficient to go through every single word until we find the one we want?
No, that would be horribly inefficient.

A better approach would be to open the dictionary halfway.
If our word is alphabetically before the words in the middle page,
we know our word is in the first half of the book.

We can then flip to ~1/4 of the way through the dictionary.
Again, repeating the above process, we can eliminate another half of the remaining pages.

We can repeat the above steps again and again until we find our word.
This ensures that even if the dictionary is huge,
we can find our word much faster than if we were to go through each word individually.

Scaling

In fact, if we double the size of the dictionary by adding in more words,
we would only have to repeat this process one more time.
That’s not much more work even though the dictionary is much thicker.
*/
export function binarySearch(numbers, target) {
    let startIndex = 0;
    let endIndex = numbers.length - 1;
    if (target < numbers[startIndex] || target > numbers[endIndex]) {
        return -1;
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (numbers[startIndex] === target) {
            return startIndex;
        }
        if (numbers[endIndex] === target) {
            return endIndex;
        }
        if (endIndex - startIndex <= 1) {
            // indicates the number isn't present
            return -1;
        }
        const middleIndex = Math.floor((startIndex + endIndex) / 2);
        if (target > numbers[middleIndex]) {
            startIndex = middleIndex + 1;
        }
        else if (target < numbers[middleIndex]) {
            endIndex = middleIndex - 1;
        }
        else {
            return middleIndex;
        }
    }
}
binarySearch([1, 2, 3, 4, 5], 3);
binarySearch([1, 3, 5, 7, 9], 9);
binarySearch([1, 2, 4, 5], 3);
binarySearch([1, 2, 3, 4, 5], 7);
binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7); //?. $
//# sourceMappingURL=binary-search.js.map