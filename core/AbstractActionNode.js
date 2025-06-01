// src/core/AbstractActionNode.js

const AbstractNode = require('./AbstractNode');

class AbstractActionNode extends AbstractNode {
  constructor(command) {
    super();
    this.command = command;
  }

  execute(input) {
    if (!this.command || typeof this.command.execute !== 'function') {
      throw new Error('ActionNode: 유효한 command 객체가 필요합니다.');
    }
    return this.command.execute(input);
  }

  getType() {
    return 'action';
  }
}

module.exports = AbstractActionNode;
