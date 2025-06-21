// core/NodeExecutionDecorator.js

const WorkflowComponent = require('./WorkflowComponent');
const EventStore = require('./EventStore');

class NodeExecutionDecorator extends WorkflowComponent {
    static idCounter = 0;

    constructor(workflowComponent) {
        super();
        this.wrappedComponent = workflowComponent;
        this.nodeId = NodeExecutionDecorator.idCounter++;
        this.nodeName = this.wrappedComponent.constructor.name;
    }

    execute() {
        EventStore.logEvent({
            nodeId: this.nodeId,
            nodeName: this.nodeName,
            timestamp: new Date().toISOString(),
            status: 'STARTED',
            message: `[${this.nodeName}] 실행 시작 (ID: ${this.id})`
        });

        let result;
        try {
            result = this.wrappedComponent.execute();
            EventStore.logEvent({
                nodeId: this.nodeId,
                nodeName: this.nodeName,
                timestamp: new Date().toISOString(),
                status: 'SUCCESS',
                message: `[${this.nodeName}] 실행 성공 (ID: ${this.id})`
            });
        } catch (error) {
            EventStore.logEvent({
                nodeId: this.nodeId,
                nodeName: this.nodeName,
                timestamp: new Date().toISOString(),
                status: 'FAILURE',
                message: `[${this.nodeName}] 실행 실패 (ID: ${this.id}) - ${error.message}`
            });
            throw error;
        }
        return result;
    }
    
    // 복합 노드를 위한 add 메서드 위임
    add(component) {
        if (typeof this.wrappedComponent.add === 'function') {
            this.wrappedComponent.add(component);
        }
    }

    // *** 바로 이 부분이 핵심 수정 사항입니다! ***
    // 'nodes' 속성을 요청받으면, 포장지 안의 원본 노드가 가진 'nodes' 배열을
    // 그대로 보여주는 창문(getter) 역할을 합니다.
    get nodes() {
        return this.wrappedComponent.nodes;
    }

    // 원본 노드에 직접 접근해야 할 경우를 대비한 속성
    get original() {
        return this.wrappedComponent;
    }
}

module.exports = NodeExecutionDecorator;