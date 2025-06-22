const AbstractTriggerNode = require('../AbstractTriggerNode');
const GmailTriggerStrategy = require('./GmailTriggerStrategy');

class GmailTriggerNode extends AbstractTriggerNode {
    constructor(accountId, strategy) { 
        super();
        this.accountId = accountId;

        if (!(strategy instanceof GmailTriggerStrategy)) {
            throw new Error("strategy는 GmailTriggerStrategy 인스턴스여야 합니다.");
        }
        this.strategy = strategy;

        // 옵저버 패턴: 전략에 자신을 옵저버로 등록
        this.strategy.attach(this);
    }

    update(payload) {
        console.log(`[GmailTriggerNode] 전략으로부터 'update' 알림 수신 (계정: ${this.accountId}), 워크플로우로 전달.`);
        if (this.workflowToExecute) {
            this.triggerCallback(payload);
        } else {
            console.log(`[GmailTriggerNode] 연결된 워크플로우 없음. 트리거 이벤트: ${JSON.stringify(payload)}`);
        }
    }

    execute(context) {
        console.log(`[GmailTriggerNode] 노드 실행 지시 (계정: ${this.accountId}). 감시 시작 위임.`);
        this.strategy.startMonitoring();
    }

    stop() {
        console.log(`[GmailTriggerNode] 노드 중지 지시 (계정: ${this.accountId}). 전략에 감지 중지 위임.`);
        this.strategy.stopMonitoring();
    }
}

module.exports = GmailTriggerNode;
