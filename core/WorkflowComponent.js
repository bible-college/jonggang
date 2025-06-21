// 복사2/core/WorkflowComponent.js
// 상태 패턴을 위한 클래스들을 불러옵니다.
const INodeState = require('../nodes/States/INodeState');
const PendingState = require('../nodes/States/PendingState');
const RunningState = require('../nodes/States/RunningState');
const SuccessState = require('../nodes/States/SuccessState');
const FailureState = require('../nodes/States/FailureState');

class WorkflowComponent {
    constructor(nodeId, nodeName) { // 생성자에 nodeId, nodeName 인자 추가
        if (new.target === WorkflowComponent) {
            throw new TypeError("Abstract class 'WorkflowComponent' cannot be instantiated directly.");
            // 이제 WorkflowComponent는 추상 클래스가 되므로 직접 객체를 만들 수 없게 강제합니다.
        }

        // 모든 노드가 가질 고유 식별자와 이름 (템플릿 메서드와 상태 패턴에서 활용)
        this.nodeId = nodeId;
        this.nodeName = nodeName;

        // 노드의 현재 상태 (상태 패턴 Context 역할)
        this.currentState = new PendingState(); // 초기 상태는 '대기(Pending)'로 설정

        // 노드 실행 결과가 처리될 체인의 시작 핸들러 (체인 오브 리스폰서빌리티와 연결)
        this.executionResultChainStartHandler = null; 
    }

    // 상태 패턴의 핵심: 노드의 현재 상태를 변경하는 메서드
    setState(newState) {
        if (!(newState instanceof INodeState)) {
            throw new Error("Invalid state: must be an instance of INodeState.");
        }
        this.currentState = newState;
    }

    // 템플릿 메서드 패턴의 핵심: 노드 실행의 전체적인 흐름을 정의
    execute(context) { // context 인자 추가
        console.log(`\n--- [${this.nodeName}] Node Execution Lifecycle Started ---`);
        let result = null; // 노드 실행 결과를 담을 변수

        try {
            // 1. 노드 상태 전이 및 사전 준비 (고정 단계)
            // 현재 상태 객체에 실행을 위임하고, 상태 전이를 유발합니다.
            this.currentState.execute(this, context); 
            // 예를 들어, PendingState의 execute는 RunningState로 전이시키고 메시지를 출력합니다.

            // 2. 핵심 비즈니스 로직 실행 (추상 단계, 서브클래스에서 구현)
            const taskResult = this.doExecute(context);
            
            // 3. 실행 성공 후 처리 및 상태 전이 (고정 단계)
            // 성공 상태로 전이합니다.
            this.currentState.transitionTo(this, new SuccessState()); 
            result = this.createExecutionResult('SUCCESS', context, taskResult);
            console.log(`[${this.nodeName}] Core task completed successfully.`);

        } catch (error) {
            // 4. 오류 처리 및 상태 전이 (고정 단계)
            // 실패 상태로 전이합니다.
            this.currentState.transitionTo(this, new FailureState());
            result = this.createExecutionResult('FAILURE', context, null, error.message);
            console.error(`[${this.nodeName}] An error occurred during execution: ${error.message}`);
            this.handleError(error, context); // 오류 처리 훅 호출
        } finally {
            // 5. 최종 처리: 결과 객체를 체인 오브 리스폰서빌리티로 전달 (항상 실행)
            if (this.executionResultChainStartHandler && result) {
                console.log(`[${this.nodeName}] Passing execution result to Chain of Responsibility.`);
                this.executionResultChainStartHandler.handle(result);
            }
            console.log(`--- [${this.nodeName}] Node Execution Lifecycle Finished ---\n`);
        }
        // 이 execute 메서드는 WorkflowComponent의 필수 메서드이므로, 그대로 유지.
        // 하지만 이제 템플릿 메서드 역할을 합니다.
    }

    // 새로운 추상 메서드: 구체적인 노드가 반드시 구현해야 할 핵심 비즈니스 로직
    doExecute(context) {
        throw new Error('Method "doExecute()" must be implemented by concrete components.');
        // 기존 WorkflowComponent의 execute()가 하던 역할을 doExecute()가 대신합니다.
    }

    // 오류 발생 시 추가적인 처리를 위한 훅 메서드 (선택적 오버라이딩)
    handleError(error, context) {
        console.error(`[${this.nodeName}] Default error handler: ${error.message}`);
    }

    // 실행 결과 객체를 생성하는 헬퍼 메서드
    createExecutionResult(status, context, payload = null, errorMessage = null) {
        return {
            nodeId: this.nodeId,
            nodeName: this.nodeName,
            status: status,
            timestamp: new Date().toISOString(),
            payload: payload,
            errorMessage: errorMessage,
            context: context
        };
    }

    // 체인의 시작 핸들러를 설정하는 메서드 (외부에서 주입)
    setExecutionResultChain(handler) {
        this.executionResultChainStartHandler = handler;
    }

    // 기존 add, remove 메서드는 그대로 유지
    add(component) {
        throw new Error(`add() is not supported by ${this.constructor.name}.`);
    }

    remove(component) {
        throw new Error(`remove() is not supported by ${this.constructor.name}.`);
    }
}

module.exports = WorkflowComponent;