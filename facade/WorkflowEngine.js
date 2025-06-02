const MultiActionNode = require('../node/composite/MultiActionNode');

class WorkflowEngine {
  constructor(triggerFactory, actionFactories = []) {
    this.triggerFactory = triggerFactory;
    this.actionFactories = actionFactories;
  }

  run() {
    const triggerCommand = this.triggerFactory.createCommand();
    const triggerResult = triggerCommand.execute();

    const multiAction = new MultiActionNode();

    for (const factory of this.actionFactories) {
      const command = factory.createCommand();

      const actionNode = {
        execute(input) {
          const result = command.execute(input);
          console.log(`[${factory.getDisplayName()}] 실행 결과:`, result);
          return result;
        }
      };

      multiAction.add(actionNode);
    }

    multiAction.execute(triggerResult);
  }
}

module.exports = WorkflowEngine;
