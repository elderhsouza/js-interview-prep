function greet(person: string, date: Date) {
  return `Hello ${person}, today is ${date.toDateString()}!`;
}

greet('Isabela', new Date());

//-----------------------------------------

function padLeft(padding: number | string, input: string): string {
  return typeof padding === 'number'
    ? ' '.repeat(padding) + input
    : `${padding} ${input}`;
}

padLeft('prefix', ' suffix');
padLeft(10, ' suffix');

//-----------------------------------------

function printAll(strings: string | string[] | null) {
  if (strings && typeof strings === 'object') {
    return [...strings];
  } else if (typeof strings === 'string') {
    return strings;
  }
}

printAll('random string');
printAll(['str1', 'str2', 'str3']);
printAll(null);

// Discriminated unions

interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2;
  }
}

getArea({ kind: 'circle', radius: 10 });
getArea({ kind: 'square', sideLength: 10 });

// Functions

type GreetFunction = (a: string) => void;

function greeter(fn: GreetFunction) {
  fn('Hello, World');
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

// Call signatures

type DescribableFunction = {
  description: string;
  (n: number): boolean;
};

function functionWithDescription(n: number) {
  return (n > 100);
}
functionWithDescription.description = 'I am function with a description';

function doSomething(fn: DescribableFunction) {
  console.log(fn.description, 'that returned', fn(12));
}

doSomething(functionWithDescription);

// Construct signatures

type SomeObject = {
  value: string;
};

type SomeConstructor = {
  new (s: string): SomeObject;
};

class CreateString {
  value = '';

  constructor(str: string) {
    this.value = str;
  }
}

function createFromConstructor(ctor: SomeConstructor) {
  return new ctor('hello');
}

createFromConstructor(CreateString);

// Generic functions

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

firstElement([1, 2, 3]);
firstElement(['a', 'b', 'c']);
firstElement([]);

// Inference

function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

map(['1', '2', '3'], (n) => parseInt(n)); //

// Constraints

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

longest([1, 2], [1, 2, 3]);
longest('alice', 'bob');
//longest(10, 30); //?

// Specifying type arguments

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

//combine([1, 2, 3], ['hello']); //Type 'string' is not assignable to type 'number'.
combine<string | number>([1, 2, 3], ['hello']);

// Function overloads

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y:number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

makeDate(12345678);
makeDate(5, 5, 5);
//makeDate(1, 3); //No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.