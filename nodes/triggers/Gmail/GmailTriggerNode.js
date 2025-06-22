const AbstractTriggerNode = require('../AbstractTriggerNode');
const GmailTriggerStrategy = require('./GmailTriggerStrategy');

class GmailTriggerNode extends AbstractTriggerNode {
    constructor(accountId, strategy) { 
        super();
        this.accountId = accountId;
        this.strategy = strategy;

        // 옵저버 패턴: 전략에 자신을 옵저버로 등록
        this.strategy.attach(this);
    }

    update(payload) {
        console.log(`[GmailTriggerNode] 전략으로부터 'update' 알림 수신 (계정: ${this.accountId}), 워크플로우로 전달.`);
        this.triggerCallback(payload);
    }
    execute(context) {
        this.strategy.startMonitoring();
    }

    stop() {
        this.strategy.stopMonitoring();
    }
}

module.exports = GmailTriggerNode;
