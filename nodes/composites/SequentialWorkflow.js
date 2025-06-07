// src/nodes/composites/SequentialWorkflow.js
const WorkflowComponent = require('../../core/WorkflowComponent'); // 경로 확인

class SequentialWorkflow extends WorkflowComponent {
    constructor(id, name = '순차 워크플로우', description = '노드들을 순차적으로 실행하는 워크플로우.') {
        super(); // WorkflowComponent는 생성자가 없으므로 인자 없이 호출
        this.id = id;
        this.name = name;
        this.description = description;
        this.nodes = []; // 자식 컴포넌트를 children 대신 nodes로 일관성 있게 사용
    }

    add(component) {
        if (!(component instanceof WorkflowComponent)) {
            throw new Error('[SequentialWorkflow] 추가할 컴포넌트는 WorkflowComponent 타입이어야 합니다.');
        }
        this.nodes.push(component);
    }
    remove(component) {
        console.warn(`[SequentialWorkflow:${this.id}] remove() 메서드는 설계 모드에서 구현되지 않았습니다.`);
    }

    /**
     * 포함된 자식 컴포넌트들을 순차적으로 실행합니다.
     */
    execute() {
        console.log(`\n--- [SequentialWorkflow:${this.id}] 워크플로우 '${this.name}' 실행 시작 ---`);
        for (const node of this.nodes) {
            try {
                node.execute(); // 각 자식 컴포넌트의 execute() 호출
            } catch (error) {
                console.error(`[SequentialWorkflow:${this.id}] 자식 컴포넌트 실행 중 오류: ${error.message}`);

            }
        }
        console.log(`--- [SequentialWorkflow:${this.id}] 워크플로우 '${this.name}' 실행 완료 ---\n`);
        return true; // 항상 성공으로 가정
    }
}

module.exports = SequentialWorkflow;