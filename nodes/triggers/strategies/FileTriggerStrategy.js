// src/nodes/triggers/strategies/FileTriggerStrategy.js
const ITriggerStrategy = require('./ITriggerStrategy');

/**
 * @class FileTriggerStrategy
 * 특정 파일 또는 디렉토리의 변경을 감지하여 이벤트를 발행하는 트리거 전략.
 * (실제 파일 감지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 */
class FileTriggerStrategy extends ITriggerStrategy {
    constructor(filePath, eventType = 'change') {
        super();
        this.filePath = filePath;
        this.eventType = eventType;
    }

    startMonitoring() {
        console.log(`[FileTriggerStrategy] (설계 모드) 파일 트리거 감지 시작 지시: 경로 '${this.filePath}', 이벤트 '${this.eventType}'`);
        console.log(`[FileTriggerStrategy] (설계 모드) 현재 시간: ${new Date().toLocaleTimeString()} -- 파일 변경 '추정'`);

        this.emit('trigger', {
            timestamp: new Date(),
            eventType: this.eventType,
            filename: 'simulated_file.txt',
            filePath: this.filePath,
            message: `파일 트리거(시뮬레이션) 발생: ${new Date().toLocaleTimeString()}`
        });
    }

    // stopMonitoring() 메서드 삭제
}

module.exports = FileTriggerStrategy;