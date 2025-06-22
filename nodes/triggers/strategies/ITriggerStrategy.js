
const AbstractSubject = require('../../../core/AbstractSubject'); 

class ITriggerStrategy extends AbstractSubject {
    constructor() {
        super();
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