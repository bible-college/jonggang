// core/WorkflowMemento.js
/**
 * @class WorkflowMemento
 * 메멘토 패턴의 Memento 역할을 수행합니다.
 * Originator(SequentialWorkflow)의 특정 시점 상태를 저장합니다.
 * Caretaker에게는 불투명(black box)하게 보이며, Originator만이 내부 상태에 접근할 수 있습니다.
 */
class WorkflowMemento {
    constructor(nodesState) {
        // 이 예시에서는 nodesState가 Serialized된 형태이거나
        // 깊은 복사된 노드 배열이라고 가정합니다.
        // 실제로는 노드 객체들이 복잡한 참조를 가질 수 있어 직렬화(Serialization)가 필요할 수 있습니다.
        this._nodesState = nodesState;
    }

    /**
     * @private
     * Memento의 내부 상태를 반환합니다.
     * 이 메서드는 Originator(SequentialWorkflow)만이 접근해야 합니다.
     */
    getSavedState() {
        return this._nodesState;
    }
}

module.exports = WorkflowMemento;