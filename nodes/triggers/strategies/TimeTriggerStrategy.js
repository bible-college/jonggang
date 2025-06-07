// src/nodes/triggers/strategies/TimeTriggerStrategy.js
const ITriggerStrategy = require('./ITriggerStrategy');

/**
 * @class TimeTriggerStrategy
 * 특정 시간 간격 또는 cron 표현식에 따라 이벤트를 발행하는 트리거 전략.
 * (실제 시간 감지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 */
class TimeTriggerStrategy extends ITriggerStrategy {
    constructor(intervalMs = 5000) {
        super();
        this.intervalMs = intervalMs;
    }

    startMonitoring() {
        console.log(`[TimeTriggerStrategy] (설계 모드) 시간 트리거 감지 시작 지시: ${this.intervalMs / 1000}초 간격으로 '추정'.`);
        console.log(`[TimeTriggerStrategy] (설계 모드) 현재 시간: ${new Date().toLocaleTimeString()} -- 트리거 발생 '추정'`);

        this.emit('trigger', {
            timestamp: new Date(),
            message: `시간 트리거(시뮬레이션) 발생: ${new Date().toLocaleTimeString()}`
        });
    }

    // stopMonitoring() 메서드 삭제
}

module.exports = TimeTriggerStrategy;