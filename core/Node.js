// src/core/WorkflowComponent.js
/**
 * @abstract
 * 모든 워크플로우 구성 요소(리프 노드, 복합 노드)가 구현해야 할 기본 인터페이스.
 * 컴포지트 패턴의 Component 역할을 하며, 커맨드 패턴의 Command 역할도 겸합니다.
 */
class Node {
    
    execute(context = {}) {
        throw new Error('execute() must be implemented by concrete components.');
    }

    add(component) {
        throw new Error(`add() is not supported by ${this.constructor.name}.`);
    }

    remove(component) {
        throw new Error(`remove() is not supported by ${this.constructor.name}.`);
    }
}

module.exports = Node;