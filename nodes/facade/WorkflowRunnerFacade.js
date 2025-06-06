// src/facade/WorkflowRunnerFacade.js
const { WorkflowExecutor, WorkflowComponent } = require('../core');
const AbstractTriggerNode = require('../nodes/triggers/AbstractTriggerNode');

/**
 * @class WorkflowRunnerFacade
 * 구성된 워크플로우를 실행하는 과정을 단순화하는 퍼사드 클래스.
 * 트리거 노드를 감지하고, 트리거 이벤트에 반응하여 워크플로우를 실행합니다.
 * (중지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 */
class WorkflowRunnerFacade {
    constructor() {
        this.executor = new WorkflowExecutor();
        // activeTriggers 맵은 이제 필요 없지만, 이전에 존재했으므로 명시적으로 제거하지는 않겠습니다.
        // 다만, stop 로직이 없으므로 이 맵에 등록되는 데이터는 외부에서 활용되지 않습니다.
        this.activeTriggers = new Map();
    }

    /**
     * 주어진 워크플로우 컴포넌트를 실행합니다.
     * 워크플로우 내에 트리거 노드가 있으면 해당 트리거를 시작합니다.
     * @param {WorkflowComponent} workflowComponent - 실행할 워크플로우의 최상위 컴포넌트 (예: SequentialWorkflow 인스턴스).
     */
    runWorkflow(workflowComponent) {
        if (!(workflowComponent instanceof WorkflowComponent)) {
            throw new Error("[RunnerFacade] 실행할 워크플로우는 WorkflowComponent 타입이어야 합니다.");
        }

        console.log("\n--- [RunnerFacade] 워크플로우 실행 요청 ---");

        const firstNode = workflowComponent.nodes ? workflowComponent.nodes[0] : null;

        if (firstNode instanceof AbstractTriggerNode) {
            console.log(`[RunnerFacade] 트리거 노드 '${firstNode.id}' 감지. 워크플로우 실행을 트리거에 위임.`);
            firstNode.setWorkflowToExecute(workflowComponent);

            const triggerListener = (payload) => {
                console.log(`[RunnerFacade] 트리거 노드 '${firstNode.id}'로부터 이벤트 발생. 워크플로우 실행 시작.`);
                this.executor.setWorkflow(workflowComponent);
                this.executor.runWorkflow();
                console.log(`[RunnerFacade] 트리거 노드 '${firstNode.id}' 워크플로우 실행 완료. 페이로드:`, payload);
            };

            firstNode.onTrigger(triggerListener);
            // activeTriggers 맵에 등록은 되지만, stop 로직이 없으므로 활용되지 않습니다.
            this.activeTriggers.set(firstNode.id, { triggerNode: firstNode, listener: triggerListener, workflow: workflowComponent });

            firstNode.execute();
            console.log(`[RunnerFacade] 트리거 노드 '${firstNode.id}' 감지 시작 지시 완료.`);

        } else {
            console.log("[RunnerFacade] 트리거 노드 없음. 워크플로우를 즉시 실행합니다.");
            this.executor.setWorkflow(workflowComponent);
            this.executor.runWorkflow();
        }

        console.log("--- [RunnerFacade] 워크플로우 실행 요청 완료 ---\n");
    }

    // stopTrigger() 메서드 삭제
    // stopAllTriggers() 메서드 삭제
}

module.exports = WorkflowRunnerFacade;