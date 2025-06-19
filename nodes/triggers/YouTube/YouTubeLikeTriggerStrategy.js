// src/nodes/triggers/youtube/YouTubeLikeTriggerStrategy.js
const ITriggerStrategy = require('../strategies/ITriggerStrategy');

/**
 * @class YouTubeLikeTriggerStrategy
 * 특정 유튜브 비디오의 '좋아요' 수 변화를 감지하여 이벤트를 발행하는 트리거 전략.
 * (알고리즘 배제: 워크플로우 실행 시 좋아요 인식되었다고 가정하고 1회성 트리거 발생)
 */
class YouTubeLikeTriggerStrategy extends ITriggerStrategy {
    constructor(videoId) {
        super();
        this.videoId = videoId;
        this.hasTriggered = false; // 워크플로우 실행 시 1회성 트리거를 위한 플래그
    }

    startMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 비디오 '${this.videoId}' 감시 시작 (가정).`);
    }

    stopMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 유튜브 좋아요 감지 중지 (가정).`);
    }
}

module.exports = YouTubeLikeTriggerStrategy;