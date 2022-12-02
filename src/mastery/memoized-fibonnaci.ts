
function memoize(fn) {
  const cache = new Map();

  const cached = function (val) {
    return cache.has(val)
      ? cache.get(val)
      : cache.set(val, fn(val)) && cache.get(val);
  };
  cached.cache = cache;

  return cached;
}

export function fibonacci(n: number): number[] | null {
  if (n < 1) {
    return null;
  }

  return Array.from({ length: n }).reduce<number []>(
    (acc, _, index) => acc.concat(
      index > 1
        ? acc[index - 1] + acc[index - 2]
        : index
    ),
    []
  );
}

const memoFibonacci = memoize(fibonacci);

memoFibonacci(100); /*?.*/
memoFibonacci(100); /*?.*/