// src/node/action/SlackActionNode.js

const AbstractActionNode = require('../../core/AbstractActionNode');

class SlackActionNode extends AbstractActionNode {
  constructor(command) {
    super(command);
  }

  getType() {
    return 'slack-action';
  }
}

module.exports = SlackActionNode;
