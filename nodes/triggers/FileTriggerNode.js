// src/nodes/triggers/FileTriggerNode.js (수정)
const AbstractTriggerNode = require('./AbstractTriggerNode');
const FileTriggerStrategy = require('./strategies/FileTriggerStrategy');

class FileTriggerNode extends AbstractTriggerNode {
    // id, name, description 제거
    constructor(filePath, eventType = 'change') {
        super();
        this.filePath = filePath;
        this.eventType = eventType;

        this.strategy = new FileTriggerStrategy(filePath, eventType);
        this.strategy.on('trigger', () => this.eventEmitter.emit('trigger'));
    }

    execute() {
        // id 제거로 인한 콘솔 로그 수정
        console.log(`[FileTriggerNode] 트리거 노드 실행 (감지 시작).`);
        this.strategy.startMonitoring();
    }
}

module.exports = FileTriggerNode;