// src/nodes/triggers/AbstractTriggerNode.js (수정)
const WorkflowComponent = require('../../core/WorkflowComponent');
const EventEmitter = require('events');

/**
 * @abstract
 * 모든 트리거 노드의 공통적인 추상 클래스.
 * 워크플로우 컴포넌트의 한 종류이며, 특정 이벤트를 감지하여 워크플로우 실행을 유발합니다.
 * (중지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 * id, name, description은 현재 설계에서 불필요하므로 제거합니다.
 */
class AbstractTriggerNode extends WorkflowComponent {
    // id, name, description을 더 이상 생성자에서 받지 않음
    constructor() {
        super();
        if (new.target === AbstractTriggerNode) {
            throw new TypeError("Abstract class 'AbstractTriggerNode' cannot be instantiated directly.");
        }

        this.eventEmitter = new EventEmitter();
        this.workflowToExecute = null;
    }

    setWorkflowToExecute(workflow) {
        this.workflowToExecute = workflow;
    }

    onTrigger(listener) {
        this.eventEmitter.on('trigger', listener);
    }

    execute() {
        throw new Error("Method 'execute()' must be implemented by concrete trigger nodes.");
    }
}

module.exports = AbstractTriggerNode;