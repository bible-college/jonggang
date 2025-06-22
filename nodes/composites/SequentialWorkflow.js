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
        console.log(`[SequentialWorkflow] 노드 제거 성공: ${component.constructor.name}`);
        return true;

    }

    execute(initialContext = {}) {
        console.log(`\n--- [SequentialWorkflow] 순차 워크플로우 실행 시작 ---`);
        let currentContext = initialContext;
        for (const node of this.nodes) {
            currentContext = node.execute(currentContext);
        }
        console.log(`--- [SequentialWorkflow] 순차 워크플로우 실행 완료 ---\n`);
        return currentContext;
    }

    createMemento() {
        console.log("[SequentialWorkflow] 현재 워크플로우 상태를 Memento로 저장.");
        return new WorkflowMemento(this.nodes.slice());
    }

    restoreFromMemento(memento) {
        console.log("[SequentialWorkflow] Memento로부터 워크플로우 상태 복원 중.");
        this.nodes = memento.getSavedState().slice();

    }
}

module.exports = SequentialWorkflow;