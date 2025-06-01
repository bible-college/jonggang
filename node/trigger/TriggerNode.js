class TriggerNode {
  constructor(command) {
    this.command = command;
  }

  execute() {
    if (!this.command || typeof this.command.execute !== 'function') {
      throw new Error('Command must implement execute()');
    }
    return this.command.execute();
  }

  getType() {
    return 'trigger';
  }
}

module.exports = TriggerNode;
