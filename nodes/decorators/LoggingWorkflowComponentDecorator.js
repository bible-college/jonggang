// 복사2/nodes/decorators/LoggingWorkflowComponentDecorator.js
const WorkflowComponent = require('../../core/WorkflowComponent'); // Decoratee (감싸는 대상)의 인터페이스 역할
const eventStore = require('../../core/EventStore'); // 이벤트 저장소 불러오기
const { NodeExecutedEvent, NodeSucceededEvent, NodeFailedEvent } = require('../../core/events/NodeEvents'); // 노드 이벤트 불러오기

class LoggingWorkflowComponentDecorator extends WorkflowComponent {
    // 데코레이터는 감쌀 대상(nodeToDecorate)을 생성자에서 주입받습니다.
    constructor(nodeToDecorate) {
        // 부모 클래스인 WorkflowComponent의 생성자를 호출합니다.
        // 이때, 감싸는 노드의 nodeId와 nodeName을 부모에게 전달합니다.
        // 데코레이터도 노드처럼 행동해야 하므로 nodeId와 nodeName을 가집니다.
        super(nodeToDecorate.nodeId, nodeToDecorate.nodeName); 

        // 유효성 검사: LoggingWorkflowComponentDecorator는 WorkflowComponent 인스턴스만 감쌀 수 있습니다.
        if (!(nodeToDecorate instanceof WorkflowComponent)) {
            throw new Error("LoggingWorkflowComponentDecorator can only decorate instances of WorkflowComponent.");
        }
        this.nodeToDecorate = nodeToDecorate;
        // 실제 핵심 로직을 수행할 원래 노드 객체를 참조합니다.

        // 원래 노드가 가지고 있던 executionResultChainStartHandler를 데코레이터에도 연결해줍니다.
        // 이는 체인 오브 리스폰서빌리티로 결과를 전달하는 흐름을 유지하기 위함입니다.
        // 데코레이터가 체인 시작점으로 작동할 수 있도록 합니다.
        this.executionResultChainStartHandler = nodeToDecorate.executionResultChainStartHandler;
    }

    // WorkflowComponent의 setExecutionResultChain 메서드를 오버라이딩하여
    // 감싸는 노드의 체인도 함께 설정되도록 합니다.
    setExecutionResultChain(handler) {
        this.nodeToDecorate.setExecutionResultChain(handler); // 원래 노드에 체인 설정
        this.executionResultChainStartHandler = handler; // 데코레이터 자신도 체인을 참조 (execute()의 finally 블록에서 사용)
    }

    // 템플릿 메서드 패턴의 execute 메서드를 오버라이딩하여 로깅 기능을 추가합니다.
    // 이 메서드가 노드 실행의 시작점입니다.
    async execute(context) { // 비동기 로깅을 위해 async/await 개념을 적용했습니다 (필수는 아님).
        // 1. 실행 전 로깅 (NodeExecutedEvent 발행)
        console.log(`[Decorator] ${this.nodeName}: Intercepting execution start.`);
        eventStore.saveEvent(new NodeExecutedEvent(this.nodeId, this.nodeName, context));

        let result = null;
        try {
            // 2. 원래 노드의 execute 메서드 호출 (핵심 로직 위임)
            // 'await' 키워드를 사용하여 비동기 작업이 완료될 때까지 기다립니다.
            result = await this.nodeToDecorate.execute(context); 
            
            // 3. 성공 시 로깅 (NodeSucceededEvent 발행)
            console.log(`[Decorator] ${this.nodeName}: Execution succeeded.`);
            eventStore.saveEvent(new NodeSucceededEvent(this.nodeId, this.nodeName, result.payload, context));

        } catch (error) {
            // 4. 실패 시 로깅 (NodeFailedEvent 발행)
            console.error(`[Decorator] ${this.nodeName}: Execution failed with error: ${error.message}`);
            eventStore.saveEvent(new NodeFailedEvent(this.nodeId, this.nodeName, error.message, context));
            throw error; // 오류를 다시 던져서 상위 WorkflowComponent의 'catch' 블록에서 처리될 수 있도록 합니다.
        }
        return result; // 원래 노드의 실행 결과 반환
    }

    // doExecute는 원래 노드에서 구현되므로, 데코레이터는 이 메서드를 직접 구현하지 않습니다.
    // 하지만 WorkflowComponent를 상속받았기 때문에 문법적으로는 이 메서드를 정의해야 합니다.
    // 데코레이터는 핵심 로직을 원래 노드에 위임하므로, 여기서는 단순히 원래 노드의 doExecute를 호출합니다.
    doExecute(context) {
        return this.nodeToDecorate.doExecute(context);
    }

    // handleError, add, remove 등 WorkflowComponent의 다른 메서드들도
    // 필요하다면 이곳에서 오버라이딩하여 로깅 등의 추가 기능을 넣을 수 있습니다.
    // 현재는 원래 노드의 동작을 그대로 따르도록 합니다.
    handleError(error, context) {
        return this.nodeToDecorate.handleError(error, context);
    }
    add(component) {
        return this.nodeToDecorate.add(component);
    }
    remove(component) {
        return this.nodeToDecorate.remove(component);
    }
}

module.exports = LoggingWorkflowComponentDecorator;