// src/nodes/triggers/youtube/YouTubeLikeTriggerNode.js
const AbstractTriggerNode = require('../AbstractTriggerNode'); // 경로 변경: ../AbstractTriggerNode
const YouTubeLikeTriggerStrategy = require('./YouTubeLikeTriggerStrategy'); // 경로 변경: ../strategies/YouTubeLikeTriggerStrategy

/**
 * @class YouTubeLikeTriggerNode
 * 유튜브 '좋아요' 감지를 담당하는 트리거 노드.
 * 전략 패턴의 Context(문맥) 역할을 수행하며, 구체적인 감지 로직을 전략 객체에 위임합니다.
 * 또한, 컴포지트 패턴의 Leaf(리프) 노드로서 WorkflowComponent를 상속받습니다.
 * * 옵저버 패턴에서 Strategy에 대한 Observer 역할을 직접 구현합니다.
 */
class YouTubeLikeTriggerNode extends AbstractTriggerNode {
    constructor(videoId) { 
        super();
        this.videoId = videoId;

        // **전략 패턴: Context가 구체적인 전략 객체를 생성하고 보관합니다.**
        this.strategy = new YouTubeLikeTriggerStrategy(videoId); 

        // 전략에 자신을 옵저버로 등록
        // 이 노드가 전략의 옵저버 인터페이스를 구현하고, 전략이 notify를 호출하면 이 노드의 update가 실행됨
        this.strategy.attach(this); 
    }

    /**
     * 옵저버로서 전략으로부터 알림을 받았을 때 호출되는 메서드.
     * 이 알림을 워크플로우 실행기(RunnerFacade)로 전달합니다.
     * @param {Object} payload - 전략에서 전달된 데이터
     */
    update(payload) { // Observer 인터페이스의 update 메서드 구현
        console.log(`[YouTubeLikeTriggerNode] 전략으로부터 'update' 알림 수신, 워크플로우로 전달.`);
        if (this.workflowToExecute) { 
            // AbstractTriggerNode의 triggerCallback을 통해 RunnerFacade에 등록된 콜백 호출
            this.triggerCallback(payload); 
        } else {
            console.log(`[YouTubeLikeTriggerNode] 연결된 워크플로우 없음. 트리거 이벤트: ${JSON.stringify(payload)}`);
        }
    }

    execute(context) { // WorkflowComponent의 execute 메서드 구현
        console.log(`[YouTubeLikeTriggerNode] 노드 실행 지시. 전략에 감지 시작 위임.`);
        // 오류는 없다고 가정하므로 try-catch 제거
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