function identity<Type>(arg: Type): Type {
  return arg;
}

identity(1);
identity(true);
identity('string');

// Generic type variables

function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
loggingIdentity([1, 2, 3]);

// Generic Types

const anonymousIdentity: <Input>(arg: Input) => Input = identity;
anonymousIdentity(0);

const myIdentity: { <Type>(arg: Type): Type } = identity;
myIdentity(42);

interface GenericIdentity<Type> {
  (arg: Type): Type;
}

const myIdentity2: GenericIdentity<number> = identity;
myIdentity2(420); //?

// Generic Classes

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

const stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = '';
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'));

// Generic constraints

interface LengthWise {
  length: number;
}

function loggingIdentity2<Type extends LengthWise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

loggingIdentity2([1, 2, 3, 4]);
loggingIdentity2('abc');

// loggingIdentity(4); // Argument of type 'number' is not assignable to parameter of type 'unknown[]'
loggingIdentity2({ length: 10 });

// Using type parameters in generic constraints

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const obj1 = { a: 1, b: 2, c: 3, d: 4 };

getProperty(obj1, 'a');
getProperty(obj1, 'c');
//getProperty(obj1, 'm'); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'

// Using Class types in generics

// function create<Type>(c: { new (): Type }): Type {
//   return new c();
// }

class BeeKeeper {
  hasMask = true;
}

class ZooKeeper {
  nameTag = 'Mike';
}

class Animal {
  numLegs = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A) {
  return new c();
}

const lion = createInstance(Lion);
const bee = createInstance(Bee);
console.log(lion);
console.log(bee);