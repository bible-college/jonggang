
class WorkflowCaretaker {
    constructor() {
        this.mementoStack = [];
    }

    saveMemento(memento) {
        this.mementoStack.push(memento);
    }

    getMemento() {
        const memento = this.mementoStack.pop();
        return memento;
    }
    getMementoAtIndex(index) {
        const memento = this.mementoStack[index];
        this.mementoStack = this.mementoStack.slice(0, index); // 해당 인덱스까지 잘라냄
        return memento;

    }
}

module.exports = WorkflowCaretaker;