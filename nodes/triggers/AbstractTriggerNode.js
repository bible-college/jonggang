// src/nodes/triggers/AbstractTriggerNode.js
const WorkflowComponent = require('../../core/WorkflowComponent');


class AbstractTriggerNode extends WorkflowComponent {
    constructor() {
        super();
        if (new.target === AbstractTriggerNode) {
            throw new TypeError("Abstract class 'AbstractTriggerNode' cannot be instantiated directly.");
        }

        this.workflowToExecute = null;
        this.triggerCallback = () => {}; // RunnerFacade가 등록할 콜백 함수
    }

    setWorkflowToExecute(workflow) {
        this.workflowToExecute = workflow;
    }


    onTrigger(listener) {
        this.triggerCallback = listener;
        console.log(`[AbstractTriggerNode] 외부 트리거 리스너 등록됨.`);
    }

    execute() {
        throw new Error("Method 'execute()' must be implemented by concrete trigger nodes.");
    }
}

module.exports = AbstractTriggerNode;