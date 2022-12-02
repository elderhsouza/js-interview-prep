import { deepEquals } from './deep-equals';
describe('deepEquals', () => {
    test('NaN is only equal to NaN', () => {
        expect(deepEquals(NaN, NaN)).toBe(true);
    });
    test('null is only equal to null', () => {
        expect(deepEquals(null, null)).toBe(true);
    });
    test('undefined is only equal to undefined', () => {
        expect(deepEquals(undefined, undefined)).toBe(true);
    });
    test('same value numbers are equal', () => {
        expect(deepEquals(123, 123)).toBe(true);
    });
    test('same value strings are equal', () => {
        expect(deepEquals('abc', 'abc')).toBe(true);
    });
    test('all Symbols are unequal', () => {
        expect(deepEquals(Symbol(), Symbol())).toBe(false);
    });
    test('values from different types are unequal', () => {
        expect(deepEquals(123, 'abc')).toBe(false);
    });
    test('different value numbers are unequal', () => {
        expect(deepEquals(123, 456)).toBe(false);
    });
    test('empty objects are equal', () => {
        expect(deepEquals({}, {})).toBe(true);
    });
    test('empty arrays are equal', () => {
        expect(deepEquals([], [])).toBe(true);
    });
    test('arrays with the same values in the same positions are equal', () => {
        expect(deepEquals([123], [123])).toBe(true);
    });
    test('arrays with different values in the same positions are unequal', () => {
        expect(deepEquals([123, 456], [123, 789])).toBe(false);
    });
    test('arrays with different lengths are unequal', () => {
        expect(deepEquals([123], [123, 456])).toBe(false);
    });
    describe('nested arrays', () => {
        test('same values with the same literal types in the same positions are equal', () => {
            expect(deepEquals([[1, 2], [3], [4, [5]]], [[1, 2], [3], [4, [5]]])).toBe(true);
        });
        test('same values with complex types in the same positions are equal', () => {
            expect(deepEquals([
                [1, 2], [3, {}], null, [4, [5, { a: 'a', b: 'b' }]], undefined
            ], [
                [1, 2], [3, {}], null, [4, [5, { a: 'a', b: 'b' }]], undefined
            ])).toBe(true);
        });
        test('different values with complex types in any position are unequal', () => {
            expect(deepEquals([
                [1, 2], [3, {}], null, [4, [5, { a: 'a', b: 'b' }]], undefined
            ], [
                [1, 2], [3, {}], null, [4, [5, { a: 'a', b: 'b', c: 'c' }]], undefined
            ])).toBe(false);
        });
    });
    test('objects with the same properties and values are equal', () => {
        expect(deepEquals({ a: 123 }, { a: 123 })).toBe(true);
    });
    test('objects with the same properties but different values are unequal', () => {
        expect(deepEquals({ a: 123 }, { a: 456 })).toBe(false);
    });
    test('objects with more properties than the other are unequal', () => {
        expect(deepEquals({ a: 123 }, { a: 123, b: 456 })).toBe(false);
    });
    describe('nested objects', () => {
        test('with common literal types', () => {
            expect(deepEquals({
                a: 123, b: ['abc', 'def', 'ghi']
            }, {
                a: 123, b: ['abc', 'def', 'ghi']
            })).toBe(true);
        });
        test('with common literal types and "array, null | undefined | NaN"', () => {
            expect(deepEquals({
                a: 123,
                b: ['abc', { a: null, b: [undefined, [NaN]] }]
            }, {
                a: 123,
                b: ['abc', { a: null, b: [undefined, [NaN]] }]
            })).toBe(true);
        });
    });
});
//# sourceMappingURL=deep-equals.spec.js.map