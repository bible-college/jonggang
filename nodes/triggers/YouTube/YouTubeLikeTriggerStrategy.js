
const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class YouTubeLikeTriggerStrategy extends ITriggerStrategy {
    constructor(implementation, notificationType = 'immediate', threshold = 0) {
        super();
        if (!(implementation instanceof ITriggerImplementation)) {
            throw new Error("implementation은 ITriggerImplementation의 인스턴스여야 합니다.");
        }
        this.implementation = implementation;

        this.notificationType = notificationType; 
        this.threshold = threshold;

        this.boundHandleImplementationEvent = this.processEvent.bind(this);
        console.log(`[YouTubeLikeTriggerStrategy] 전략 생성됨 (알림 방식: ${this.notificationType}, 기준: ${this.threshold})`);
    }

    startMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감시 시작. 구현체에 위임. (개념적)`);
        this.implementation.startListening(this.boundHandleImplementationEvent);
    }

    stopMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감지 중지. 구현체에 위임. (개념적)`);
        this.implementation.stopListening();
    }

    processEvent(payload) {
        console.log(`[YouTubeLikeTriggerStrategy] 구현체로부터 이벤트 수신. (수신 비디오 ID: ${payload ? payload.videoId : 'N/A'})`);

        switch (this.notificationType) {
            case 'immediate':
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 즉시 알림 전략 실행.`);
                super.notify(payload);
                break;

            case 'batch':
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 배치 알림 전략 실행. (개념적: 여러 이벤트 모아서 알림)`);
                super.notify(payload);
                break;

            case 'threshold':
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 임계치 알림 전략 실행. (개념적: 좋아요 변화 ${this.threshold} 이상일 때 알림)`);
                super.notify(payload);
                break;
                
            default:
                console.warn(`[YouTubeLikeTriggerStrategy] 알 수 없는 알림 방식: ${this.notificationType}. 즉시 알림으로 대체. (개념적)`);
                super.notify(payload);
                break;
        }
    }
}

module.exports = YouTubeLikeTriggerStrategy;