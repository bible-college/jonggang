
const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory');
const YouTubeLikeTriggerNode = require('../triggers/YouTube/YouTubeLikeTriggerNode');
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy');

const Registry = require('../../core/Registry');

// 새로 추가: LoggingWorkflowComponentDecorator 불러오기
const LoggingWorkflowComponentDecorator = require('../decorators/LoggingWorkflowComponentDecorator');

class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new DefaultSlackNodeFactory();
        this.notionFactory = new DefaultNotionNodeFactory();
        this.currentWorkflow = null;
        // 노드 ID 생성을 위한 간단한 카운터 (실제는 UUID 등 사용)
        this.nextNodeId = 1; 
    }

    // 노드 ID를 생성하는 헬퍼 메서드
    generateNodeId() {
        return `node-${this.nextNodeId++}`;
    }

    startNewWorkflow() {
        this.currentWorkflow = new SequentialWorkflow();
        return this;
    }

    // 노드 생성 후 데코레이터로 감싸는 로직 추가
    addSlackMessageNode(channel, message) {
        const nodeId = this.generateNodeId(); // 고유 ID 생성
        const slackMessageNode = this.slackFactory.createMessageBuilder()
            .setChannel(channel)
            .setMessage(message)
            .build();
        // 새로 추가: 노드 생성 후 LoggingWorkflowComponentDecorator로 감싸기
        const decoratedNode = new LoggingWorkflowComponentDecorator(slackMessageNode);
        this.currentWorkflow.add(decoratedNode); // 감싸진 노드를 워크플로우에 추가
        return this;
    }

    addSlackReadChannelNode(channelId) {
        const nodeId = this.generateNodeId(); // 고유 ID 생성
        const slackReadNode = this.slackFactory.createReadChannelBuilder()
            .setChannelId(channelId)
            .build();
        // 새로 추가: 노드 생성 후 LoggingWorkflowComponentDecorator로 감싸기
        const decoratedNode = new LoggingWorkflowComponentDecorator(slackReadNode);
        this.currentWorkflow.add(decoratedNode); // 감싸진 노드를 워크플로우에 추가
        return this;
    }

    addNotionPageCreateNode(pageTitle, content = '') {
        const nodeId = this.generateNodeId(); // 고유 ID 생성
        const notionPageNode = this.notionFactory.createPageCreateBuilder()
            .setTitle(pageTitle)
            .setContent(content)
            .build();
        // 새로 추가: 노드 생성 후 LoggingWorkflowComponentDecorator로 감싸기
        const decoratedNode = new LoggingWorkflowComponentDecorator(notionPageNode);
        this.currentWorkflow.add(decoratedNode); // 감싸진 노드를 워크플로우에 추가
        return this;
    }

    addYouTubeLikeTriggerNode(videoId, implementationType, notificationType = 'immediate', threshold = 0) {
        const implementation = Registry.createImplementation(implementationType);
        const youtubeLikeStrategy = new YouTubeLikeTriggerStrategy(implementation, notificationType, threshold);
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