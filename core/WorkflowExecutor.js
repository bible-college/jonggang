// src/core/WorkflowExecutor.js
const WorkflowComponent = require('./WorkflowComponent');

/**
 * @class WorkflowExecutor
 * 워크플로우의 실행을 관리하는 클래스 (커맨드 패턴의 Invoker 역할).
 * WorkflowComponent 인스턴스를 받아 그 execute() 메서드를 호출하여 워크플로우를 실행합니다.
 */
class WorkflowExecutor {
    constructor() {
        this.workflow = null; // 실행할 최상위 워크플로우 (컴포지트 노드)
    }

    /**
     * 실행할 워크플로우의 최상위 컴포넌트를 설정합니다.
     * @param {WorkflowComponent} workflowComponent - 실행할 워크플로우의 시작점 (보통 SequentialWorkflow 같은 복합 노드)
     */
    setWorkflow(workflowComponent) {
        if (!(workflowComponent instanceof WorkflowComponent)) {
            throw new Error("설정된 워크플로우는 WorkflowComponent 타입이어야 합니다.");
        }
        this.workflow = workflowComponent;
        console.log(`[Executor] 워크플로우 설정됨: ${workflowComponent.constructor.name}`);
    }

    /**
     * 현재 설정된 워크플로우를 실행합니다.
     */
    runWorkflow() {
        if (!this.workflow) {
            console.warn("[Executor] 실행할 워크플로우가 설정되지 않았습니다.");
            return;
        }
        console.log("--- [Executor] 워크플로우 실행 시작! ---");
        try {
            this.workflow.execute(); // 최상위 워크플로우(컴포지트)의 execute() 호출
        } catch (error) {
            console.error(`[Executor] 워크플로우 실행 중 치명적인 오류 발생: ${error.message}`);
        }
        console.log("--- [Executor] 워크플로우 실행 완료! ---");
    }
}

module.exports = WorkflowExecutor;