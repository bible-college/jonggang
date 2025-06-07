// src/facade/WorkflowRunnerFacade.js
const WorkflowExecutor = require('../core/WorkflowExecutor');
const AbstractTriggerNode = require('../nodes/triggers/AbstractTriggerNode');

class WorkflowRunnerFacade {
    constructor() {
        this.executor = new WorkflowExecutor();
        // activeTriggers는 현재 설계 패턴 설명을 위해 필수적인 요소는 아니므로,
        // 필요하다면 제거하거나 단순화할 수 있습니다. 여기서는 일단 유지합니다.
        this.activeTriggers = new Map();
    }

    runWorkflow(workflowComponent) {
        // 워크플로우의 첫 번째 노드가 존재하고 트리거 노드인지 확인합니다.
        // 이는 워크플로우가 시작되는 방식을 단순화하는 퍼사드의 책임입니다.
        const firstNode = (workflowComponent.nodes && workflowComponent.nodes.length > 0)
            ? workflowComponent.nodes[0]
            : null;

        // --- 퍼사드가 제공하는 단순화된 실행 로직 ---
        if (firstNode instanceof AbstractTriggerNode) {
            console.log(`[RunnerFacade] 트리거 노드 감지: 워크플로우 실행을 트리거에 위임.`);

            // 1. 트리거 노드에게 실행할 워크플로우를 연결합니다.
            firstNode.setWorkflowToExecute(workflowComponent);

            // 2. 트리거 이벤트 발생 시 워크플로우를 실행하도록 리스너를 등록합니다.
            //    (이 리스너는 내부적으로 WorkflowExecutor를 사용합니다.)
            const triggerListener = () => {
                console.log(`[RunnerFacade] 트리거 이벤트 발생: 워크플로우 실행 시작.`);
                this.executor.setWorkflow(workflowComponent); // 실행할 워크플로우 설정
                this.executor.runWorkflow(); // 워크플로우 실행 지시
            };
            firstNode.onTrigger(triggerListener);
            this.activeTriggers.set(firstNode, { triggerNode: firstNode, listener: triggerListener, workflow: workflowComponent });

            firstNode.execute();
        } else {
            console.warn("[RunnerFacade] 워크플로우는 반드시 트리거 노드로 시작해야 합니다. 실행 중단.");
        }
    }
}

module.exports = WorkflowRunnerFacade;