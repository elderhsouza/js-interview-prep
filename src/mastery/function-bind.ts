
export function bind(fn: FunctionConstructor, context: object, ...boundArgs: string[]) {
  return (...args: string[]) => {
    return fn.apply(context, [...boundArgs, ...args]);
  };
}
