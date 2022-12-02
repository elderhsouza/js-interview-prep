type Point = { x: number; y: number };
type P = keyof Point;

const point1: Point = { x: 10, y: 100 };
console.log(point1);

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [K: string]: boolean};
type M = keyof Mapish;
