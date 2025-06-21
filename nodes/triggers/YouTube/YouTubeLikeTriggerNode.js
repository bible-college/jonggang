
const AbstractTriggerNode = require('../AbstractTriggerNode');
const YouTubeLikeTriggerStrategy = require('./YouTubeLikeTriggerStrategy'); // 전략 임포트

class YouTubeLikeTriggerNode extends AbstractTriggerNode {
    constructor(videoId, strategy) { 
        super();
        this.videoId = videoId;

        if (!(strategy instanceof YouTubeLikeTriggerStrategy)) {
            throw new Error("strategy는 YouTubeLikeTriggerStrategy의 인스턴스여야 합니다.");
        }
        this.strategy = strategy;

        this.strategy.attach(this);
    }

    update(payload) {
        console.log(`[YouTubeLikeTriggerNode] 전략으로부터 'update' 알림 수신 (노드 연결 비디오 ID: ${this.videoId}), 워크플로우로 전달.`);

        if (this.workflowToExecute) {
            this.triggerCallback(payload);
        } else {
            console.log(`[YouTubeLikeTriggerNode] 연결된 워크플로우 없음. 트리거 이벤트: ${JSON.stringify(payload)}`);
        }
    }

    execute(context) { 
        console.log(`[YouTubeLikeTriggerNode] 노드 실행 지시 (노드 연결 비디오 ID: ${this.videoId}). (트리거 노드는 감시 준비만 함)`);
        this.strategy.startMonitoring();
    }

    stop() {
        console.log(`[YouTubeLikeTriggerNode] 노드 중지 지시 (노드 연결 비디오 ID: ${this.videoId}). 전략에 감지 중지 위임.`);
        this.strategy.stopMonitoring();
    }
}

module.exports = YouTubeLikeTriggerNode;