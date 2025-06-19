// src/nodes/triggers/YouTubeLikeTriggerNode.js
const AbstractTriggerNode = require('./AbstractTriggerNode');
const YouTubeLikeTriggerStrategy = require('./strategies/YouTubeLikeTriggerStrategy');

/**
 * @class YouTubeLikeTriggerNode
 * 유튜브 '좋아요' 감지를 담당하는 트리거 노드.
 * 전략 패턴의 Context(문맥) 역할을 수행하며, 구체적인 감지 로직을 전략 객체에 위임합니다.
 * 또한, 컴포지트 패턴의 Leaf(리프) 노드로서 WorkflowComponent를 상속받습니다.
 */
class YouTubeLikeTriggerNode extends AbstractTriggerNode {
    constructor(videoId) { 
        super();
        this.videoId = videoId;
        // initialLikes 제거

        // **전략 패턴: Context가 구체적인 전략 객체를 생성하고 보관합니다.**
        this.strategy = new YouTubeLikeTriggerStrategy(videoId); 

        // 전략에서 'trigger' 이벤트 발생 시, 자신의 eventEmitter를 통해 외부에 'trigger' 이벤트를 워크플로우에 전달
        this.strategy.on('trigger', (payload) => {
            console.log(`[YouTubeLikeTriggerNode] 전략에서 트리거 이벤트 수신, 워크플로우로 전달.`);
            this.eventEmitter.emit('trigger', payload); // 전략으로부터 받은 payload를 그대로 전달
        });
    }
    execute(context) { // WorkflowComponent의 execute 메서드 구현
        console.log(`[YouTubeLikeTriggerNode] 노드 실행 지시. 전략에 감지 시작 위임.`);
        this.strategy.startMonitoring(); // **전략 패턴: Context가 Strategy에 동작을 위임합니다.**
    }

    /**
     * 노드 중지 메서드. 전략에 감지 중지를 위임합니다.
     */
    stop() {
        console.log(`[YouTubeLikeTriggerNode] 노드 중지 지시. 전략에 감지 중지 위임.`);
        this.strategy.stopMonitoring(); // **전략 패턴: Context가 Strategy에 동작을 위임합니다.**
    }
}

module.exports = YouTubeLikeTriggerNode;