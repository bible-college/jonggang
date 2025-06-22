
class WorkflowCaretaker {
    constructor() {
        this.mementoStack = [];
    }

    saveMemento(memento) {
        this.mementoStack.push(memento);
        console.log(`[Caretaker] Memento 저장됨. 현재 스택 크기: ${this.mementoStack.length}`);
    }

    getMemento() {
        const memento = this.mementoStack.pop();
        console.log(`[Caretaker] Memento 반환됨. 현재 스택 크기: ${this.mementoStack.length}`);
        return memento;
    }
    getMementoAtIndex(index) {
        const memento = this.mementoStack[index];
        this.mementoStack = this.mementoStack.slice(0, index); // 해당 인덱스까지 잘라냄
        console.log(`[Caretaker] Memento (인덱스 ${index}) 반환됨. 현재 스택 크기: ${this.mementoStack.length}`);
        return memento;

    }
}

module.exports = WorkflowCaretaker;