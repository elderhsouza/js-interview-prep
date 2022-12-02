/* eslint-disable @typescript-eslint/no-unused-vars */

{
  interface Horse {
    name: string;
  }

  type OnlyBooleansAndHorses = {
    [key: string]: boolean | Horse;
  };

  const conforms: OnlyBooleansAndHorses = {
    del: true,
    rodney: false,
    horse: {
      name: 'Azalea',
    },
  };
}

{
  type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
  };

  type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
  };

  type FeatureOptions = OptionsFlags<FeatureFlags>;
  /*
  type FeatureOptions = {
    darkMode: boolean;
    newUserProfile: boolean;
  }
  */

  const featureFlags: FeatureOptions = {
    darkMode: true,
    newUserProfile: false,
  };
}

// Mapping modifiers

{
  type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
  };

  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };
  /*
  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  }
  */

  type UnlockedAccount = CreateMutable<LockedAccount>;
  /*
  type UnlockedAccount = {
    id: string;
    name: string;
  }
  */

  type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
  };

  type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
  };

  type User = Concrete<MaybeUser>;
  /*
  type User = {
    id: string;
    name: string;
    age: number;
  }
  */
}

// Key remapping via 'as'

{
  type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
  };

  interface Person {
    name: string;
    age: number;
    location: string;
  }

  type LazyPerson = Getters<Person>;
  /*
  type LazyPerson = {
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
  }
  */

  //

  type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, 'kind'>]: Type[Property];
  };

  interface Circle {
    kind: 'circle';
    radius: number;
  }

  type KindlessCircle = RemoveKindField<Circle>;
  /*
  type KindlessCircle = {
    radius: number;
  }
  */

  type EventConfig<Events extends { kind: string }> = {
    [E in Events as E['kind']]: (event: E) => void;
  };

  type SquareEvent = { kind: 'square'; x: number; y: number };
  type CircleEvent = { kind: 'circle'; radius: number };

  type Config = EventConfig<SquareEvent | CircleEvent>;
  /*
  type Config = {
    square: (event: SquareEvent) => void;
    circle: (event: CircleEvent) => void;
  }
  */

  //--

  type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
  };

  type DBFields = {
    id: { format: 'incrementing' };
    name: { type: string; pii: true };
  };

  type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
  /*
  type ObjectsNeedingGDPRDeletion = {
    id: false;
    name: true;
  }
  */
}
