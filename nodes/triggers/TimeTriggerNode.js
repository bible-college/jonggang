// src/nodes/triggers/TimeTriggerNode.js (수정)
const AbstractTriggerNode = require('./AbstractTriggerNode');
const TimeTriggerStrategy = require('./strategies/TimeTriggerStrategy');

class TimeTriggerNode extends AbstractTriggerNode {
    // id, name, description 제거
    constructor(intervalMs = 5000) {
        super();
        this.intervalMs = intervalMs;

        this.strategy = new TimeTriggerStrategy(intervalMs);
        this.strategy.on('trigger', () => this.eventEmitter.emit('trigger'));
    }

    execute() {
        // id 제거로 인한 콘솔 로그 수정
        console.log(`[TimeTriggerNode] 트리거 노드 실행 (감지 시작).`);
        this.strategy.startMonitoring();
    }
}

module.exports = TimeTriggerNode;