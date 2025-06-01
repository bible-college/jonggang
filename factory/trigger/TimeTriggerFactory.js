// src/factory/trigger/TimeTriggerFactory.js

const AbstractTriggerFactory = require('../abstract/AbstractTriggerFactory');
const TimeTriggerCommand = require('../../command/TimeTriggerCommand');

class TimeTriggerFactory extends AbstractTriggerFactory {
  createCommand() {
    return new TimeTriggerCommand();
  }

  getDisplayName() {
    return '시간 기반 트리거';
  }
}

module.exports = TimeTriggerFactory;
