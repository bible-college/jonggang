// src/core/WorkflowComponent.js
/**
 * @abstract
 * 모든 워크플로우 구성 요소(리프 노드, 복합 노드)가 구현해야 할 기본 인터페이스.
 * 컴포지트 패턴의 Component 역할을 하며, 커맨드 패턴의 Command 역할도 겸합니다.
 */
class WorkflowComponent {
    /**
     * 이 컴포넌트가 수행할 작업을 실행합니다.
     * 모든 구체적인 노드와 복합 워크플로우는 이 메서드를 구현해야 합니다.
     * @returns {boolean} 작업 성공 여부
     */
    execute(context = {}) {
        throw new Error('execute() must be implemented by concrete components.');
    }

    /**
     * 자식 컴포넌트를 추가합니다. 리프 노드에서는 지원되지 않습니다.
     * @param {WorkflowComponent} component - 추가할 자식 컴포넌트
     */
    add(component) {
        throw new Error(`add() is not supported by ${this.constructor.name}.`);
    }

    /**
     * 자식 컴포넌트를 제거합니다. 리프 노드에서는 지원되지 않습니다.
     * @param {WorkflowComponent} component - 제거할 자식 컴포넌트
     */
    remove(component) {
        throw new Error(`remove() is not supported by ${this.constructor.name}.`);
    }
}

module.exports = WorkflowComponent;