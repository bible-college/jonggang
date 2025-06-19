// src/nodes/triggers/strategies/ITriggerStrategy.js (새로운 AbstractSubject를 상속)
const AbstractSubject = require('../../../core/AbstractSubject'); // 경로에 따라 조정

class ITriggerStrategy extends AbstractSubject { // AbstractSubject를 상속
    constructor() {
        super(); // AbstractSubject의 생성자 호출
        if (new.target === ITriggerStrategy) {
            throw new TypeError("Interface 'ITriggerStrategy' cannot be instantiated directly.");
        }
    }

    startMonitoring() {
        throw new Error("Method 'startMonitoring()' must be implemented by concrete trigger strategies.");
    }

    stopMonitoring() {
        throw new Error("Method 'stopMonitoring()' must be implemented by concrete trigger strategies.");
    }
}

module.exports = ITriggerStrategy;