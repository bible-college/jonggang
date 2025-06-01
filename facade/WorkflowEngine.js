// src/facade/WorkflowEngine.js

class WorkflowEngine {
  constructor(triggerFactory, actionFactories = []) {
    this.triggerFactory = triggerFactory;
    this.actionFactories = actionFactories;
  }

  run() {
    const triggerCommand = this.triggerFactory.createCommand();
    const triggerResult = triggerCommand.execute();

    for (const factory of this.actionFactories) {
      const command = factory.createCommand();
      const schema = factory.createInputSchema();
      const formatter = factory.createFormatter();

      // 단순히 트리거 결과를 그대로 넘김 (실제 환경에서는 매핑 필요)
      const input = triggerResult;

      // 실행
      const result = command.execute(input);
      const output = formatter.format(result);

      console.log(`[${factory.getDisplayName()}] 실행 결과:`, output);
    }
  }
}

module.exports = WorkflowEngine;
