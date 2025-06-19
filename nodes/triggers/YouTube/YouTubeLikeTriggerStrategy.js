// src/nodes/triggers/youtube/YouTubeLikeTriggerStrategy.js
const ITriggerStrategy = require('../strategies/ITriggerStrategy'); // 경로 변경: ../strategies/ITriggerStrategy

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

        // 알고리즘 및 오류 처리 배제, 1회성 트리거 발생만 시뮬레이션
        if (!this.hasTriggered) { // 한 번만 트리거되도록 제한
            // notify()를 사용하여 옵저버들에게 알림
            this.notify({ // ITriggerStrategy의 notify 메서드 호출
                timestamp: new Date(),
                videoId: this.videoId,
                message: `유튜브 비디오 '${this.videoId}' 좋아요 변화 감지! (시뮬레이션)`
            });
            console.log(`[YouTubeLikeTriggerStrategy] 비디오 '${this.videoId}' 트리거 이벤트 발행됨.`);
            this.hasTriggered = true; // 트리거 발생 플래그 설정
        } else {
            console.log(`[YouTubeLikeTriggerStrategy] 비디오 '${this.videoId}'는 이미 트리거되었습니다. (1회성 동작)`);
        }
    }

    stopMonitoring() {
        console.log(`[YouTubeLikeTriggerStrategy] 전략 실행: 유튜브 좋아요 감지 중지 (가정).`);
    }
}

module.exports = YouTubeLikeTriggerStrategy;