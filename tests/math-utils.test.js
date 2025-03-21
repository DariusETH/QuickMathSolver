const mathUtils = require('../math-utils');

describe('Math Utils', () => {
  test('basic addition', () => {
    expect(mathUtils.add(2, 3)).toBe(5);
  });

  test('basic subtraction', () => {
    expect(mathUtils.subtract(5, 3)).toBe(2);
  });

  test('basic multiplication', () => {
    expect(mathUtils.multiply(4, 5)).toBe(20);
  });

  test('basic division', () => {
    expect(mathUtils.divide(10, 2)).toBe(5);
  });

  test('division by zero throws error', () => {
    expect(() => mathUtils.divide(10, 0)).toThrow('Division by zero');
  });

  test('power function', () => {
    expect(mathUtils.power(2, 3)).toBe(8);
  });

  test('square root function', () => {
    expect(mathUtils.sqrt(9)).toBe(3);
    expect(mathUtils.sqrt(16)).toBe(4);
  });

  test('square root of negative number throws error', () => {
    expect(() => mathUtils.sqrt(-1)).toThrow('Cannot calculate square root of negative number');
  });

  test('factorial function', () => {
    expect(mathUtils.factorial(0)).toBe(1);
    expect(mathUtils.factorial(1)).toBe(1);
    expect(mathUtils.factorial(5)).toBe(120);
  });

  test('factorial of negative number throws error', () => {
    expect(() => mathUtils.factorial(-1)).toThrow('Factorial is not defined for negative numbers');
  });

  test('trigonometric functions', () => {
    expect(mathUtils.sin(0)).toBeCloseTo(0);
    expect(mathUtils.cos(0)).toBeCloseTo(1);
    expect(mathUtils.tan(0)).toBeCloseTo(0);
  });

  test('logarithmic functions', () => {
    expect(mathUtils.log(Math.E)).toBeCloseTo(1);
    expect(mathUtils.log10(10)).toBeCloseTo(1);
  });

  test('constants', () => {
    expect(mathUtils.PI).toBeCloseTo(Math.PI);
    expect(mathUtils.E).toBeCloseTo(Math.E);
  });
});