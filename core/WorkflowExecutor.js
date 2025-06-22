
class WorkflowExecutor {
    constructor() {
        this.workflow = null; 
    }

    setWorkflow(workflow) {
        this.workflow = workflow;
    }


    runWorkflow(initialContext = {}) {
        const finalContext = this.workflow.execute(initialContext); // 워크플로우 실행 및 최종 컨텍스트 받기
        return finalContext; // 최종 컨텍스트 반환
    }
}

module.exports = WorkflowExecutor;