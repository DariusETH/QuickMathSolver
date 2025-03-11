const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('QuickMathSolver - Your simple math calculator');
console.log('Type "exit" to quit\n');

function calculate(expression) {
  try {
    // Simple eval for basic math operations
    const result = eval(expression);
    return result;
  } catch (error) {
    return 'Error: Invalid expression';
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