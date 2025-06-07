
const WorkflowExecutor = require('../core/WorkflowExecutor');
const AbstractTriggerNode = require('../nodes/triggers/AbstractTriggerNode');

/**
 * @class WorkflowRunnerFacade
 * 구성된 워크플로우를 실행하는 과정을 단순화하는 퍼사드 클래스.
 * 트리거 노드를 감지하고, 트리거 이벤트에 반응하여 워크플로우를 실행합니다.
 * (설계 패턴 예시를 위해 중지 로직은 포함하지 않고 최소화된 동작만 수행)
 */
class WorkflowRunnerFacade {
    constructor() {
        this.executor = new WorkflowExecutor();

        this.activeTriggers = new Map();
    }
    runWorkflow(workflowComponent) {
        const firstNode = workflowComponent.nodes ? workflowComponent.nodes[0] : null;

        if (firstNode instanceof AbstractTriggerNode) {
            console.log(`[RunnerFacade] 트리거 노드 감지. 워크플로우 실행을 트리거에 위임합니다.`);
            firstNode.setWorkflowToExecute(workflowComponent);

            const triggerListener = (payload) => {
                console.log(`[RunnerFacade] 트리거 노드로부터 이벤트 발생. 워크플로우 실행 시작.`);
                this.executor.setWorkflow(workflowComponent);
                this.executor.runWorkflow();
            };

            firstNode.onTrigger(triggerListener);
            this.activeTriggers.set(firstNode, { triggerNode: firstNode, listener: triggerListener, workflow: workflowComponent });

            firstNode.execute(); // 트리거에게 감지 시작을 지시 (또는 트리거 발동을 시뮬레이션).

        } else {
            console.log("[RunnerFacade] 트리거 노드 없음. 워크플로우를 즉시 실행합니다.");
            this.executor.setWorkflow(workflowComponent);
            this.executor.runWorkflow();
        }
    }
}

module.exports = WorkflowRunnerFacade;