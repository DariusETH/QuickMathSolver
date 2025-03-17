const readline = require('readline');
const mathUtils = require('./math-utils');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('QuickMathSolver - Your simple math calculator');
console.log('Available functions: sqrt(), factorial(), sin(), cos(), tan(), log(), log10()');
console.log('Constants: PI, E');
console.log('Type "exit" to quit\n');

function calculate(expression) {
  try {
    // Replace function names with mathUtils calls
    let processedExp = expression
      .replace(/sqrt\(/g, 'mathUtils.sqrt(')
      .replace(/factorial\(/g, 'mathUtils.factorial(')
      .replace(/sin\(/g, 'mathUtils.sin(')
      .replace(/cos\(/g, 'mathUtils.cos(')
      .replace(/tan\(/g, 'mathUtils.tan(')
      .replace(/log10\(/g, 'mathUtils.log10(')
      .replace(/log\(/g, 'mathUtils.log(')
      .replace(/PI/g, 'mathUtils.PI')
      .replace(/E/g, 'mathUtils.E');

    const result = eval(processedExp);
    return result;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

function promptUser() {
  rl.question('Enter math expression: ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Thanks for using QuickMathSolver!');
      rl.close();
      return;
    }

    const result = calculate(input);
    console.log(`Result: ${result}\n`);
    promptUser();
  });
}

promptUser();