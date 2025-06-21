// core/WorkflowCaretaker.js
/**
 * @class WorkflowCaretaker
 * 메멘토 패턴의 Caretaker 역할을 수행합니다.
 * WorkflowMemento 객체들을 저장하고 복원합니다.
 * 이 클래스는 기존 코드(Originator)를 수정하지 않고,
 * Memento 생성 및 관리를 담당하기 위해 특정 워크플로우의 스냅샷을 저장합니다.
 */
class WorkflowCaretaker {
    constructor() {
        this.mementoStack = [];
    }

    /**
     * 현재 워크플로우의 스냅샷을 찍어 저장합니다.
     * 주의: 이 예시에서는 SequentialWorkflow의 nodes 배열만 깊은 복사하여 저장합니다.
     * 실제 시스템에서는 노드 내부 상태(속성 값 등)까지 포함한 완전한 깊은 복사가 필요할 수 있습니다.
     * @param {SequentialWorkflow} workflow - 현재 워크플로우 인스턴스
     */
    save(workflow) {
        // SequentialWorkflow의 nodes 배열을 깊은 복사하여 저장
        // 각 노드 객체 자체는 고유하므로, 해당 인스턴스 참조를 복사합니다.
        // 실제 Memento 패턴에서는 노드 객체의 모든 속성 값을 복사해야 합니다.
        // 하지만 여기서는 기존 코드를 건드리지 않는다는 제약 때문에,
        // 단순하게 SequentialWorkflow의 nodes 배열만 저장합니다.
        // 이것은 완전한 Memento 패턴 구현이 아님을 명심해야 합니다.
        // '실행 시퀀스의 재구성'을 위한 개념적 메멘토입니다.
        const nodesCopy = workflow.nodes.slice(); // 얕은 복사로 노드 참조만 복사
        this.mementoStack.push(nodesCopy);
        console.log(`[Caretaker] 워크플로우 상태 저장됨. 현재 스택 크기: ${this.mementoStack.length}`);
    }

    /**
     * 가장 최근에 저장된 상태로 워크플로우를 복원합니다.
     * @param {SequentialWorkflow} workflow - 복원할 워크플로우 인스턴스
     */
    restore(workflow) {
        if (this.mementoStack.length > 0) {
            const previousStateNodes = this.mementoStack.pop();
            workflow.nodes = previousStateNodes; // 워크플로우의 노드 배열을 이전 상태로 덮어씀
            console.log(`[Caretaker] 워크플로우 상태 복원됨. 현재 스택 크기: ${this.mementoStack.length}`);
        } else {
            console.warn("[Caretaker] 복원할 상태가 없습니다. 스택이 비어 있습니다.");
        }
    }

    /**
     * 특정 Memento 인덱스로 복원 (선택적)
     * @param {SequentialWorkflow} workflow
     * @param {number} index
     */
    restoreToIndex(workflow, index) {
        if (index >= 0 && index < this.mementoStack.length) {
            const targetStateNodes = this.mementoStack[index];
            workflow.nodes = targetStateNodes.slice(); // 복원 시에도 사본을 넘겨 다른 작업에 영향을 받지 않도록
            this.mementoStack = this.mementoStack.slice(0, index); // 해당 인덱스까지 잘라냄
            console.log(`[Caretaker] 워크플로우 상태를 인덱스 ${index}로 복원됨. 현재 스택 크기: ${this.mementoStack.length}`);
        } else {
            console.warn(`[Caretaker] 유효하지 않은 인덱스 ${index}.`);
        }
    }
}

module.exports = WorkflowCaretaker;