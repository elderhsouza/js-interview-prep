/* eslint-disable no-inner-declarations */
{
  type World = 'World';
  type Greeting = `hello ${World}`; //-> type Greeting = "hello World"
}

{
  type EmailLocaleIDs = 'welcome_email' | 'email_heading';
  type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';

  type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
  /*
  type AllLocaleIDs =
    "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
  */

  type Lang = 'en' | 'ja' | 'pt';
  type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
  /*
  type LocaleMessageIDs =
    "en_welcome_email_id" | "en_email_heading_id"  |
    "en_footer_title_id"  | "en_footer_sendoff_id" |
    "ja_welcome_email_id" | "ja_email_heading_id"  |
    "ja_footer_title_id"  | "ja_footer_sendoff_id" |
    "pt_welcome_email_id" | "pt_email_heading_id"  |
    "pt_footer_title_id"  | "pt_footer_sendoff_id"
  */
}

// String union in types
{
  type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: unknown) => void): void;
  };

  function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type> {
    throw new Error('not implemented');
  }

  const person = makeWatchedObject({
    firstName: 'Saoirse',
    lastName: 'Ronan',
    age: 26,
  });

  person.on('firstNameChanged', (newValue) => {
    console.log(`firstName was changed to ${newValue}`);
  });
  /*
  on(
    eventName: "firstNameChanged" | "lastNameChanged" | "ageChanged",
    callback: (newValue: unknown) => void): void
  */

  // prevents typos on parameters
  person.on('firstName', () => {});
  /*
  Argument of type '"firstName"' is not assignable to parameter
  of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'
  */
  person.on('agechanged', () => {});
  /*
  Argument of type '"agechanged"' is not assignable to parameter
  of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.
  */
}

// Inference with template literals
{
  type PropEventSource<Type> = {
    on<Key extends string & keyof Type>(
      eventName: `${Key}Changed`,
      callback: (newValue: Type[Key]) => void
    ): void;
  };

  function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type> {
    throw new Error('not implemented');
  }

  const person = makeWatchedObject({
    firstName: 'Saoirse',
    lastName: 'Ronan',
    age: 26,
  });

  person.on('firstNameChanged', (newName) => {
    //                           ^? (parameter) newName: string
    console.log(`new name is ${newName.toUpperCase()}`);
  });

  person.on('ageChanged', (newAge) => {
    //                     ^? (parameter) newAge: number
    if (newAge < 0) {
      console.warn('warning! negative age.');
    }
  });
}

// Intrinsic string manipulation types
{
  //Uppercase
  type Greeting = 'Hello World';
  type ShoutyGreeting = Uppercase<Greeting>; //-> type ShoutyGreeting = "HELLO WORLD"

  type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
  type MainID = ASCIICacheKey<'my_app'>; //-> type MainID = "ID-MY_APP"
}

{
  // Lowercase
  type Greeting = 'Hello world';
  type QuietGreeting = Lowercase<Greeting>; //-> type QuietGreeting = "hello world"

  type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`;
  type MainID = ASCIICacheKey<'MY_APP'>; //-> type MainID = "id-my_app"
}

{
  // Capitalize
  type LowerCaseString = 'hello world!';
  type Greeting = Capitalize<LowerCaseString>; //-> type Greeting = "Hello world!"
}

{
  // Uncapitalize
  type UpperCaseGreeting = 'HELLO WORLD';
  type UncomfortableGreeting = Uncapitalize<UpperCaseGreeting>;
  //                           ^? type UncomfortableGreeting = "hELLO WORLD"
}
