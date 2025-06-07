// src/nodes/composites/SequentialWorkflow.js (수정)
const WorkflowComponent = require('../../core/WorkflowComponent');

/**
 * @class SequentialWorkflow
 * 여러 WorkflowComponent(리프 노드 또는 다른 복합 노드)를 순차적으로 실행하는 복합 노드.
 * 컴포지트 패턴의 Composite 역할을 합니다.
 */
class SequentialWorkflow extends WorkflowComponent {
    // id, name, description을 더 이상 생성자에서 받지 않음
    constructor() {
        super(); // WorkflowComponent는 생성자가 없으므로 인자 없이 호출
        this.nodes = []; 
    }

    add(component) {
        this.nodes.push(component);
    }

    remove(component) {
        console.warn(`[SequentialWorkflow] remove() 메서드는 설계 모드에서 구현되지 않았습니다.`);
    }

    execute() {
        // id, name 제거로 인한 콘솔 로그 수정
        console.log(`\n--- [SequentialWorkflow] 순차 워크플로우 실행 시작 ---`);
        for (const node of this.nodes) {
            node.execute();
        }
        console.log(`--- [SequentialWorkflow] 순차 워크플로우 실행 완료 ---\n`);
        return true;
    }
}

module.exports = SequentialWorkflow;