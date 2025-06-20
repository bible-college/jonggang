// src/nodes/triggers/youtube/YouTubeLikeTriggerStrategy.js
const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

/**
 * @class YouTubeLikeTriggerStrategy
 * 유튜브 좋아요 수 변화를 감지하여 이벤트를 발행하는 구체적인 트리거 전략.
 * 이 클래스는 전략 패턴의 Concrete Strategy 역할과 옵저버 패턴의 Concrete Subject 역할을 겸합니다.
 * 또한, 내부적으로 다양한 '알림 방식' 알고리즘을 개념적으로 캡슐화합니다.
 */
class YouTubeLikeTriggerStrategy extends ITriggerStrategy {
    // notificationType을 추가하여 알림 방식을 전략의 일부로 포함
    constructor(implementation, notificationType = 'immediate', threshold = 0) {
        super();
        if (!(implementation instanceof ITriggerImplementation)) {
            throw new Error("implementation은 ITriggerImplementation의 인스턴스여야 합니다.");
        }
        this.implementation = implementation; // 실제 감지 로직을 처리할 구현체

        this.notificationType = notificationType; // 알림 방식: 'immediate', 'batch', 'threshold'
        this.threshold = threshold; // 'threshold' 방식 사용 시 기준값 (개념적)

        // 알고리즘 배제를 위해 실제 상태 관리 변수들을 제거
        // this.eventBuffer = [];
        // this.batchTimer = null;
        // this.lastNotifiedLikes = undefined;

        this.boundHandleImplementationEvent = this.processEvent.bind(this);
        console.log(`[YouTubeLikeTriggerStrategy] 전략 생성됨 (알림 방식: ${this.notificationType}, 기준: ${this.threshold})`);
    }

    // ITriggerStrategy의 startMonitoring 구현
    startMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감시 시작. 구현체에 위임. (개념적)`);
        this.implementation.startListening(this.boundHandleImplementationEvent);
    }

    // ITriggerStrategy의 stopMonitoring 구현
    stopMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감지 중지. 구현체에 위임. (개념적)`);
        // 배치 알림 전략 관련 중지 로직도 제거 (알고리즘 배제)
        this.implementation.stopListening();
    }

    // ITriggerStrategy의 processEvent 구현
    processEvent(payload) {
        console.log(`[YouTubeLikeTriggerStrategy] 구현체로부터 이벤트 수신. (수신 비디오 ID: ${payload ? payload.videoId : 'N/A'})`);

        switch (this.notificationType) {
            case 'immediate':
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 즉시 알림 전략 실행.`);
                super.notify(payload);
                break;

            case 'batch':
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 배치 알림 전략 실행. (개념적: 여러 이벤트 모아서 알림)`);
                // 실제 배치 로직 제거. 개념적으로는 여기서 이벤트들이 버퍼에 쌓였다가 조건 충족 시 알림
                super.notify(payload);
                break;

            case 'threshold':
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 임계치 알림 전략 실행. (개념적: 좋아요 변화 ${this.threshold} 이상일 때 알림)`);
                // 실제 임계치 계산 및 비교 로직 제거. 개념적으로는 조건 충족 시 알림
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