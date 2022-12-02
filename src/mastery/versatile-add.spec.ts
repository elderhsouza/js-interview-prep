
import { versatileAdd } from './versatile-add';

describe('versatileAdd', () => {
  test('add arguments', () => {
    expect(versatileAdd(3, 4)).toBe(7);
    expect(versatileAdd(10, 12)).toBe(22);
  });

  test('add with curried arguments', () => {
    expect(versatileAdd(3)(4)).toBe(7);
    expect(versatileAdd(10)(12)).toBe(22);
  });

  test('add with curried empty arguments', () => {
    expect(versatileAdd(3)()(4)).toBe(7);
    expect(versatileAdd(3)()()()(4)).toBe(7);

    expect(versatileAdd(10)()()()()()()()()()()()(12)).toBe(22);

    // TODO: make those tests pass, add support for first empty calls to curry function
    // expect(versatileAdd()(3)(4)).toBe(7);
    // expect(versatileAdd()()()()(10)(12)).toBe(22);

    // expect(versatileAdd()(3)()(4)).toBe(7);
    // expect(versatileAdd()()()()()(10)()()()(12)).toBe(22);
  });
});

export { };
