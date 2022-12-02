
type PartialTuple<
  Tuple extends any[],
  Extracted extends any[] = []
> = Tuple extends [infer NextParam, ...infer Remaining]
  ? PartialTuple<Remaining, [...Extracted, NextParam?]>
  : [...Extracted, ...Tuple];

type PartialParameters<
  Fn extends (...args: any[]) => any
> = PartialTuple<Parameters<Fn>>;

type RemainingParameters<
  Provided extends any[],
  Expected extends any[]
> = Expected extends [infer E1, ...infer Ex]
  ? Provided extends [infer P1, ...infer Px]
    ? P1 extends E1 ? RemainingParameters<Px, Ex>
    : never
  : Expected
  : [];

type CurriedOrReturnValue<
  Provided extends any[],
  Fn extends (...args: any[]) => any
> = RemainingParameters<Provided, Parameters<Fn>> extends [any, ...any[]]
    ? Curried<Provided, Fn>
    : ReturnType<Fn>;

type Curried<
  Provided extends any[],
  Fn extends (...args: any[]) => any
> = <NewArgs extends PartialTuple<RemainingParameters<Provided, Parameters<Fn>>>>
 (...args: NewArgs) => CurriedOrReturnValue<[...Provided, ...NewArgs], Fn>;

export function curry<
  Fn extends (...args: any[]) => any,
  StartingArgs extends PartialParameters<Fn>
>(fn: Fn,  arity: number = fn.length, ...args: StartingArgs):
  Curried<StartingArgs, Fn>
{
  return arity <= args.length
    ? fn(...args)
    : curry.bind(null, fn, arity, ...args as PartialParameters<Fn>);
}

/*
  TODO
  - add edge case support for curried calls with empty arguments as the first call
    eg: ()()()()(10)(12) or ()(3)()(4)
  - fix typings removing 'any'
*/
