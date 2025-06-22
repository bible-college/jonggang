// jonggang/nodes/triggers/TriggerNode.js
const AbstractTriggerNode = require('./AbstractTriggerNode');
const ITriggerStrategy = require('./strategies/ITriggerStrategy'); 

class TriggerNode extends AbstractTriggerNode {
    constructor(id, strategy) {
        super();
        this.id = id;
        this.strategy = strategy;
        this.strategy.attach(this); 
    }

    update(payload) { // Observer 인터페이스의 update 메서드 구현
        console.log(`update' 알림 수신 (노드 연결 ID: ${this.id}), 워크플로우로 전달.`);
        this.triggerCallback(payload);

    }

    execute(context) { // Node의 execute 메서드 구현
        this.strategy.startMonitoring();
    }

    stop() {
        this.strategy.stopMonitoring();
    }
}

module.exports = TriggerNode;