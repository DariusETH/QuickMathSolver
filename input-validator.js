// Input validation and preprocessing module
class InputValidator {
  constructor() {
    this.allowedChars = /^[0-9+\-*/().\s\w]*$/;
    this.dangerousPatterns = [
      /require\s*\(/,
      /import\s+/,
      /eval\s*\(/,
      /function\s*\(/,
      /=\s*>/,
      /\.\s*constructor/,
      /\.\s*prototype/,
      /\[\s*["'].*["']\s*\]/
    ];
  }

  // Check if input contains only allowed characters
  isValidCharacters(input) {
    return this.allowedChars.test(input);
  }

  // Check for dangerous patterns that could be malicious
  hasDangerousPatterns(input) {
    return this.dangerousPatterns.some(pattern => pattern.test(input));
  }

  // Clean and normalize input
  cleanInput(input) {
    return input
      .trim()
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .replace(/(\d)\s*([a-zA-Z])/g, '$1*$2');  // Add multiplication for cases like "2x"
  }

  // Main validation function
  validate(input) {
    if (!input || input.trim().length === 0) {
      return { valid: false, error: 'Empty input' };
    }

    const cleanedInput = this.cleanInput(input);

    if (!this.isValidCharacters(cleanedInput)) {
      return { valid: false, error: 'Invalid characters detected' };
    }

    if (this.hasDangerousPatterns(cleanedInput)) {
      return { valid: false, error: 'Potentially dangerous input detected' };
    }

    // Check for balanced parentheses
    let balance = 0;
    for (let char of cleanedInput) {
      if (char === '(') balance++;
      if (char === ')') balance--;
      if (balance < 0) {
        return { valid: false, error: 'Unbalanced parentheses' };
      }
    }

    if (balance !== 0) {
      return { valid: false, error: 'Unbalanced parentheses' };
    }

    return { valid: true, cleanedInput };
  }
}

module.exports = InputValidator;