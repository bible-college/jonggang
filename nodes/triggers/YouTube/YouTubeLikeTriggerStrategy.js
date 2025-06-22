// src/nodes/triggers/youtube/YouTubeLikeTriggerStrategy.js
const ITriggerStrategy = require('../strategies/ITriggerStrategy'); //
const ITriggerImplementation = require('../../../core/ITriggerImplementation'); //

/**
 * @class YouTubeLikeTriggerStrategy
 * 유튜브 좋아요 수 변화를 감지하여 이벤트를 발행하는 구체적인 트리거 전략.
 * 이 클래스는 전략 패턴의 Concrete Strategy 역할과 옵저버 패턴의 Concrete Subject 역할을 겸합니다.
 * 또한, 내부적으로 다양한 '알림 방식' 알고리즘을 개념적으로 캡슐화합니다.
 */
class YouTubeLikeTriggerStrategy extends ITriggerStrategy {
    constructor(implementation, videoId, notificationType = 'immediate', threshold = 0) { // videoId 추가
        super(); //
        if (!(implementation instanceof ITriggerImplementation)) { //
            throw new Error("implementation은 ITriggerImplementation의 인스턴스여야 합니다."); //
        }
        this.implementation = implementation; // 실제 감지 로직을 처리할 구현체
        this.videoId = videoId; // 이 전략이 감지할 특정 비디오 ID

        this.notificationType = notificationType; // 알림 방식: 'immediate', 'batch', 'threshold'
        this.threshold = threshold; // 'threshold' 방식 사용 시 기준값 (개념적)

        this.boundHandleImplementationEvent = this.processEvent.bind(this); //
        console.log(`[YouTubeLikeTriggerStrategy] 전략 생성됨 (알림 방식: ${this.notificationType}, 기준: ${this.threshold}, 비디오 ID: ${this.videoId})`); //
    }

    // ITriggerStrategy의 startMonitoring 구현
    startMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감시 시작. 구현체에 위임.`); //
        // 구현체에 서비스 종류와 videoId를 config로 전달
        this.implementation.startListening(this.boundHandleImplementationEvent, { service: 'youtube', videoId: this.videoId }); //
    }

    // ITriggerStrategy의 stopMonitoring 구현
    stopMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감지 중지. 구현체에 위임.`); //
        this.implementation.stopListening(); //
    }

    // ITriggerStrategy의 processEvent 구현
    processEvent(payload) {
        console.log(`[YouTubeLikeTriggerStrategy] 구현체로부터 이벤트 수신. (수신 비디오 ID: ${payload ? payload.id : 'N/A'})`); //

        // 페이로드의 ID와 이 전략의 videoId가 일치하는지 확인하는 필터링 로직 추가 가능
        if (payload && payload.id !== this.videoId) { //
            console.log(`[YouTubeLikeTriggerStrategy] 비디오 ID 불일치. (요청: ${this.videoId}, 수신: ${payload.id}) 이 이벤트는 무시합니다.`); //
            return; //
        }

        switch (this.notificationType) { //
            case 'immediate': //
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 즉시 알림 전략 실행.`); //
                super.notify(payload); //
                break; //

            case 'batch': //
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 배치 알림 전략 실행.`); //
                super.notify(payload); //
                break; //

            case 'threshold': //
                console.log(`[YouTubeLikeTriggerStrategy] 알림 방식: 임계치 알림 전략 실행.`); //
                super.notify(payload); //
                break; //

            default: //
                console.warn(`[YouTubeLikeTriggerStrategy] 알 수 없는 알림 방식: ${this.notificationType}. 즉시 알림으로 대체.`); //
                super.notify(payload); //
                break; //
        }
    }
}

module.exports = YouTubeLikeTriggerStrategy; //