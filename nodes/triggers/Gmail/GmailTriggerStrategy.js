const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class GmailTriggerStrategy extends ITriggerStrategy {
    constructor(implementation, notificationType = 'immediate', threshold = 0) {
        super();
        if (!(implementation instanceof ITriggerImplementation)) {
            throw new Error("implementation은 ITriggerImplementation의 인스턴스여야 합니다.");
        }
        this.implementation = implementation;
        this.notificationType = notificationType;
        this.threshold = threshold;

        this.boundHandleImplementationEvent = this.processEvent.bind(this);
        console.log(`[GmailTriggerStrategy] 전략 생성됨 (알림 방식: ${this.notificationType}, 기준: ${this.threshold})`);
    }

    startMonitoring() {
        console.log(`[GmailTriggerStrategy] 감시 시작.`);
        this.implementation.startListening(this.boundHandleImplementationEvent);
    }

    stopMonitoring() {
        console.log(`[GmailTriggerStrategy] 감지 중지.`);
        this.implementation.stopListening();
    }

    processEvent(payload) {
        console.log(`[GmailTriggerStrategy] 이벤트 수신: ${payload ? JSON.stringify(payload) : 'N/A'}`);

        // 알림 방식 처리 (개념적)
        switch (this.notificationType) {
            case 'immediate':
                super.notify(payload);
                break;
            case 'batch':
                super.notify(payload);
                break;
            case 'threshold':
                super.notify(payload);
                break;
            default:
                super.notify(payload);
                break;
        }
    }
}

module.exports = GmailTriggerStrategy;
