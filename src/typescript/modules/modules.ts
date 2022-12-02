/* eslint-disable @typescript-eslint/no-unused-vars */

// non-modules
import empty from './empty';
/*
'empty' is declared but its value is never read.ts(6133)
Module '"/home/ehs/dev/ehs/typescript/src/modules/empty"' has no default export
 */

import helloWorld from './hello';
helloWorld();

// ES Module syntax
import { pi, phi, absolute } from './maths';

console.log(pi);

const absPhi = absolute(phi); //-> const absPhi: number

// additional import syntax
import { pi as π } from './maths';
console.log(π); //-> (alias) var π: number
