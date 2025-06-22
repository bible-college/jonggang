// src/nodes/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory');
const DefaultYoutubeNodeFactory = require('../actions/Youtube_action/DefaultYoutubeNodeFactory')
const GmailTriggerStrategy = require('../triggers/Gmail/GmailTriggerStrategy');
const GmailTriggerNode = require('../triggers/Gmail/GmailTriggerNode');
const YouTubeTriggerNode = require('../triggers/YouTube/YouTubeTriggerNode');
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy');
const Registry = require('../../core/Registry');
const WorkflowExecutionLoggerDecorator = require('../../decorators/WorkflowExecutionLoggerDecorator');
const EventStore = require('../../core/EventStore');

class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new DefaultSlackNodeFactory();
        this.notionFactory = new DefaultNotionNodeFactory();
        this.youtubeFactory = new DefaultYoutubeNodeFactory();
        this.currentWorkflow = null;
        this.eventStore = new EventStore();
    }

    startNewWorkflow() {
        this.currentWorkflow = new SequentialWorkflow();
        return this;
    }

    addSlackMessageNode(channel, message) {
        let slackMessageNode = this.slackFactory.createMessageBuilder()
            .setChannel(channel)
            .setMessage(message)
            .build();
        slackMessageNode = new WorkflowExecutionLoggerDecorator(slackMessageNode, this.eventStore);
        this.currentWorkflow.add(slackMessageNode);
        return slackMessageNode; 
    }

    addSlackReadChannelNode(channelId) {
        let slackReadNode = this.slackFactory.createReadChannelBuilder()
            .setChannelId(channelId)
            .build();
        slackReadNode = new WorkflowExecutionLoggerDecorator(slackReadNode, this.eventStore);
        this.currentWorkflow.add(slackReadNode);
        return slackReadNode; 
    }

    addNotionPageCreateNode(pageTitle, content = '') {
        let notionPageNode = this.notionFactory.createPageCreateBuilder()
            .setTitle(pageTitle)
            .setContent(content)
            .build();
        notionPageNode = new WorkflowExecutionLoggerDecorator(notionPageNode, this.eventStore);
        this.currentWorkflow.add(notionPageNode);
        return notionPageNode; 
    }

    addYouTubeReadRecentLikedVideoNode() {
        let youtubeReadRecentLikedVideoNode = this.youtubeFactory.createYouTubeReadRecentLikedVideoBuilder().build(); // <-- 수정됨!
        youtubeReadRecentLikedVideoNode = new WorkflowExecutionLoggerDecorator(youtubeReadRecentLikedVideoNode, this.eventStore);
        this.currentWorkflow.add(youtubeReadRecentLikedVideoNode);
        return youtubeReadRecentLikedVideoNode;
    }

    addYouTubeLikeTriggerNode(videoId, implementationType) { 
        const implementation = Registry.createImplementation(implementationType);
        const youtubeLikeStrategy = new YouTubeLikeTriggerStrategy(implementation, videoId);
        let youtubeTrigger = new YouTubeTriggerNode(videoId, youtubeLikeStrategy);
        youtubeTrigger = new WorkflowExecutionLoggerDecorator(youtubeTrigger, this.eventStore);
        this.currentWorkflow.add(youtubeTrigger);
        return youtubeTrigger;
    }

    addGmailTriggerNode(accountId, implementationType) { 
        const implementation = Registry.createImplementation(implementationType);
        const gmailStrategy = new GmailTriggerStrategy(implementation, accountId);
        let gmailTrigger = new GmailTriggerNode(accountId, gmailStrategy);
        gmailTrigger = new WorkflowExecutionLoggerDecorator(gmailTrigger, this.eventStore);
        this.currentWorkflow.add(gmailTrigger);
        return gmailTrigger;
    }

    removeNode(nodeToRemove) {
        if (!this.currentWorkflow) {
            console.warn("[WorkflowComposerFacade] 현재 구성 중인 워크플로우가 없습니다. 노드를 제거할 수 없습니다.");
            return this;
        }
        this.currentWorkflow.remove(nodeToRemove);
        return this; 
    }

    build() {
        const builtWorkflow = this.currentWorkflow;
        return builtWorkflow;
    }

    getCurrentWorkflow() {
        return this.currentWorkflow;
    }

    getEventStore() {
        return this.eventStore;
    }
}

module.exports = WorkflowComposerFacade;