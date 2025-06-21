
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class YouTubeLikeTriggerImplementation extends ITriggerImplementation {
    constructor(videoId) {
        super();
        this.videoId = videoId;
        this.triggerCallback = null;
        this.hasTriggered = false; 
    }

    startListening(callback) {
        this.triggerCallback = callback;
        console.log(`[YouTubeLikeTriggerImplementation] 비디오 '${this.videoId}' 감지 시작 (가정).`);
        // 실제 시나리오에서는 여기에 폴링 또는 웹훅 리스닝을 설정합니다.
        // 이 개념적 설계를 위해서는, 아직 트리거되지 않았다면 트리거를 시뮬레이션합니다.
        // if (!this.hasTriggered) {
        // console.log(`[YouTubeLikeTriggerImplementation] 강제 트리거 이벤트 발생 시뮬레이션.`);
        // this.triggerCallback({
        //     timestamp: new Date(),
        //     videoId: this.videoId,
        //     message: `[Initial Simulation] 유튜브 비디오 '${this.videoId}' 좋아요 변화 감지!`
        // });
        // this.hasTriggered = true;
        // }
    }

    stopListening() {
        console.log(`[YouTubeLikeTriggerImplementation] 유튜브 좋아요 감지 중지 (가정).`);
        this.triggerCallback = null;
    }
}

module.exports = YouTubeLikeTriggerImplementation;