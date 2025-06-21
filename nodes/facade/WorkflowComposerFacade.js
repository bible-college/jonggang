// src/nodes/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require('../composites/SequentialWorkflow'); //
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory'); //
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory'); //
const YouTubeLikeTriggerNode = require('../triggers/YouTube/YouTubeLikeTriggerNode'); //
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy'); //
const Registry = require('../../core/Registry'); // Registry 임포트

const WorkflowExecutionLoggerDecorator = require('../../decorators/WorkflowExecutionLoggerDecorator'); 
const EventStore = require('../../core/EventStore'); // EventStore 임포트

/**
 * @class WorkflowComposerFacade
 * 복잡한 워크플로우 구성 과정을 단순화하는 퍼사드 클래스.
 * 빌더 패턴과 팩토리 패턴을 사용하여 노드를 생성하고, 컴포지트 패턴을 사용하여 워크플로우를 구성합니다.
 * 'build()' 메서드 호출 후에도 내부 워크플로우 참조를 유지하여 연속적인 구성을 가능하게 합니다.
 * 이제 생성되는 노드에 데코레이터가 적용됩니다.
 */
class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new DefaultSlackNodeFactory(); //
        this.notionFactory = new DefaultNotionNodeFactory(); //
        this.currentWorkflow = null;
        this.eventStore = new EventStore(); // EventStore 인스턴스 생성
    }

    startNewWorkflow() {
        this.currentWorkflow = new SequentialWorkflow(); //
        return this;
    }

    addSlackMessageNode(channel, message) {
        let slackMessageNode = this.slackFactory.createMessageBuilder()
            .setChannel(channel)
            .setMessage(message)
            .build();
        // 생성된 노드를 데코레이터로 감쌉니다.
        slackMessageNode = new WorkflowExecutionLoggerDecorator(slackMessageNode, this.eventStore); // eventStore 전달
        this.currentWorkflow.add(slackMessageNode);
        return this;
    }

    addSlackReadChannelNode(channelId) {
        let slackReadNode = this.slackFactory.createReadChannelBuilder()
            .setChannelId(channelId)
            .build();
        // 생성된 노드를 데코레이터로 감쌉니다.
        slackReadNode = new WorkflowExecutionLoggerDecorator(slackReadNode, this.eventStore); // eventStore 전달
        this.currentWorkflow.add(slackReadNode);
        return this;
    }

    addNotionPageCreateNode(pageTitle, content = '') {
        let notionPageNode = this.notionFactory.createPageCreateBuilder()
            .setTitle(pageTitle)
            .setContent(content)
            .build();
        // 생성된 노드를 데코레이터로 감쌉니다.
        notionPageNode = new WorkflowExecutionLoggerDecorator(notionPageNode, this.eventStore); // eventStore 전달
        this.currentWorkflow.add(notionPageNode);
        return this;
    }

    addYouTubeLikeTriggerNode(videoId, implementationType, notificationType = 'immediate', threshold = 0) {
        const implementation = Registry.createImplementation(implementationType); //
        const youtubeLikeStrategy = new YouTubeLikeTriggerStrategy(implementation, notificationType, threshold); //
        let youtubeTrigger = new YouTubeLikeTriggerNode(videoId, youtubeLikeStrategy); //
        // 생성된 노드를 데코레이터로 감쌉니다.
        youtubeTrigger = new WorkflowExecutionLoggerDecorator(youtubeTrigger, this.eventStore); // eventStore 전달
        this.currentWorkflow.add(youtubeTrigger);
        return this;
    }

    build() {
        const builtWorkflow = this.currentWorkflow;
        return builtWorkflow;
    }

    getCurrentWorkflow() {
        return this.currentWorkflow;
    }

    // EventStore 인스턴스에 접근할 수 있는 getter 추가
    getEventStore() {
        return this.eventStore;
    }
}

module.exports = WorkflowComposerFacade;