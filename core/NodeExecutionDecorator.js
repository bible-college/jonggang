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
            // 'this.id'가 아닌 'this.nodeId'를 사용하도록 수정
            nodeId: this.nodeId,
            nodeName: this.nodeName,
            timestamp: new Date().toISOString(),
            status: 'STARTED',
            message: `[${this.nodeName}] 실행 시작 (ID: ${this.nodeId})`
        });

        let result;
        try {
            result = this.wrappedComponent.execute();
            EventStore.logEvent({
                // 'this.id'가 아닌 'this.nodeId'를 사용하도록 수정
                nodeId: this.nodeId,
                nodeName: this.nodeName,
                timestamp: new Date().toISOString(),
                status: 'SUCCESS',
                message: `[${this.nodeName}] 실행 성공 (ID: ${this.nodeId})`
            });
        } catch (error) {
            EventStore.logEvent({
                // 'this.id'가 아닌 'this.nodeId'를 사용하도록 수정
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
    
    add(component) {
        if (typeof this.wrappedComponent.add === 'function') {
            this.wrappedComponent.add(component);
        }
    }

    // *** 바로 이 부분이 가장 핵심적인 수정 사항입니다! ***
    // 'nodes' 속성을 요청받으면, 포장지 안의 원본 객체가 가진 'nodes' 배열을
    // 그대로 밖으로 보여주는 '창문(getter)' 역할을 합니다.
    get nodes() {
        return this.wrappedComponent.nodes;
    }
}

module.exports = NodeExecutionDecorator;