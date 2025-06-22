// src/nodes/composites/SequentialWorkflow.js
const Node = require('../../core/Node');
const WorkflowMemento = require('../../core/WorkflowMemento');

/**
 * @class SequentialWorkflow
 * 여러 WorkflowComponent(리프 노드 또는 다른 복합 노드)를 순차적으로 실행하는 복합 노드.
 * 컴포지트 패턴의 Composite 역할과 메멘토 패턴의 Originator 역할을 합니다.
 */
class SequentialWorkflow extends Node {
    constructor() {
        super();
        this.nodes = [];
    }

    add(component) {
        this.nodes.push(component);
    }

    /**
     * 자식 컴포넌트를 제거합니다.
     * @param {WorkflowComponent} component - 제거할 자식 컴포넌트 (객체 참조)
     * @returns {boolean} 제거 성공 여부
     */
    remove(component) {
        const initialLength = this.nodes.length;
        // 제거할 컴포넌트와 일치하지 않는 노드들로 새 배열을 만듭니다.
        // 이는 원본 배열에서 해당 객체 참조를 가진 노드를 제거하는 효과가 있습니다.
        this.nodes = this.nodes.filter(node => node !== component);
        
        if (this.nodes.length < initialLength) {
            console.log(`[SequentialWorkflow] 노드 제거 성공: ${component.constructor.name}`);
            return true;
        } else {
            console.warn(`[SequentialWorkflow] 제거할 노드를 찾을 수 없습니다: ${component.constructor.name}`);
            return false;
        }
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
        if (memento instanceof WorkflowMemento) {
            console.log("[SequentialWorkflow] Memento로부터 워크플로우 상태 복원 중.");
            this.nodes = memento.getSavedState().slice();
        } else {
            console.error("[SequentialWorkflow] 유효하지 않은 Memento 객체입니다.");
        }
    }
}

module.exports = SequentialWorkflow;