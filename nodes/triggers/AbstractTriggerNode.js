// src/nodes/triggers/AbstractTriggerNode.js
const WorkflowComponent = require('../../core/WorkflowComponent'); // 경로 수정 확인
const EventEmitter = require('events'); // 이벤트 발행을 위해 Node.js의 EventEmitter 사용

/**
 * @abstract
 * 모든 트리거 노드의 공통적인 추상 클래스.
 * 워크플로우 컴포넌트의 한 종류이며, 특정 이벤트를 감지하여 워크플로우 실행을 유발합니다.
 * (중지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 */
class AbstractTriggerNode extends WorkflowComponent {
    constructor(id, name, description) {
        super();
        if (new.target === AbstractTriggerNode) {
            throw new TypeError("Abstract class 'AbstractTriggerNode' cannot be instantiated directly.");
        }
        // id, name, description은 AbstractTriggerNode에서 직접 초기화
        this.id = id;
        this.name = name;
        this.description = description;

        this.eventEmitter = new EventEmitter();
        this.workflowToExecute = null; // 이 트리거가 실행할 워크플로우 컴포넌트
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