// src/core/WorkflowExecutor.js (수정)
/**
 * @class WorkflowExecutor
 * 주어진 워크플로우(WorkflowComponent)를 실행하는 역할을 담당합니다.
 * 커맨드 패턴의 인보커(Invoker) 역할을 합니다.
 */
class WorkflowExecutor {
    constructor() {
        this.workflow = null; // 실행할 워크플로우 컴포넌트
    }

    setWorkflow(workflow) {
        this.workflow = workflow;
    }

    /**
     * 설정된 워크플로우를 실행합니다.
     * 이는 워크플로우 컴포넌트의 execute() 메서드를 호출하는 것으로,
     * 커맨드 객체(WorkflowComponent)의 execute()를 요청하는 인보커의 역할입니다.
     */
    runWorkflow(initialContext = {}) {
        if (this.workflow) {
            console.log(`[WorkflowExecutor] 워크플로우 실행 지시.`);
            const finalContext = this.workflow.execute(initialContext); // 워크플로우 실행 및 최종 컨텍스트 받기
            return finalContext; // 최종 컨텍스트 반환
        } else {
            console.warn("[WorkflowExecutor] 실행할 워크플로우가 설정되지 않았습니다.");
            return {};
        }
    }
}

module.exports = WorkflowExecutor;