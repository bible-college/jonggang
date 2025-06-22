// src/decorators/WorkflowExecutionLoggerDecorator.js
const NodeDecorator = require('../core/NodeDecorator'); // 추상 데코레이터 임포트
const EventStore = require('../core/EventStore'); // EventStore 임포트

class WorkflowExecutionLoggerDecorator extends NodeDecorator {
    constructor(component, eventStore) { // eventStore 인자 추가
        super(component);
        this.componentName = this.wrappedComponent.constructor.name;
        this.eventStore = eventStore; // EventStore 인스턴스 저장
    }

    execute(context = {}) {
        const nowIso = new Date().toISOString(); 

        const startedEvent = {
            type: 'NODE__STARTED',
            timestamp: nowIso, 
            nodeName: this.componentName
        };
        this.eventStore.append(startedEvent);

        let resultContext;
        try { //노드가 성공시
            resultContext = super.execute(context);
            const completedEvent = {
                type: 'NODE_COMPLETED',
                timestamp: nowIso, 
                nodeName: this.componentName
            };
            this.eventStore.append(completedEvent);
        } catch (error) { //노드가 실패시
            const failedEvent = {
                type: 'NODE_FAILED',
                timestamp: nowIso, 
                nodeName: this.componentName,
                errorMessage: error.message
            };
            this.eventStore.append(failedEvent);
            throw error;
        }
        return resultContext;
    }
}

module.exports = WorkflowExecutionLoggerDecorator;