
const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class YouTubeLikeTriggerStrategy extends ITriggerStrategy {

    constructor(implementation, videoId) {
        super();
        this.implementation = implementation; 
        this.videoId = videoId; 
        this.boundHandleImplementationEvent = this.processEvent.bind(this);
        console.log(`[YouTubeLikeTriggerStrategy] 전략 생성됨 (비디오 ID: ${this.videoId})`);
    }

    startMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감시 시작. 구현체에 위임.`);
        this.implementation.startListening(this.boundHandleImplementationEvent, { service: 'youtube', videoId: this.videoId });
    }

    stopMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 감지 중지. 구현체에 위임.`);
        this.implementation.stopListening();
    }

    processEvent(payload) {
        console.log(`[YouTubeLikeTriggerStrategy] 이벤트 수신 즉시 옵저버에게 알림.`);
        super.notify(payload);
        // --- 수정된 부분 끝 ---
    }
}

module.exports = YouTubeLikeTriggerStrategy;