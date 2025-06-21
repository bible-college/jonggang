// src/nodes/triggers/youtube/YouTubeLikeTriggerNode.js
const AbstractTriggerNode = require('../AbstractTriggerNode');
const YouTubeLikeTriggerStrategy = require('./YouTubeLikeTriggerStrategy'); // 전략 임포트

/**
 * @class YouTubeLikeTriggerNode
 * 유튜브 '좋아요' 감지를 담당하는 트리거 노드.
 * 전략 패턴의 Context(문맥) 역할을 수행하며, 구체적인 감지 로직을 전략 객체에 위임합니다.
 * 또한, 컴포지트 패턴의 Leaf(리프) 노드로서 WorkflowComponent를 상속받습니다.
 * 옵저버 패턴에서 Strategy에 대한 Observer 역할을 직접 구현합니다.
 */
class YouTubeLikeTriggerNode extends AbstractTriggerNode {
    constructor(videoId, strategy) { // videoId는 이 노드 인스턴스의 식별자 역할을 합니다.
        super();
        this.videoId = videoId; // 노드 인스턴스에 고유 ID(비디오 ID) 부여

        // **전략 패턴: Context가 구체적인 전략 객체를 보관합니다.**
        // 이 노드가 전략을 사용합니다.
        if (!(strategy instanceof YouTubeLikeTriggerStrategy)) {
            throw new Error("strategy는 YouTubeLikeTriggerStrategy의 인스턴스여야 합니다.");
        }
        this.strategy = strategy;

        // **옵저버 패턴: 전략에 자신을 옵저버로 등록합니다.**
        // 이 노드가 전략의 옵저버 인터페이스를 구현하고, 전략이 notify를 호출하면 이 노드의 update가 실행됨
        this.strategy.attach(this);
    }

    /**
     * 옵저버로서 전략으로부터 알림을 받았을 때 호출되는 메서드.
     * 이 알림을 워크플로우 실행기(RunnerFacade)로 전달합니다.
     * @param {Object} payload - 전략에서 전달된 데이터 (videoId 포함)
     */
    update(payload) { // Observer 인터페이스의 update 메서드 구현
        console.log(`[YouTubeLikeTriggerNode] 전략으로부터 'update' 알림 수신 (노드 연결 비디오 ID: ${this.videoId}), 워크플로우로 전달.`);
        // 이 노드 인스턴스가 관심있는 videoId와 페이로드의 videoId를 여기서 필터링할 수도 있습니다.
        // 그러나 현재는 전략이 필터링을 담당하지 않으므로 모든 알림을 전달합니다.
        if (this.workflowToExecute) {
            this.triggerCallback(payload);
        } else {
            console.log(`[YouTubeLikeTriggerNode] 연결된 워크플로우 없음. 트리거 이벤트: ${JSON.stringify(payload)}`);
        }
    }

    execute(context) { // WorkflowComponent의 execute 메서드 구현
        console.log(`[YouTubeLikeTriggerNode] 노드 실행 지시 (노드 연결 비디오 ID: ${this.videoId}). (트리거 노드는 감시 준비만 함)`);
        // 노드가 실행 지시를 받으면, 내부 전략에게 감시 시작을 위임합니다.
        this.strategy.startMonitoring();
    }

    /**
     * 노드 중지 메서드. 전략에 감지 중지를 위임합니다.
     */
    stop() {
        console.log(`[YouTubeLikeTriggerNode] 노드 중지 지시 (노드 연결 비디오 ID: ${this.videoId}). 전략에 감지 중지 위임.`);
        this.strategy.stopMonitoring();
    }
}

module.exports = YouTubeLikeTriggerNode;