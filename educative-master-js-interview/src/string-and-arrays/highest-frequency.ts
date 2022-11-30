/*
Highest Frequency
Instructions

Write a function that takes an array of strings and returns the most commonly occurring string in that array.

If there are multiple strings with the same high frequency,
return the one that finishes its occurrences first, while going left to right through the array.

Input: Array of Strings

Output: String
*/

export function highestFrequency(stringArray: string[]): string {
  const frequencies: Record<string, number> = {};
  let maxFrequency = 0;
  let mostFrequentString = stringArray[0];

  for(const str of stringArray) {
    if(frequencies[str] === undefined) {
      frequencies[str] = 1;
    } else {
      frequencies[str]++;
    }

    if(frequencies[str] > maxFrequency) {
      maxFrequency = frequencies[str];
      mostFrequentString = str;
    }
  }

  return mostFrequentString;
}

highestFrequency(['abc', 'def']); //-> abc
highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi' ]); //-> ghi

//---

export function modernHighestFrequency(stringArray: string[]): string {
  return stringArray
    .reduce(
      (acc, str) => {
        acc.frequencies.set(
          str,
          acc.frequencies.has(str) ? (acc.frequencies.get(str) + 1) : 1
        );

        if (acc.frequencies.get(str) > acc.maxFrequency) {
          acc.maxFrequency = acc.frequencies.get(str);
          acc.mostFrequent = str;
        }

        return acc;
      },
      {
        frequencies: new Map(),
        maxFrequency: 0,
        mostFrequent: stringArray[0]
      }
    )
    .mostFrequent;
}

modernHighestFrequency(['abc', 'def']); //-> abc
modernHighestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi' ]); //-> gui

//--- perf

highestFrequency(['abc', 'def']); /*?.*/
modernHighestFrequency(['abc', 'def']); /*?.*/

highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi' ]); /*?.*/
modernHighestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi' ]); /*?.*/