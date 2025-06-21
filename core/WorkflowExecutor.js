
class WorkflowExecutor {
    constructor() {
        this.workflow = null; 
    }

    setWorkflow(workflow) {
        this.workflow = workflow;
    }

    runWorkflow() {
        if (this.workflow) {
            console.log(`[WorkflowExecutor] 워크플로우 실행 지시.`);
            this.workflow.execute();
        } else {
            console.warn("[WorkflowExecutor] 실행할 워크플로우가 설정되지 않았습니다.");
        }
    }
}

module.exports = WorkflowExecutor;