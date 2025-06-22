
const Node = require('../../core/Node');


class AbstractTriggerNode extends Node {
    constructor() {
        super();
        this.workflowToExecute = null;
        this.triggerCallback = () => {}; // RunnerFacade가 등록할 콜백 함수
    }

    setWorkflowToExecute(workflow) {
        this.workflowToExecute = workflow;
    }

    onTrigger(listener) {
        this.triggerCallback = listener;
    }

    execute() {
        throw new Error("메서드 'execute()'는 구체적인 트리거 노드에 의해 구현되어야 합니다.");
    }
}

module.exports = AbstractTriggerNode;