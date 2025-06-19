// src/nodes/triggers/strategies/YouTubeLikeTriggerStrategy.js
const ITriggerStrategy = require('./ITriggerStrategy');

/**
 * @class YouTubeLikeTriggerStrategy
 * 특정 유튜브 비디오의 '좋아요' 수 변화를 감지하여 이벤트를 발행하는 트리거 전략.
 * (알고리즘 배제: 워크플로우 실행 시 좋아요 인식되었다고 가정하고 1회성 트리거 발생)
 */
class YouTubeLikeTriggerStrategy extends ITriggerStrategy {
    constructor(videoId) { // initialLikes 제거
        super();
        this.videoId = videoId;

    }

    startMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 비디오 '${this.videoId}' `);
        
        // 워크플로우 실행 시 1회성 트리거 이벤트를 발행
        this.emit('trigger', {
            timestamp: new Date(),
            videoId: this.videoId,
            message: `유튜브 비디오 '${this.videoId}' 좋아요 변화 감지! ` // 변화된 좋아요 수 제거
        });
    }

    stopMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 유튜브 좋아요 감지 중지 (가정).`);
    }
}

module.exports = YouTubeLikeTriggerStrategy;