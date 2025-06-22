const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class GmailTriggerStrategy extends ITriggerStrategy {
    // notificationType 및 threshold 인자 제거 (더 이상 필요 없음)
    constructor(implementation, accountId) {
        super();
        if (!(implementation instanceof ITriggerImplementation)) {
            throw new Error("implementation은 ITriggerImplementation의 인스턴스여야 합니다.");
        }
        this.implementation = implementation;
        this.accountId = accountId;

        // this.notificationType = notificationType; // 제거
        // this.threshold = threshold; // 제거

        this.boundHandleImplementationEvent = this.processEvent.bind(this);
        // 콘솔 로그 메시지도 변경 (notificationType, threshold 정보 제거)
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
        console.log(`[GmailTriggerStrategy] 이벤트 수신: ${payload ? JSON.stringify(payload) : 'N/A'}`);

        // 페이로드의 ID와 이 전략의 accountId가 일치하는지 확인하는 필터링 로직 (유지)
        if (payload && payload.id !== this.accountId) {
            console.log(`[GmailTriggerStrategy] 계정 ID 불일치. (요청: ${this.accountId}, 수신: ${payload.id}) 이 이벤트는 무시합니다.`);
            return;
        }

        // --- 수정된 부분: switch 문 제거, 즉시 notify 호출 ---
        console.log(`[GmailTriggerStrategy] 이벤트 수신 시 즉시 옵저버에게 알림.`);
        super.notify(payload);
        // --- 수정된 부분 끝 ---
    }
}

module.exports = GmailTriggerStrategy;