{
  type Person = { age: number; name: string; alive: boolean };
  type Age = Person['age'];

  type I1 = Person['age' | 'name'];
  type I2 = Person[keyof Person];

  type AliveOrName = 'alive' | 'name';
  type I3 = Person[AliveOrName];
}

{
  const persons = [
    { name: 'Alice', age: 15 },
    { name: 'Bob', age: 23 },
    { name: 'Eve', age: 38 },
    {name: 'Elder', age: 38, nice: true}
  ];

  type Person = typeof persons[number];
  {
    type Age = typeof persons[number]['age'];
    type Age2 = Person['age'];
  }

  {
    const key = 'age';
    type Age = Person[key];
    /*
    Type 'key' cannot be used as an index type.
    'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?
    */

    type key2 = 'age';
    type Age2 = Person[key2];
  }
}
