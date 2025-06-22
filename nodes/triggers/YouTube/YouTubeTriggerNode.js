// src/nodes/triggers/youtube/YouTubeLikeTriggerNode.js
const AbstractTriggerNode = require('../AbstractTriggerNode');
const YouTubeLikeTriggerStrategy = require('./YouTubeLikeTriggerStrategy'); 
class YouTubeTriggerNode extends AbstractTriggerNode {
    constructor(videoId, strategy) { 
        super();
        this.videoId = videoId; 
        this.strategy = strategy;
        this.strategy.attach(this);
    }

    update(payload) { // Observer 인터페이스의 update 메서드 구현
        console.log(`[YouTubeLikeTriggerNode] 전략으로부터 'update' 알림 수신 (노드 연결 비디오 ID: ${this.videoId}), 워크플로우로 전달.`);
        this.triggerCallback(payload);
    }

    execute(context) { // WorkflowComponent의 execute 메서드 구현
        console.log(`[YouTubeLikeTriggerNode] 노드 실행 지시 (노드 연결 비디오 ID: ${this.videoId}). (트리거 노드는 감시 준비만 함)`);
        this.strategy.startMonitoring();
    }
    stop() {
        console.log(`[YouTubeLikeTriggerNode] 노드 중지 지시 (노드 연결 비디오 ID: ${this.videoId}). 전략에 감지 중지 위임.`);
        this.strategy.stopMonitoring();
    }
}

module.exports = YouTubeTriggerNode;