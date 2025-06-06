// src/nodes/triggers/TimeTriggerNode.js
const AbstractTriggerNode = require('./AbstractTriggerNode');
const TimeTriggerStrategy = require('./strategies/TimeTriggerStrategy');

/**
 * @class TimeTriggerNode
 * 특정 시간 간격으로 워크플로우를 트리거하는 노드.
 * (실제 시간 감지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 * 전략 패턴을 사용하여 실제 시간 감지 로직을 TimeTriggerStrategy에 위임합니다.
 */
class TimeTriggerNode extends AbstractTriggerNode {
    constructor(id, name = '시간 트리거', description = '정해진 시간 간격으로 워크플로우를 시작합니다. (설계 모드)', intervalMs = 5000) {
        super(id, name, description);
        this.strategy = new TimeTriggerStrategy(intervalMs);
        this.strategy.on('trigger', (payload) => this.eventEmitter.emit('trigger', payload));
    }

    execute() {
        console.log(`[TimeTriggerNode:${this.id}] 트리거 노드 실행 (감지 시작).`);
        this.strategy.startMonitoring();
        return { message: "시간 트리거가 감지를 시작했습니다. (설계 모드)" };
    }

    // stop() 메서드 삭제
}

module.exports = TimeTriggerNode;