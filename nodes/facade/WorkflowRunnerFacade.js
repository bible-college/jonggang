
const WorkflowExecutor = require('../../core/WorkflowExecutor');
const AbstractTriggerNode = require('../triggers/AbstractTriggerNode');

class WorkflowRunnerFacade {
    constructor() {
        this.executor = new WorkflowExecutor();
        this.activeTriggers = new Map();
    }

    runWorkflow(workflowComponent) {
        const firstNode = (workflowComponent.nodes && workflowComponent.nodes.length > 0)
            ? workflowComponent.nodes[0]
            : null;

        if (firstNode instanceof AbstractTriggerNode) {
            console.log(`[RunnerFacade] 트리거 노드 감지: 워크플로우 실행을 트리거에 위임.`);

            firstNode.setWorkflowToExecute(workflowComponent);

            const triggerListener = (payload) => {
                console.log(`[RunnerFacade] 트리거 이벤트 발생: 워크플로우 실행 시작. (Payload: ${JSON.stringify(payload)})`);
                this.executor.setWorkflow(workflowComponent);
                this.executor.runWorkflow();
            };
            firstNode.onTrigger(triggerListener);
            this.activeTriggers.set(firstNode, { triggerNode: firstNode, listener: triggerListener, workflow: workflowComponent });
        } else {
            console.warn("[RunnerFacade] 워크플로우는 반드시 트리거 노드로 시작해야 합니다. 실행 중단.");
        }
    }
}

module.exports = WorkflowRunnerFacade;