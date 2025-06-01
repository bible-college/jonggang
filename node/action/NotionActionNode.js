// src/node/action/NotionActionNode.js

const AbstractActionNode = require('../../core/AbstractActionNode');

class NotionActionNode extends AbstractActionNode {
  constructor(command) {
    super(command);
  }

  getType() {
    return 'notion-action';
  }
}

module.exports = NotionActionNode;
