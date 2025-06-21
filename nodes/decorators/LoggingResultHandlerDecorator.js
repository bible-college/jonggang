// 복사2/nodes/decorators/LoggingResultHandlerDecorator.js
// IExecutionResultHandler는 아직 정의되지 않았지만, 개념적으로 존재한다고 가정합니다.
// 추후 체인 오브 리스폰서빌리티 패턴을 구현할 때 이 인터페이스를 정의합니다.

const eventStore = require('../../core/EventStore'); // 이벤트 저장소 불러오기
const { HandlerExecutedEvent } = require('../../core/events/HandlerEvents'); // 핸들러 이벤트 불러오기

class LoggingResultHandlerDecorator /* extends IExecutionResultHandler (개념적으로 상속) */ {
    constructor(handlerToDecorate) {
        // 실제 핸들러 객체인지 확인하는 로직 (선택적)
        // 이 부분은 IExecutionResultHandler 인터페이스가 정의된 후에 instanceof 체크로 강화할 수 있습니다.
        // if (!(handlerToDecorate instanceof IExecutionResultHandler)) { 
        //     throw new Error("LoggingResultHandlerDecorator can only decorate instances of IExecutionResultHandler.");
        // }
        this.handlerToDecorate = handlerToDecorate;
        // 실제 핵심 로직을 수행할 원래 핸들러 객체를 참조합니다.
        
        // 체인의 다음 핸들러를 관리하는 부분도 원래 핸들러의 것을 따르도록 합니다.
        // 이는 IExecutionResultHandler가 setNext 메서드를 가질 것이기 때문입니다.
        this.nextHandler = handlerToDecorate.nextHandler; 
        // 데코레이터는 마치 원래 핸들러인 것처럼 동작하며 체인의 연결을 유지합니다.
    }

    // setNext 메서드를 오버라이딩하여 감싸는 핸들러의 체인도 함께 설정되도록 합니다.
    setNext(handler) {
        this.handlerToDecorate.setNext(handler); // 원래 핸들러의 다음 핸들러를 설정
        this.nextHandler = handler; // 데코레이터 자신의 다음 핸들러도 설정 (체인 연속성 유지)
        return handler;
    }

    // 체인 핸들러의 handle 메서드를 오버라이딩하여 로깅 기능을 추가합니다.
    async handle(result) { // 비동기 로깅을 위해 async/await 개념을 적용했습니다 (필수는 아님).
        // 1. 핸들러 실행 전 로깅
        const handlerName = this.handlerToDecorate.constructor.name;
        console.log(`[Decorator] ${handlerName}: Intercepting handle for result status: ${result.status}`);
        eventStore.saveEvent(new HandlerExecutedEvent(handlerName, result.nodeName, result.status, `Handler processing started.`));

        let handlerResult = null;
        try {
            // 2. 원래 핸들러의 handle 메서드 호출 (핵심 로직 위임)
            handlerResult = await this.handlerToDecorate.handle(result);
            // 'await' 키워드를 사용하여 비동기 작업이 완료될 때까지 기다립니다.
            
            // 3. 핸들러 실행 완료 로깅 (성공)
            eventStore.saveEvent(new HandlerExecutedEvent(handlerName, result.nodeName, result.status, `Handler processing finished.`));

        } catch (error) {
            // 4. 핸들러 실행 실패 로깅
            console.error(`[Decorator] ${handlerName}: Handler failed with error: ${error.message}`);
            eventStore.saveEvent(new HandlerExecutedEvent(handlerName, result.nodeName, result.status, `Handler processing failed: ${error.message}.`));
            throw error; // 오류를 다시 던져서 상위에서 처리될 수 있도록 합니다.
        }
        return handlerResult; // 원래 핸들러의 결과 반환
    }
}

module.exports = LoggingResultHandlerDecorator;