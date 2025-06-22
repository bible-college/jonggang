const ITriggerStrategy = require('../strategies/ITriggerStrategy'); //
const ITriggerImplementation = require('../../../core/ITriggerImplementation'); //

class GmailTriggerStrategy extends ITriggerStrategy {
    constructor(implementation, accountId, notificationType = 'immediate', threshold = 0) { // accountId 추가
        super(); //
        if (!(implementation instanceof ITriggerImplementation)) { //
            throw new Error("implementation은 ITriggerImplementation의 인스턴스여야 합니다."); //
        }
        this.implementation = implementation; //
        this.accountId = accountId; // 이 전략이 감지할 특정 Gmail 계정 ID

        this.notificationType = notificationType; //
        this.threshold = threshold; //

        this.boundHandleImplementationEvent = this.processEvent.bind(this); //
        console.log(`[GmailTriggerStrategy] 전략 생성됨 (알림 방식: ${this.notificationType}, 기준: ${this.threshold}, 계정 ID: ${this.accountId})`); //
    }

    startMonitoring() { //
        console.log(`[GmailTriggerStrategy] 감시 시작.`); //
        // 구현체에 서비스 종류와 accountId를 config로 전달
        this.implementation.startListening(this.boundHandleImplementationEvent, { service: 'gmail', accountId: this.accountId }); //
    }

    stopMonitoring() { //
        console.log(`[GmailTriggerStrategy] 감지 중지.`); //
        this.implementation.stopListening(); //
    }

    processEvent(payload) { //
        console.log(`[GmailTriggerStrategy] 이벤트 수신: ${payload ? JSON.stringify(payload) : 'N/A'}`); //

        // 페이로드의 ID와 이 전략의 accountId가 일치하는지 확인하는 필터링 로직 추가 가능
        if (payload && payload.id !== this.accountId) { //
            console.log(`[GmailTriggerStrategy] 계정 ID 불일치. (요청: ${this.accountId}, 수신: ${payload.id}) 이 이벤트는 무시합니다.`); //
            return; //
        }

        // 알림 방식 처리
        switch (this.notificationType) { //
            case 'immediate': //
                super.notify(payload); //
                break; //
            case 'batch': //
                super.notify(payload); //
                break; //
            case 'threshold': //
                super.notify(payload); //
                break; //
            default: //
                super.notify(payload); //
                break; //
        }
    }
}

module.exports = GmailTriggerStrategy; //