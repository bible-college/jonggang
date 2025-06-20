// src/nodes/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory');
const YouTubeLikeTriggerNode = require('../triggers/YouTube/YouTubeLikeTriggerNode');
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy');

// ITriggerImplementation 구현체들을 이곳으로 임포트합니다.
const YouTubeLikeTriggerImplementation = require('../triggers/YouTube/YouTubeLikeTriggerImplementation');
const LocalYouTubePollingImplementation = require('../triggers/YouTube/LocalYouTubePollingImplementation');
const CloudYouTubeWebhookImplementation = require('../triggers/YouTube/CloudYouTubeWebhookImplementation');


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
     * @param {string} videoId - 이 트리거 노드가 개념적으로 연결될 유튜브 비디오 ID.
     * @param {string} implementationType - 사용할 구현체의 타입 ('local' 또는 'cloud').
     * @throws {Error} 지원하지 않는 구현체 타입인 경우.
     */
    addYouTubeLikeTriggerNode(videoId, implementationType, notificationType = 'immediate', threshold = 0) {
        let implementation;
        let strategy;

        // 1. 구현체 (Implementation) 선택 및 생성 (Bridge 패턴의 구현체 계층)
        switch (implementationType) {
            case 'local':
                implementation = new LocalYouTubePollingImplementation();
                break;
            case 'cloud':
                implementation = new CloudYouTubeWebhookImplementation();
                break;
            default:
                throw new Error(`지원하지 않는 구현체 타입: '${implementationType}'. 'local' 또는 'cloud' 중 하나여야 합니다.`);
        }

        // 2. 전략 (Strategy) 선택 및 생성 (Strategy 패턴의 구체적 전략)
        strategy = new YouTubeLikeTriggerStrategy(implementation, notificationType, threshold);
        // Context(YouTubeLikeTriggerNode)에 전략 객체를 전달
        const youtubeTrigger = new YouTubeLikeTriggerNode(videoId, strategy);
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