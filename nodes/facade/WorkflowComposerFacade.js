// src/nodes/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultYoutubeNodeFactory = require('../actions/Youtube_action/DefaultYoutubeNodeFactory')
const GmailTriggerStrategy = require('../triggers/Gmail/GmailTriggerStrategy');
const TriggerNode = require('../triggers/TriggerNode');
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy');
const Registry = require('../../core/Registry');
const WorkflowExecutionLoggerDecorator = require('../../decorators/WorkflowExecutionLoggerDecorator');
const EventStore = require('../../core/EventStore');

class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new DefaultSlackNodeFactory();
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

    addYouTubeReadRecentLikedVideoNode() {
        let youtubeReadRecentLikedVideoNode = this.youtubeFactory.createYouTubeReadRecentLikedVideoBuilder().build(); // <-- 수정됨!
        youtubeReadRecentLikedVideoNode = new WorkflowExecutionLoggerDecorator(youtubeReadRecentLikedVideoNode, this.eventStore);
        this.currentWorkflow.add(youtubeReadRecentLikedVideoNode);
        return youtubeReadRecentLikedVideoNode;
    }

    addYouTubeLikeTriggerNode(videoId, implementationType) { 
        const implementation = Registry.createImplementation(implementationType); 
        const youtubeLikeStrategy = new YouTubeLikeTriggerStrategy(implementation, videoId); 
        let youtubeTrigger = new TriggerNode(videoId, youtubeLikeStrategy); 
        youtubeTrigger = new WorkflowExecutionLoggerDecorator(youtubeTrigger, this.eventStore); 
        this.currentWorkflow.add(youtubeTrigger); 
        return youtubeTrigger;
    }

    addGmailTriggerNode(accountId, implementationType) { 
        const implementation = Registry.createImplementation(implementationType); 
        const gmailStrategy = new GmailTriggerStrategy(implementation, accountId); 
        let gmailTrigger = new TriggerNode(accountId, gmailStrategy); 
        gmailTrigger = new WorkflowExecutionLoggerDecorator(gmailTrigger, this.eventStore); 
        this.currentWorkflow.add(gmailTrigger); 
        return gmailTrigger;
    }

    removeNode(nodeToRemove) {
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