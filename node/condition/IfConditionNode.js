// src/node/condition/IfConditionNode.js

const AbstractNode = require('../../core/AbstractNode');

class IfConditionNode extends AbstractNode {
  constructor(conditionStrategy) {
    super();
    this.conditionStrategy = conditionStrategy;
  }

  execute(input) {
    if (!this.conditionStrategy || typeof this.conditionStrategy.evaluate !== 'function') {
      throw new Error('Condition strategy는 evaluate() 메서드를 가져야 합니다.');
    }

    const result = this.conditionStrategy.evaluate(input);
    console.log(`[Condition] 결과: ${result}`);
    return result;
  }

  getType() {
    return 'condition';
  }
}

module.exports = IfConditionNode;
