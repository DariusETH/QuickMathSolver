const fs = require('fs');
const path = require('path');

class CalculationHistory {
  constructor() {
    this.historyFile = path.join(__dirname, 'calculation_history.json');
    this.history = this.loadHistory();
  }

  loadHistory() {
    try {
      if (fs.existsSync(this.historyFile)) {
        const data = fs.readFileSync(this.historyFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.log('Failed to load history, starting fresh');
    }
    return [];
  }

  saveHistory() {
    try {
      fs.writeFileSync(this.historyFile, JSON.stringify(this.history, null, 2));
    } catch (error) {
      console.log('Failed to save history');
    }
  }

  addCalculation(expression, result) {
    const entry = {
      expression,
      result,
      timestamp: new Date().toISOString()
    };

    this.history.push(entry);

    // Keep only last 50 calculations
    if (this.history.length > 50) {
      this.history = this.history.slice(-50);
    }

    this.saveHistory();
  }

  getHistory() {
    return this.history;
  }

  getLastCalculations(count = 10) {
    return this.history.slice(-count);
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
  }

  showHistory(count = 10) {
    const recent = this.getLastCalculations(count);
    if (recent.length === 0) {
      return 'No calculation history found.';
    }

    let output = `\nLast ${recent.length} calculations:\n`;
    output += '─'.repeat(50) + '\n';

    recent.forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleString();
      output += `${index + 1}. ${entry.expression} = ${entry.result}\n`;
      output += `   ${date}\n\n`;
    });

    return output;
  }
}

module.exports = CalculationHistory;