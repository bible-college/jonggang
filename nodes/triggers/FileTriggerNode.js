// src/nodes/triggers/FileTriggerNode.js
const AbstractTriggerNode = require('./AbstractTriggerNode');
const FileTriggerStrategy = require('./strategies/FileTriggerStrategy');

/**
 * @class FileTriggerNode
 * 특정 파일 또는 디렉토리의 변경을 감지하여 워크플로우를 트리거하는 노드.
 * (실제 파일 감지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 * 전략 패턴을 사용하여 실제 파일 감지 로직을 FileTriggerStrategy에 위임합니다.
 */
class FileTriggerNode extends AbstractTriggerNode {
    constructor(id, name = '파일 트리거', description = '파일 또는 디렉토리 변경 시 워크플로우를 시작합니다. (설계 모드)', filePath, eventType = 'change') {
        super(id, name, description); // 부모 생성자 호출
        this.filePath = filePath; // filePath를 인스턴스 속성으로 저장
        this.eventType = eventType; // eventType을 인스턴스 속성으로 저장

        this.strategy = new FileTriggerStrategy(filePath, eventType);
        this.strategy.on('trigger', () => this.eventEmitter.emit('trigger'));
    }

    execute() {
        console.log(`[FileTriggerNode:${this.id}] 트리거 노드 실행 (감지 시작).`);
        this.strategy.startMonitoring();
    }
}

module.exports = FileTriggerNode;