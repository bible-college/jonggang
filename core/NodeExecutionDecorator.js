// core/NodeExecutionDecorator.js

const WorkflowComponent = require('./WorkflowComponent');
const EventStore = require('./EventStore');

class NodeExecutionDecorator extends WorkflowComponent {
    static idCounter = 0;

    constructor(workflowComponent) {
        super();
        // 원본 노드를 누구나 볼 수 있도록 'wrappedComponent' 속성에 저장합니다.
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
            message: `[${this.nodeName}] 실행 시작 (ID: ${this.nodeId})`
        });

        let result;
        try {
            // 포장하고 있던 원본 노드의 execute를 호출합니다.
            result = this.wrappedComponent.execute();
            EventStore.logEvent({
                nodeId: this.nodeId,
                nodeName: this.nodeName,
                timestamp: new Date().toISOString(),
                status: 'SUCCESS',
                message: `[${this.nodeName}] 실행 성공 (ID: ${this.nodeId})`
            });
        } catch (error) {
            EventStore.logEvent({
                nodeId: this.nodeId,
                nodeName: this.nodeName,
                timestamp: new Date().toISOString(),
                status: 'FAILURE',
                message: `[${this.nodeName}] 실행 실패 (ID: ${this.nodeId}) - ${error.message}`
            });
            throw error;
        }
        return result;
    }

    // 복합 노드를 위한 위임 코드
    add(component) {
        if (typeof this.wrappedComponent.add === 'function') {
            this.wrappedComponent.add(component);
        }
    }

    // 복합 노드가 자신의 노드 목록을 반환할 수 있도록 위임합니다.
    get nodes() {
        return this.wrappedComponent.nodes;
    }
}

module.exports = NodeExecutionDecorator;