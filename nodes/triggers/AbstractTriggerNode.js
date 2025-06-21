
const WorkflowComponent = require('../../core/WorkflowComponent');

class AbstractTriggerNode extends WorkflowComponent {
    constructor() {
        super();
        if (new.target === AbstractTriggerNode) {
            throw new TypeError("추상 클래스 'AbstractTriggerNode'는 직접 인스턴스화할 수 없습니다.");
        }

        this.workflowToExecute = null;
        this.triggerCallback = () => {};
    }

    setWorkflowToExecute(workflow) {
        this.workflowToExecute = workflow;
    }

    onTrigger(listener) {
        this.triggerCallback = listener;
        console.log(`[AbstractTriggerNode] 외부 트리거 리스너 등록됨. (트리거 노드의 triggerCallback에 연결)`);
    }

    execute() {
        throw new Error("메서드 'execute()'는 구체적인 트리거 노드에 의해 구현되어야 합니다.");
    }
}

module.exports = AbstractTriggerNode;