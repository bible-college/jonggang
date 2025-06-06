// src/nodes/triggers/AbstractTriggerNode.js
const { WorkflowComponent } = require('../../core');
const EventEmitter = require('events'); // 이벤트 발행을 위해 Node.js의 EventEmitter 사용

/**
 * @abstract
 * 모든 트리거 노드의 공통적인 추상 클래스.
 * 워크플로우 컴포넌트의 한 종류이며, 특정 이벤트를 감지하여 워크플로우 실행을 유발합니다.
 * (중지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 */
class AbstractTriggerNode extends WorkflowComponent {
    constructor(id, name, description) {
        super(id, name, description);
        if (new.target === AbstractTriggerNode) {
            throw new TypeError("Abstract class 'AbstractTriggerNode' cannot be instantiated directly.");
        }
        this.eventEmitter = new EventEmitter();
        this.workflowToExecute = null; // 이 트리거가 실행할 워크플로우 컴포넌트
    }

    /**
     * 이 트리거에 연결된 워크플로우를 설정합니다.
     * @param {WorkflowComponent} workflow - 이 트리거에 의해 실행될 워크플로우 컴포넌트.
     */
    setWorkflowToExecute(workflow) {
        this.workflowToExecute = workflow;
    }

    /**
     * 워크플로우 실행 이벤트 리스너를 추가합니다.
     * @param {function} listener - 이벤트 발생 시 호출될 콜백 함수.
     */
    onTrigger(listener) {
        this.eventEmitter.on('trigger', listener);
    }

    /**
     * 트리거 감지를 시작합니다. (추상 메서드)
     * 각 구체적인 트리거 노드에서 실제 감지 로직을 구현해야 합니다.
     * @abstract
     */
    execute() {
        throw new Error("Method 'execute()' must be implemented by concrete trigger nodes.");
    }

    // stop() 메서드 삭제
}

module.exports = AbstractTriggerNode;