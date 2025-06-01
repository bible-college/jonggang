// src/core/AbstractTriggerNode.js

const AbstractNode = require('./AbstractNode');

class AbstractTriggerNode extends AbstractNode {
  constructor(command) {
    super();
    this.command = command;
  }

  execute() {
    if (!this.command || typeof this.command.execute !== 'function') {
      throw new Error('TriggerNode: 유효한 command 객체가 필요합니다.');
    }
    return this.command.execute();
  }

  getType() {
    return 'trigger';
  }
}

module.exports = AbstractTriggerNode;
