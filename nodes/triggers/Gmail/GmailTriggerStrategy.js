const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class GmailTriggerStrategy extends ITriggerStrategy {
    constructor(implementation, accountId) {
        super();
        this.implementation = implementation;
        this.accountId = accountId;
        this.boundHandleImplementationEvent = this.processEvent.bind(this);

        console.log(`[GmailTriggerStrategy] 전략 생성됨 (계정 ID: ${this.accountId})`);
    }

    startMonitoring() {
        console.log(`[GmailTriggerStrategy] 감시 시작.`);
        this.implementation.startListening(this.boundHandleImplementationEvent, { service: 'gmail', accountId: this.accountId });
    }

    stopMonitoring() {
        console.log(`[GmailTriggerStrategy] 감지 중지.`);
        this.implementation.stopListening();
    }

    processEvent(payload) {
        console.log(`[GmailTriggerStrategy] 이벤트 수신 즉시 옵저버에게 알림.`);
        super.notify(payload);
        // --- 수정된 부분 끝 ---
    }
}

module.exports = GmailTriggerStrategy;