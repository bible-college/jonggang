const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class GmailTriggerStrategy extends ITriggerStrategy {
    constructor(implementation, accountId) {
        super();
        this.implementation = implementation;
        this.accountId = accountId;
        this.boundHandleImplementationEvent = this.processEvent.bind(this);
    }

    startMonitoring() {
        this.implementation.startListening(this.boundHandleImplementationEvent, { service: 'gmail', accountId: this.accountId });
    }

    stopMonitoring() {
        this.implementation.stopListening();
    }

    processEvent(payload) {
        super.notify(payload);
        // --- 수정된 부분 끝 ---
    }
}

module.exports = GmailTriggerStrategy;