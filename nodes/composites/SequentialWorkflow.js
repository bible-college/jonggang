// src/nodes/composites/SequentialWorkflow.js
const Node = require('../../core/Node');
const WorkflowMemento = require('../../core/WorkflowMemento');

class SequentialWorkflow extends Node {
    constructor() {
        super();
        this.nodes = [];
    }

    add(component) {
        this.nodes.push(component);
    }
    remove(component) {
        this.nodes = this.nodes.filter(node => node !== component);
        return true;

    }

    execute(initialContext = {}) {
        let currentContext = initialContext;
        for (const node of this.nodes) {
            currentContext = node.execute(currentContext);
        }
        return currentContext;
    }

    createMemento() {
        return new WorkflowMemento(this.nodes.slice());
    }

    restoreFromMemento(memento) {
        console.log("[SequentialWorkflow] Memento로부터 워크플로우 상태 복원 중.");
        this.nodes = memento.getSavedState().slice();

    }
}

module.exports = SequentialWorkflow;