const readline = require('readline');
const mathUtils = require('./math-utils');
const InputValidator = require('./input-validator');
const CalculationHistory = require('./history');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const validator = new InputValidator();
const history = new CalculationHistory();

console.log('QuickMathSolver - Your simple math calculator');
console.log('Available functions: sqrt(), factorial(), sin(), cos(), tan(), log(), log10()');
console.log('Constants: PI, E');
console.log('Commands: "history" to show recent calculations, "clear" to clear history');
console.log('Type "exit" to quit\n');

function calculate(expression) {
  try {
    // Validate input first
    const validation = validator.validate(expression);
    if (!validation.valid) {
      return `Input Error: ${validation.error}`;
    }

    // Replace function names with mathUtils calls
    let processedExp = validation.cleanedInput
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
    return `Calculation Error: ${error.message}`;
  }
}

function promptUser() {
  rl.question('Enter math expression: ', (input) => {
    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === 'exit') {
      console.log('Thanks for using QuickMathSolver!');
      rl.close();
      return;
    }

    if (trimmedInput === 'history') {
      console.log(history.showHistory());
      promptUser();
      return;
    }

    if (trimmedInput === 'clear') {
      history.clearHistory();
      console.log('History cleared!\n');
      promptUser();
      return;
    }

    const result = calculate(input);
    console.log(`Result: ${result}\n`);

    // Save to history if calculation was successful
    if (!result.toString().startsWith('Input Error:') && !result.toString().startsWith('Calculation Error:')) {
      history.addCalculation(input, result);
    }

    promptUser();
  });
}

promptUser();