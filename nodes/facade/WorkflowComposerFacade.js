// src/nodes/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory');
const YouTubeLikeTriggerNode = require('../triggers/YouTube/YouTubeLikeTriggerNode');
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy');

// Registry 임포트
const Registry = require('../../core/Registry');


/**
 * @class WorkflowComposerFacade
 * 복잡한 워크플로우 구성 과정을 단순화하는 퍼사드 클래스.
 * 빌더 패턴과 팩토리 패턴을 사용하여 노드를 생성하고, 컴포지트 패턴을 사용하여 워크플로우를 구성합니다.
 */
class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new DefaultSlackNodeFactory();
        this.notionFactory = new DefaultNotionNodeFactory();
        this.currentWorkflow = null;
    }
    startNewWorkflow() {
        this.currentWorkflow = new SequentialWorkflow();
        return this;
    }

    addSlackMessageNode(channel, message) {
        const slackMessageNode = this.slackFactory.createMessageBuilder()
            .setChannel(channel)
            .setMessage(message)
            .build();
        this.currentWorkflow.add(slackMessageNode);
        return this;
    }

    addSlackReadChannelNode(channelId) {
        const slackReadNode = this.slackFactory.createReadChannelBuilder()
            .setChannelId(channelId)
            .build();
        this.currentWorkflow.add(slackReadNode);
        return this;
    }

    addNotionPageCreateNode(pageTitle, content = '') {
        const notionPageNode = this.notionFactory.createPageCreateBuilder()
            .setTitle(pageTitle)
            .setContent(content)
            .build();
        this.currentWorkflow.add(notionPageNode);
        return this;
    }

    /**
     * YouTubeLikeTriggerNode를 워크플로우에 추가합니다.
     * @param {string} videoId - 이 트리거 노드가 개념적으로 연결될 유튜브 비디오 ID. (노드 식별자)
     * @param {string} implementationType - 사용할 구현체의 타입 ('local' 또는 'cloud').
     * @param {string} notificationType - 알림 방식 ('immediate', 'batch', 'threshold').
     * @param {number} threshold - 'threshold' 방식 사용 시 기준값 (예: 좋아요 변화 수).
     * @throws {Error} 지원하지 않는 구현체 타입인 경우.
     */
    addYouTubeLikeTriggerNode(videoId, implementationType, notificationType = 'immediate', threshold = 0) {
        // Registry를 사용하여 구현체 인스턴스를 생성합니다.
        const implementation = Registry.createImplementation(implementationType);

        // 전략 패턴: 구현체를 사용하는 전략을 생성
        const youtubeLikeStrategy = new YouTubeLikeTriggerStrategy(implementation, notificationType, threshold);
        // Context(YouTubeLikeTriggerNode)에 전략 객체를 전달
        const youtubeTrigger = new YouTubeLikeTriggerNode(videoId, youtubeLikeStrategy);
        this.currentWorkflow.add(youtubeTrigger);
        return this;
    }

    build() {
        const builtWorkflow = this.currentWorkflow;
        this.currentWorkflow = null;
        return builtWorkflow;
    }
}

module.exports = WorkflowComposerFacade;