// core/WorkflowCaretaker.js
/**
 * @class WorkflowCaretaker
 * 메멘토 패턴의 Caretaker 역할을 수행합니다.
 * Memento 객체들을 저장하고 복원합니다.
 * Originator의 내부 상태에는 접근하지 않고 Memento를 '블랙 박스'로 취급합니다.
 */
class WorkflowCaretaker {
    constructor() {
        this.mementoStack = [];
    }

    /**
     * Originator로부터 받은 Memento를 저장합니다.
     * @param {WorkflowMemento} memento - Originator가 생성한 Memento 객체
     */
    saveMemento(memento) {
        this.mementoStack.push(memento);
        console.log(`[Caretaker] Memento 저장됨. 현재 스택 크기: ${this.mementoStack.length}`);
    }

    /**
     * 가장 최근에 저장된 Memento를 반환합니다.
     * @returns {WorkflowMemento | null} 복원할 Memento 객체 또는 null (스택이 비어있는 경우)
     */
    getMemento() {
        if (this.mementoStack.length > 0) {
            const memento = this.mementoStack.pop();
            console.log(`[Caretaker] Memento 반환됨. 현재 스택 크기: ${this.mementoStack.length}`);
            return memento;
        } else {
            console.warn("[Caretaker] 복원할 Memento가 없습니다. 스택이 비어 있습니다.");
            return null;
        }
    }

    /**
     * 특정 인덱스의 Memento를 반환하고, 그 이후의 스택을 정리합니다.
     * @param {number} index - 반환할 Memento의 스택 인덱스
     * @returns {WorkflowMemento | null}
     */
    getMementoAtIndex(index) {
        if (index >= 0 && index < this.mementoStack.length) {
            const memento = this.mementoStack[index];
            this.mementoStack = this.mementoStack.slice(0, index); // 해당 인덱스까지 잘라냄
            console.log(`[Caretaker] Memento (인덱스 ${index}) 반환됨. 현재 스택 크기: ${this.mementoStack.length}`);
            return memento;
        } else {
            console.warn(`[Caretaker] 유효하지 않은 인덱스 ${index}.`);
            return null;
        }
    }
}

module.exports = WorkflowCaretaker;