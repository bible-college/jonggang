// src/action/ActionNode.js

class ActionNode {
  constructor(command) {
    this.command = command;
  }

  execute(input) {
    if (!this.command || typeof this.command.execute !== 'function') {
      throw new Error('Command must implement execute()');
    }
    return this.command.execute(input);
  }

  getType() {
    return 'action';
  }
}

module.exports = ActionNode;
