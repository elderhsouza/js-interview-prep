import Benchmark from 'benchmark';
import {
  rotateClockWise1,
  rotateClockWise2,
  rotateClockWise3
} from '../../dist/advanced-strings-and-arrays/rotate-matrix.js';

const suite = new Benchmark.Suite({
  // minSamples: 100,
  // initCount: 100
});

const inputs = [
  [[1]],
  [[1, 2], [3, 4]],
  [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  [[1, 2, 3]],
  [[1, 2, 3], [4, 5, 6]]
];

const runFn = function (fn, inputs) {
  inputs.forEach(input => fn(input));
};

const benchOptions = {
  // minSamples: 100
};

suite
  .add('rotateClockWise1', () => {
    runFn(rotateClockWise1, inputs);
  }, benchOptions)
  .add('rotateClockWise2', () => {
    runFn(rotateClockWise2, inputs);
  }, benchOptions)
  .add('rotateClockWise3', () => {
    runFn(rotateClockWise3, inputs);
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