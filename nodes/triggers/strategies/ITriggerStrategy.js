// src/nodes/triggers/strategies/ITriggerStrategy.js
const EventEmitter = require('events');

/**
 * @interface ITriggerStrategy
 * 트리거 감지 전략을 위한 인터페이스 (추상 클래스로 구현).
 * 모든 구체적인 트리거 전략은 이 인터페이스를 구현해야 합니다.
 * (중지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 */
class ITriggerStrategy extends EventEmitter {
    constructor() {
        super();
        if (new.target === ITriggerStrategy) {
            throw new TypeError("Interface 'ITriggerStrategy' cannot be instantiated directly.");
        }
    }

    /**
     * 트리거 감지 로직을 시작합니다.
     * @abstract
     */
    startMonitoring() {
        throw new Error("Method 'startMonitoring()' must be implemented.");
    }

    // stopMonitoring() 메서드 삭제
}

module.exports = ITriggerStrategy;