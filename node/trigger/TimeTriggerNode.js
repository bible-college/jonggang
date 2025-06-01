// src/node/trigger/TimeTriggerNode.js

const AbstractTriggerNode = require('../../core/AbstractTriggerNode');

class TimeTriggerNode extends AbstractTriggerNode {
  constructor(command) {
    super(command);
  }

  getType() {
    return 'time-trigger';
  }
}

module.exports = TimeTriggerNode;
