// src/decorators/WorkflowExecutionLoggerDecorator.js
const WorkflowComponentDecorator = require('../core/WorkflowComponentDecorator'); // 추상 데코레이터 임포트
const EventStore = require('../core/EventStore'); // EventStore 임포트

/**
 * @class WorkflowExecutionLoggerDecorator
 * 노드의 실행 시작과 완료/실패를 로깅하고 이벤트를 저장하는 구체적인 데코레이터.
 * 데코레이터 패턴의 Concrete Decorator 역할을 합니다.
 * 이제 실행 성공/실패 여부와 함께 현재 시간을 로깅하며, 이벤트 속성을 간소화합니다.
 */
class WorkflowExecutionLoggerDecorator extends WorkflowComponentDecorator {
    constructor(component, eventStore) { // eventStore 인자 추가
        super(component);
        this.componentName = this.wrappedComponent.constructor.name;

        if (!(eventStore instanceof EventStore)) {
            throw new Error("WorkflowExecutionLoggerDecorator는 유효한 EventStore 인스턴스를 필요로 합니다.");
        }
        this.eventStore = eventStore; // EventStore 인스턴스 저장
    }

    /**
     * 래핑된 노드의 실행 전/후에 로깅을 추가하고, 성공/실패를 기록합니다.
     * 이벤트는 시작, 완료/실패, 노드 이름, 시간만 포함합니다.
     * @param {Object} context - 워크플로우 컨텍스트
     * @returns {Object} 업데이트된 컨텍스트
     */
    execute(context = {}) {
        const nowIso = new Date().toISOString(); // 이벤트 소싱을 위한 ISO 형식 시간
        const logTime = new Date().toLocaleTimeString(); // 콘솔 로그용 시간

        // 1. 노드 실행 시작 이벤트 기록 (간소화된 속성)
        const startedEvent = {
            type: 'NODE_EXECUTION_STARTED',
            timestamp: nowIso,
            nodeName: this.componentName
        };
        this.eventStore.append(startedEvent);

        let resultContext;
        try {
            resultContext = super.execute(context); // 래핑된 컴포넌트의 실제 execute 호출

            // 2. 노드 실행 완료 이벤트 기록 (간소화된 속성)
            const completedEvent = {
                type: 'NODE_EXECUTION_COMPLETED',
                timestamp: new Date().toISOString(),
                nodeName: this.componentName
            };
            this.eventStore.append(completedEvent);
            
        } catch (error) {
            // 3. 노드 실행 실패 이벤트 기록 (간소화된 속성)
            const failedEvent = {
                type: 'NODE_EXECUTION_FAILED',
                timestamp: new Date().toISOString(),
                nodeName: this.componentName,
                errorMessage: error.message // 실패 시에는 에러 메시지만 포함
            };
            this.eventStore.append(failedEvent);
            throw error; 
        }

        return resultContext;
    }
}

module.exports = WorkflowExecutionLoggerDecorator;