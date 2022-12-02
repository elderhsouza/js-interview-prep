/* eslint-disable no-empty */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
{
  class Point {
    // Property 'x' has no initializer and is not definitely assigned in the constructor
    x: number;

    // Property 'y' has no initializer and is not definitely assigned in the constructor
    y: number;
  }

  const point = new Point();
  point.x = 0;
  point.y = 0;
}

{
  class Point {
    x = 0;
    y = 0;
  }

  const point = new Point();
  console.log(`${point.x}, ${point.y}`);

  point.x = '0'; //-> Type 'string' is not assignable to type 'number'
}

// --strictPropertyInitialization
{
  class BadGreeter {
    name: string;
    //^? Property 'name' has no initializer and is not definitely assigned in the constructor
  }

  class GoodGreeter {
    name: string;

    constructor() {
      this.name = 'hello';
    }
  }

  class OkGreeter {
    name!: string;
  }
}

// readonly
{
  class Greeter {
    readonly name: string = 'world';

    constructor(otherName?: string) {
      if (otherName !== undefined) {
        this.name = otherName;
      }
    }

    err() {
      this.name = 'not ok'; //-> Cannot assign to 'name' because it is a read-only property
    }
  }

  const greeter = new Greeter();
  greeter.name = 'also not ok'; //-> Cannot assign to 'name' because it is a read-only property
}

// Constructors
{
  class Point {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  }

  class OverloadedPoint {
    constructor(x: number, y: number);
    constructor(s: string);
    constructor(xs: unknown, y?: unknown) {
      throw new Error('not implemented');
    }
  }
}

// Super calls
{
  class Base {
    k = 4;
  }

  class Derived extends Base {
    constructor() {
      console.log(this.k);
      //^? 'super' must be called before accessing 'this' in the constructor of a derived class
      super();
    }
  }
}

// Methods
{
  class Point {
    x = 10;
    y = 10;

    scale(n: number): void {
      this.x *= n;
      this.y *= n;
    }
  }

  let x = 0;

  class C {
    x = 'hello';

    m() {
      x = 'world'; //-> Type 'string' is not assignable to type 'number'
    }
  }
}

// Getters / Setters
{
  class C {
    _length = 0;

    get length() {
      return this._length;
    }

    set length(value) {
      this._length = value;
    }
  }

  //--

  class Thing {
    _size = 0;

    get size(): number {
      return this._size;
    }

    set size(value: string | number | boolean) {
      const num = Number(value);

      if (Number.isFinite(num) === false) {
        this._size = 0;
        return;
      }

      this._size = num;
    }
  }
}

// Index signatures
{
  class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
      return this[s] as boolean;
    }
  }
}

// Class heritage
{
  interface Pingable {
    ping(): void;
  }

  class Sonar implements Pingable {
    ping() {
      console.log('ping!');
    }
  }

  class Ball implements Pingable {
    /*
    Class 'Ball' incorrectly implements interface 'Pingable'.
    Property 'ping' is missing in type 'Ball' but required in type 'Pingable'
    */
    pong() {
      console.log('pong!');
    }
  }

  //--

  interface Checkable {
    check(name: string): boolean;
  }

  class NameChecker implements Checkable {
    check(s) {
      //  ^? Parameter 's' implicitly has an 'any' type
      return s.toLowerCase() === 'ok';
    }
  }

  //--

  interface A {
    x: number;
    y?: number;
  }

  class C implements A {
    x = 0;
  }

  const c = new C();
  c.y = 10; //-> Property 'y' does not exist on type 'C'
}

// extends Clauses
{
  class Animal {
    move() {
      console.log('Moving along!');
    }
  }

  class Dog extends Animal {
    woof(times: number) {
      for (let i = 0; i < times; i++) {
        console.log('woof!');
      }
    }
  }

  const dog = new Dog();
  dog.move(); //-> Base class method
  dog.woof(3); //-> Derived class method
}

// Overriding methods
{
  class Base {
    greet() {
      console.log('Hello world!');
    }
  }

  class Derived extends Base {
    greet(name?: string) {
      if (name === undefined) {
        super.greet();
      } else {
        console.log(`Hello ${name.toUpperCase()}`);
      }
    }
  }

  const derived = new Derived();
  derived.greet(); //-> Hello world!
  derived.greet('reader'); //-> Hello READER

  const base: Base = derived;
  base.greet(); // no problem

  //--

  class BadDerived extends Base {
    greet(name: string) {
      //^?
      // Property 'greet' in type 'BadDerived'
      // is not assignable to the same property in base type 'Base'.
      // Type '(name: string) => void' is not assignable to type '() => void'
      console.log(`Hello ${name.toUpperCase()}`);
    }
  }
}

// Type-only field declarations
{
  interface Animal {
    dateOfBirth: unknown;
  }

  interface Dog extends Animal {
    breed: unknown;
  }

  class AnimalHouse {
    resident: Animal;

    constructor(animal: Animal) {
      this.resident = animal;
    }
  }

  class DogHouse extends AnimalHouse {
    // Does not emit JavaScript code,
    // only ensures the types are correct
    declare resident: Dog;

    constructor(dog: Dog) {
      super(dog);
    }
  }
}

// Initialization order
{
  class Base {
    name = 'base';
    constructor() {
      console.log(`My name is ${this.name}`);
    }
  }

  class Derived extends Base {
    name = 'derived';
  }

  /*
  TODO:
  This should not have worked,
  need to see the class hoisting rules while in scoped blocks(maybe)
  */
  const derived = new Derived();
  console.log(derived); //-> Derived { name: 'derived' }
  //^ should have outputted { name: 'My name is base' } according to the TS docs
}

// Inheriting built-in types
{
  class BadMsgError extends Error {
    constructor(m: string) {
      super(m);
    }

    sayHello() {
      return `hello ${this.message}`;
    }
  }

  const badMessageError = new BadMsgError('naughty error');
  badMessageError.sayHello(); //=> 'hello naughty error'

  //--

  class MsgError extends Error {
    constructor(m: string) {
      super(m);

      Object.setPrototypeOf(this, MsgError.prototype);
    }

    sayHello() {
      return `hello ${this.message}`;
    }
  }

  const messageError = new MsgError('another error');
  messageError.sayHello(); //-> 'hello another error'
}

// Member visibility
{
  // public
  class Greeter {
    public greet() {
      console.log('hi!');
    }
  }

  const greeter = new Greeter();
  greeter.greet();

  // protected
  class ProtectedGreeter {
    public greet() {
      console.log(`Hello, ${this.getName()}`);
    }

    protected getName() {
      return 'hi';
    }
  }

  class SpecialGreeter extends ProtectedGreeter {
    public howdy() {
      console.log(`Howdy ${this.getName()}`);
    }
  }

  const specialGreeter = new SpecialGreeter();
  specialGreeter.greet();
  specialGreeter.getName();
  /*             ^? Property 'getName' is protected
                  and only accessible within class
                  'ProtectedGreeter' and its subclasses
  */

  // Exposure of protected members
  class Base {
    protected m = 10;
  }

  class Derived extends Base {
    // No modifier, so default is 'public'
    m = 15;
  }

  const derived = new Derived();
  console.log(derived.m); //OK

  // Cross-hierarchy protected access
  class CrossBase {
    protected x: number = 1;
  }

  class CrossDerived1 extends CrossBase {
    protected x = 5;
  }

  class CrossDerived2 extends CrossBase {
    fn1(other: CrossDerived2) {
      other.x = 10;
    }

    fn2(other: CrossBase) {
      other.x = 10;
      /*
      Property 'x' is protected and only accessible
      through an instance of class 'CrossDerived2'.
      This is an instance of class 'CrossBase'
      */
    }
  }

  // private
  class PrivateBase {
    private x = 0;
  }

  const myPrivate = new PrivateBase();
  console.log(myPrivate.x);
  //          ^? Property 'x' is private and only accessible within class 'PrivateBase'

  class PrivateDerived extends PrivateBase {
    showX() {
      console.log(this.x);
      //          ^? Property 'x' is private and only accessible within class 'PrivateBase'
    }
  }

  class PrivateDerivedToPublic extends PrivateBase {
    /*
    Class 'PrivateDerivedToPublic' incorrectly extends base class 'PrivateBase'.
    Property 'x' is private in type 'PrivateBase' but not in type 'PrivateDerivedToPublic'
    */
    x = 1;
  }

  // Cross-instance private access
  class A {
    private x = 10;

    public sameAs(other: A) {
      return other.x === this.x; //-> No error
    }
  }

  // Caveats
  class MySafe {
    private secretKey = 12345;
  }

  // in a javascript file ...
  const safe = new MySafe();
  console.log(safe.secretKey); // will still print 12345

  class MySemiSafe {
    private secretKey = 12345;
  }

  const semiSafe = new MySemiSafe();
  console.log(semiSafe.secretKey);
  //          ^? Property 'secretKey' is private and only accessible within class 'MySemiSafe'

  console.log(semiSafe['secretKey']); // bracket notation access are allowed

  // JS really private fields
  class Dog {
    #barkAmount = 0;
    personality = 'happy';

    constructor() {}
  }
}

// Static members
{
  class MyClass {
    static x = 0;
    static printX() {
      console.log(MyClass.x);
    }
  }

  console.log(MyClass.x);
  MyClass.printX();

  //--

  class MyStaticClass {
    private static x = 0;
  }
  console.log(MyStaticClass.x);
  /*
  Property 'x' is private and only accessible within class 'MyStaticClass'
  */

  //--

  class Base {
    static getGreeting() {
      return 'Hello world';
    }
  }

  class Derived extends Base {
    myGreeting = Derived.getGreeting();
  }

  // Special Static Names (name, length, call)
  class S {
    static name = 'S!';
    /*
    Static property 'name' conflicts with built-in property
    'Function.name' of constructor function 'S'
    */
  }

  // Why no static classes?

  // unnecessary static class
  class MyUnnecessaryStaticClass {
    static doSomething() {}
  }

  // preferred alternative 1
  function doSomething() {}

  // preferred alternative 2
  const MyHelperObject = {
    doSomethingToo() {},
  };
}

// static blocks in classes
{
  class Foo {
    static #count = 0;

    getCount() {
      return Foo.#count;
    }

    static {
      try {
        const lastInstances = loadLastInstances();
        Foo.#count += lastInstances.length;
      } catch {}
    }
  }

  function loadLastInstances() {
    return [];
  }
}

// Generic classes
{
  class Box<Type> {
    contents: Type;
    constructor(value: Type) {
      this.contents = value;
    }
  }

  const newBox = new Box('hello'); //-> const newBox: Box<string>

  //

  class IllegalStaticBox<Type> {
    static defaultValue: Type; //-> Static members cannot reference class type parameters.
  }
  // The static members of a generic class can never refer to the class’s type parameters.

  //--

  // 'this' at runtime in classes
  class MyClass {
    name = 'MyClass';
    getName() {
      return this.name;
    }
  }

  const myInstance = new MyClass(); //?
  const myObject = {
    name: 'myObject',
    getName: myInstance.getName,
  };

  console.log(myObject.getName()); //? myObject, not MyClass
}

// Arrow functions
{
  class MyClass {
    name = 'MyClass';

    getName = () => {
      return this.name;
    };
  }

  const myInstance = new MyClass();
  const getName = myInstance.getName;

  console.log(getName()); // Prints 'MyClass' instead of crashing
}

// 'this' parameters
{
  function fn(this: SomeType, x: number) {}

  // JS output
  // function fn(x) {}

  class MyClass {
    name = 'MyClass';

    getName(this: MyClass) {
      return this.name;
    }
  }

  const myInstance = new MyClass();
  myInstance.getName(); // ok

  const getName = myInstance.getName;
  console.log(getName());
  //          ^? The 'this' context of type 'void' is not assignable
  //          to method's 'this' of type 'MyClass'
}

// 'this' types
{
  class Box {
    contents: string = '';

    set(value: string) {
      //-> (method) Box.set(value: string): this
      this.contents = value;
      return this;
    }
  }

  class ClearableBox extends Box {
    clear() {
      this.contents = '';
    }
  }

  const a = new ClearableBox();
  const b = a.set('hello'); //-> const b: ClearableBox

  // 'this' as a parameter annotation
  {
    class Box {
      content: string = '';

      sameAs(other: this) {
        return other.content === this.content;
      }
    }

    class DerivedBox extends Box {
      otherContent: string = '?';
    }

    const base = new Box();
    const derived = new DerivedBox();
    derived.sameAs(base);
    /*
    Argument of type 'Box' is not assignable to parameter of type 'DerivedBox'.
    Property 'otherContent' is missing in type 'Box' but required in type 'DerivedBox'
    */
  }

  // 'this'-based type guards
  {
    class FileSystemObject {
      isFile(): this is FileRep {
        return this instanceof FileRep;
      }

      isDirectory(): this is Directory {
        return this instanceof Directory;
      }

      isNetworked(): this is Networked & this {
        return this.networked;
      }

      constructor(public path: string, private networked: boolean) {}
    }

    class FileRep extends FileSystemObject {
      constructor(path: string, public content: string) {
        super(path, false);
      }
    }

    class Directory extends FileSystemObject {
      children: FileSystemObject[] = [];
    }

    interface Networked {
      host: string;
    }

    const fso: FileSystemObject = new FileSystemObject('foo/bar.txt', 'foo');

    if (fso.isFile()) {
      fso.content; //-> const fso: FileRep
    } else if (fso.isDirectory()) {
      fso.children; //-> const fso: Directory
    } else if (fso.isNetworked()) {
      fso.host; //-> const fso: Networked & FileSystemObject
    }

    //--

    class Box<Type> {
      value?: Type;

      hasValue(): this is { value: Type } {
        return this.value !== undefined;
      }
    }

    const box = new Box();
    box.value = 'GameBoy';

    box.value; //-> (property) Box<unknown>.value?: unknown

    if (box.hasValue()) {
      box.value; //-> (property) value: unknown
    }
  }
}

// Parameter properties
{
  class Parameters {
    constructor(public readonly x: number, protected y: number, private z: number) {
      // no body necessary
    }
  }

  const a = new Parameters(1, 2, 3);
  console.log(a.x); //-> (property) Parameters.x: number
  console.log(a.y);
  /*            ^? Property 'y' is protected
                and only accessible within class
                'Parameters' and its subclasses
  */
  console.log(a.z); //-> Property 'z' is private and only accessible within class 'Parameters'
}

// Class expressions
{
  const someClass = class<Type> {
    content: Type;
    constructor(value: Type) {
      this.content = value;
    }
  };

  const m = new someClass('Hello world!'); //-> const m: someClass<string>
}

// 'abstract' classes and members
{
  abstract class Base {
    abstract getName(): string;

    printName() {
      console.log(`Hello ${this.getName()}`);
    }
  }

  const b = new Base(); //-> Cannot create an instance of an abstract class

  //--

  class Derived extends Base {
    getName() {
      return 'world';
    }
  }

  const d = new Derived();
  d.printName();

  class BadDerived extends Base {
    /*
    Non-abstract class 'BadDerived' does not
    implement inherited abstract member 'getName' from class 'Base'
    */
  }
}

// Abstract construct signatures
{
  abstract class Base {
    abstract getName(): string;

    printName() {
      console.log(`Hello ${this.getName()}`);
    }
  }

  class Derived extends Base {
    getName() {
      return 'world';
    }
  }

  function badGreet(ctor: typeof Base) {
    const instance = new ctor(); //-> Cannot create an instance of an abstract class
    instance.printName();
  }

  function goodGreet(ctor: new () => Base) {
    const instance = new ctor();
    instance.printName();
  }

  goodGreet(Derived);
  goodGreet(Base);
  /**
  Argument of type 'typeof Base' is not assignable to parameter of type 'new () => Base'.
  Cannot assign an abstract constructor type to a non-abstract constructor type
   */
}

// Relationship between classes
{
  class Point1 {
    x = 0;
    y = 0;
  }

  class Point2 {
    x = 0;
    y = 0;
  }

  const p: Point1 = new Point2(); // ok

  //--

  class Person {
    name: string;
    age: number;
  }

  class Employee {
    name: string;
    age: number;
    salary: number;
  }

  const p: Person = new Employee(); // ok

  //--

  class Empty {}

  function fn(x: Empty) {
    // can't do anything with 'x', so I won't
  }

  // all ok!
  fn(window);
  fn({});
  fn(fn);
}
