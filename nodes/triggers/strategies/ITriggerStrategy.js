// src/nodes/triggers/strategies/ITriggerStrategy.js
const AbstractSubject = require('../../../core/AbstractSubject'); // 경로에 따라 조정

/**
 * @interface ITriggerStrategy
 * 특정 이벤트를 감지하고 옵저버에게 알리는 추상 전략 인터페이스.
 * 전략 패턴의 Strategy 역할과 옵저버 패턴의 Subject 역할을 겸합니다.
 */
class ITriggerStrategy extends AbstractSubject {
    constructor() {
        super();
        if (new.target === ITriggerStrategy) {
            throw new TypeError("인터페이스 'ITriggerStrategy'는 직접 인스턴스화할 수 없습니다.");
        }
    }

    /**
     * 감시를 시작합니다. 구체적인 트리거 전략은 이 메서드를 구현해야 합니다.
     * @param {function} implementationEventHandler - 구현체에서 이벤트를 받았을 때 호출할 콜백 함수.
     */
    startMonitoring(implementationEventHandler) {
        throw new Error("메서드 'startMonitoring()'는 구체적인 트리거 전략에 의해 구현되어야 합니다.");
    }

    /**
     * 감시를 중지합니다. 구체적인 트리거 전략은 이 메서드를 구현해야 합니다.
     */
    stopMonitoring() {
        throw new Error("메서드 'stopMonitoring()'는 구체적인 트리거 전략에 의해 구현되어야 합니다.");
    }

    /**
     * 구현체로부터 수신된 이벤트를 처리하고, 필요한 경우 옵저버에게 알립니다.
     * 이 메서드에 전략별 로직(필터링, 변환 등)이 들어갈 수 있습니다.
     * @param {Object} payload - 구현체로부터 전달된 이벤트 데이터.
     */
    processEvent(payload) {
        throw new Error("메서드 'processEvent()'는 구체적인 트리거 전략에 의해 구현되어야 합니다.");
    }
}

module.exports = ITriggerStrategy;