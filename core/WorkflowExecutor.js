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
    runWorkflow() {
        if (this.workflow) {
            console.log(`[WorkflowExecutor] 워크플로우 실행 지시.`);
            this.workflow.execute(); // 워크플로우 컴포넌트(커맨드)의 execute() 호출
        } else {
            console.warn("[WorkflowExecutor] 실행할 워크플로우가 설정되지 않았습니다.");
        }
    }
}

module.exports = WorkflowExecutor;