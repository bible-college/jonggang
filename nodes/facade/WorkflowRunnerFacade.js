// src/facade/WorkflowRunnerFacade.js
const WorkflowExecutor = require('../../core/WorkflowExecutor');
const AbstractTriggerNode = require('../triggers/AbstractTriggerNode');

class WorkflowRunnerFacade {
    constructor() {
        this.executor = new WorkflowExecutor();
        this.activeTriggers = new Map();
    }

    runWorkflow(workflowComponent) {

        let firstNode = workflowComponent.nodes[0].wrappedComponent;
        // 1. 트리거 노드에게 실행할 워크플로우를 연결합니다.
        firstNode.setWorkflowToExecute(workflowComponent);

        // 2. 트리거 이벤트 발생 시 워크플로우를 실행하도록 리스너를 등록합니다.
        const triggerListener = (payload) => {
            this.executor.setWorkflow(workflowComponent); // 실행할 워크플로우 설정
            this.executor.runWorkflow({ triggerPayload: payload }); 
        };
        firstNode.onTrigger(triggerListener); // AbstractTriggerNode의 onTrigger 호출
        this.activeTriggers.set(firstNode, { triggerNode: firstNode, listener: triggerListener, workflow: workflowComponent });
    }
}

module.exports = WorkflowRunnerFacade;