import Benchmark from 'benchmark';
import {
  allAnagrams1,
  allAnagrams2,
  allAnagrams3,
  allAnagrams4
} from '../../dist/advanced-strings-and-arrays/all-anagrams.js';

const suite = new Benchmark.Suite({
  // minSamples: 100,
  // initCount: 100
});

const inputs = [
  [],
  ['abcd', 'bdac', 'cabd'],
  ['abcd', 'bdac', 'cab'],
  ['bdXc', 'abcd', 'cabd'],
  ['123', '132', '213', '231', '312', '321'],
  ['123', '122']
];

const runFn = function (fn, inputs) {
  inputs.forEach(input => fn(input));
};

const benchOptions = {
  // minSamples: 100
};

suite
  .add('allAnagrams1', () => {
    runFn(allAnagrams1, inputs);
  }, benchOptions)
  .add('allAnagrams2', () => {
    runFn(allAnagrams2, inputs);
  }, benchOptions)
  .add('allAnagrams3', () => {
    runFn(allAnagrams3, inputs);
  }, benchOptions)
  .add('allAnagrams4', () => {
    runFn(allAnagrams4, inputs);
  }, benchOptions)
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', event => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter('fastest').map('name');

    console.log(`The fastest option is ${fastestOption}`);
  })
  .run();