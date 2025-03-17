// Math utility functions
const mathUtils = {
  // Basic operations
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  },

  // Advanced operations
  power: (base, exp) => Math.pow(base, exp),
  sqrt: (n) => {
    if (n < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(n);
  },
  factorial: (n) => {
    if (n < 0) {
      throw new Error('Factorial is not defined for negative numbers');
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  },

  // Trigonometric functions (in radians)
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),

  // Logarithmic functions
  log: (x) => Math.log(x),
  log10: (x) => Math.log10(x),

  // Constants
  PI: Math.PI,
  E: Math.E
};

module.exports = mathUtils;