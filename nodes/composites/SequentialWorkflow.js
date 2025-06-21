
const WorkflowComponent = require('../../core/WorkflowComponent');

class SequentialWorkflow extends WorkflowComponent {
    constructor() {
        super();
        this.nodes = []; 
    }

    add(component) {
        this.nodes.push(component);
    }

    remove(component) {
        console.warn(`[SequentialWorkflow] remove() 메서드는 설계 모드에서 구현되지 않았습니다.`);
    }

    execute() {
        console.log(`\n--- [SequentialWorkflow] 순차 워크플로우 실행 시작 ---`);
        for (const node of this.nodes) {
            node.execute();
        }
        console.log(`--- [SequentialWorkflow] 순차 워크플로우 실행 완료 ---\n`);
        return true;
    }
}

module.exports = SequentialWorkflow;