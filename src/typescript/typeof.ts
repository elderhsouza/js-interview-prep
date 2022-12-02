console.log(typeof 'Hello World');

const s = 'hello';
console.log(s);

const n: typeof s = 'hello';
console.log(n);

//---

// type Predicate = (x: unknown) => boolean;
// type K = ReturnType<Predicate>;

function fn() {
  return { x: 10, y: 3 };
}
type Coords = ReturnType<typeof fn>;

const coords: Coords = { x: 20, y: 40 };
console.log(coords);

// limitations

// Meant to use = ReturnType<typeof msgbox>
// ',' expected.
const shouldContinue: typeof msgbox("Are you sure you want to continue?");