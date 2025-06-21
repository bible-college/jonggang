
const AbstractSubject = require('../../../core/AbstractSubject');

/**
 * @interface ITriggerStrategy
 */
class ITriggerStrategy extends AbstractSubject {
    constructor() {
        super();
        if (new.target === ITriggerStrategy) {
            throw new TypeError("인터페이스 'ITriggerStrategy'는 직접 인스턴스화할 수 없습니다.");
        }
    }

    startMonitoring(implementationEventHandler) {
        throw new Error("메서드 'startMonitoring()'는 구체적인 트리거 전략에 의해 구현되어야 합니다.");
    }

    stopMonitoring() {
        throw new Error("메서드 'stopMonitoring()'는 구체적인 트리거 전략에 의해 구현되어야 합니다.");
    }

    processEvent(payload) {
        throw new Error("메서드 'processEvent()'는 구체적인 트리거 전략에 의해 구현되어야 합니다.");
    }
}

module.exports = ITriggerStrategy;