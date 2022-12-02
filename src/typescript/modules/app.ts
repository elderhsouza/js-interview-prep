import RandomNumberGenerator, { pi as π } from './maths';
import * as math from './maths';
import './maths';

RandomNumberGenerator;
/*
(alias) class RandomNumberGenerator
import RandomNumberGenerator
*/

console.log(π);
/*
(alias) var π: number
import π
*/

console.log(math.pi);
const positivePhi = math.absolute(math.pi); //-> const positivePhi: number

// TypeScript Specific ES Module Syntax

// import type
import { createCatName } from './animal';
const name = createCatName;
/*
'createCatName' cannot be used as a value because it was imported using 'import type'
*/

// inline type imports
import { createCatName, type Cat, type Dog } from './animal';

export type Animals = Cat | Dog;
const catName = createCatName();

// ES Module syntax with CommonJS behavior
// import fs = require('fs');
// const code = fs.readFileSync;
