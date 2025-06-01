// src/factory/abstract/AbstractTriggerFactory.js

class AbstractTriggerFactory {
  createCommand() {
    throw new Error('createCommand() must be implemented');
  }

  getDisplayName() {
    throw new Error('getDisplayName() must be implemented');
  }
}

module.exports = AbstractTriggerFactory;
