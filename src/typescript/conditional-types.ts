/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
// file deepcode ignore UsageOfUndefinedReturnValue: <Snyk does not detect blocked scopes correctly>

{
  interface Animal {
    live(): void;
  }

  interface Dog extends Animal {
    woof(): void;
  }

  type Example1 = Dog extends Animal ? number : string; //-> type Example1 = number
  type Example2 = RegExp extends Animal ? number : string; //-> type Example2 = string
}

//---

type IdLabel = {
  id: number;
};

type NameLabel = {
  name: string;
};

{
  // overloaded without conditional type: bad

  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw new Error('not implemented');
  }
}

{
  // no overload needed with conditional type

  type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

  const idLabel: NameOrId<number> = { id: 24 }; // const idLabel: IdLabel
  const nameLabel: NameOrId<string> = { name: 'Elder' }; // const nameLabel: NameLabel

  //TODO: Why is TS complaining here?
  // Type guards are in place but it still complains about the returned objects

  // eslint-disable-next-line no-inner-declarations
  function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
    if (typeof nameOrId === 'number') {
      return { id: nameOrId }; // Type '{ id: number; }' is not assignable to type 'NameOrId<T>'
    } else {
      return { name: nameOrId }; // Type '{ name: string; }' is not assignable to type 'NameOrId<T>'
    }
  }

  const a = createLabel('abc'); //-> const a: NameLabel
  const b = createLabel(42); //-> const b: IdLabel
  const c = createLabel(Math.random() ? 'hello' : 42); //-> const c: IdLabel | NameLabel

  console.log(createLabel('typescript'));
  console.log(createLabel(2.8));
  console.log(createLabel(Math.random() ? 'hello' : 42));
}

// Conditional types constraints

{
  type BadMessageOf<T> = T['message']; // Type '"message"' cannot be used to index type 'T'
  type MessageOf<T extends { message: unknown }> = T['message'];

  interface Email {
    message: string;
  }

  type EmailMessageContents = MessageOf<Email>; //-> type EmailMessageContents = string
}

{
  type MessageOf<T> = T extends { message: unknown } ? T['message'] : never;

  interface Email {
    message: string;
  }

  interface Dog {
    bark(): void;
  }

  type EmailMessageContents = MessageOf<Email>; //-> type EmailMessageContents = string
  type DogMessageContents = MessageOf<Dog>; //-> type DogMessageContents = never

  //--

  type Flatten<T> = T extends unknown[] ? T[number] : T;

  type Str = Flatten<string[]>; // type Str = string
  type Num = Flatten<number>; // type Num = number
}

// Inferring with conditional types

{
  type Flatten<Type> = Type extends (infer Item)[] ? Item : Type;

  type FlatString = Flatten<string[]>; // type FlatString = string
  type FlatNumber = Flatten<number>; // type FlatNumber = number

  type GetReturnType<Type> = Type extends (...args: unknown[]) => infer Return
    ? Return
    : never;

  type Num = GetReturnType<() => number>; // type Num = number
  type Str = GetReturnType<(str: string) => string>; // type Str = string
  type Booleans = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // type Booleans = boolean[]
}

{
  function stringOrNum(x: number): string;
  function stringOrNum(x: string): number;
  function stringOrNum(x: number | string): number | string;
  function stringOrNum(x: number | string): number | string {
    switch (typeof x) {
      case 'string':
        return parseInt(x);
      case 'number':
        return String(x);
    }
  }

  type StringOrNumber = ReturnType<typeof stringOrNum>; //-> type StringOrNumber = string | number
}

// Distributive conditional types

{
  // distributive
  type ToArray<Type> = Type extends unknown ? Type[] : never;
  type StrArrOrNumArr = ToArray<string | number>; // type StrArrOrNumArr = string[] | number[]

  // non distributive
  type ToArrayNonDistributive<Type> = [Type] extends [unknown] ? Type[] : never;
  type StrArrOrNumArrNonDistributive = ToArrayNonDistributive<string | number>;
  // ^ type StrArrOrNumArrNonDistributive = (string | number)[]
}
