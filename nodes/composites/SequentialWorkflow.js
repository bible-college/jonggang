// src/nodes/composites/SequentialWorkflow.js
const WorkflowComponent = require('../../core/WorkflowComponent');

/**
 * @class SequentialWorkflow
 * 여러 WorkflowComponent(리프 노드 또는 다른 복합 노드)를 순차적으로 실행하는 복합 노드.
 * 컴포지트 패턴의 Composite 역할을 합니다.
 */
class SequentialWorkflow extends WorkflowComponent {
    constructor() {
        super();
        this.children = []; // 이 워크플로우에 포함된 노드들 (자식 컴포넌트)
    }

    /**
     * 자식 컴포넌트를 추가합니다.
     * @param {WorkflowComponent} component - 추가할 자식 컴포넌트
     */
    add(component) {
        if (!(component instanceof WorkflowComponent)) {
            throw new Error('Can only add instances of WorkflowComponent to SequentialWorkflow.');
        }
        this.children.push(component);
        console.log(`[SequentialWorkflow] 컴포넌트 추가됨: ${component.constructor.name}`);
    }

    /**
     * 자식 컴포넌트를 제거합니다.
     * @param {WorkflowComponent} component - 제거할 자식 컴포넌트
     */
    remove(component) {
        this.children = this.children.filter(child => child !== component);
        console.log(`[SequentialWorkflow] 컴포넌트 제거됨: ${component.constructor.name}`);
    }

    /**
     * 자식 컴포넌트들을 순차적으로 실행합니다.
     */
    execute() {
        console.log("\n--- [SequentialWorkflow] 순차 실행 시작 ---");
        for (const component of this.children) {
            console.log(`[SequentialWorkflow] ${component.constructor.name} 실행 중...`);
            try {
                component.execute(); // 각 자식 컴포넌트의 execute() 호출
            } catch (error) {
                console.error(`[SequentialWorkflow] 자식 컴포넌트 '${component.constructor.name}' 실행 중 오류: ${error.message}`);
                // N8n에서는 이 시점에서 워크플로우 실행을 중단하거나 에러 핸들링 노드로 분기할 수 있습니다.
                return false; // 오류 발생 시 false 반환
            }
        }
        console.log("--- [SequentialWorkflow] 순차 실행 완료 ---\n");
        return true;
    }
}

module.exports = SequentialWorkflow;