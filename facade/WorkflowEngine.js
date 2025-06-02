// src/facade/WorkflowEngine.js

class WorkflowEngine {
  constructor(triggerFactory, platformFactory, featureKeyList = []) {
    this.triggerFactory = triggerFactory;             // ex: TimeTriggerFactory
    this.platformFactory = platformFactory;           // ex: SlackFeatureFactory
    this.featureKeyList = featureKeyList;             // ex: ['sendMessage', 'readMessage']
  }

  run() {
    const triggerCommand = this.triggerFactory.createCommand();
    const triggerResult = triggerCommand.execute();

    for (const featureKey of this.featureKeyList) {
      const factory = this.platformFactory.getFactoryByName(featureKey);
      const command = factory.createCommand();

      // 트리거 결과를 그대로 넘김 (실제 환경에서는 매핑 필요)
      const input = triggerResult;

      const result = command.execute(input);
      console.log(`[${factory.getDisplayName()}] 실행 결과:`, result);
    }
  }
}

module.exports = WorkflowEngine;
