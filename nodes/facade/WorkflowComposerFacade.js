// src/facade/WorkflowComposerFacade.js (수정)

const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory');
const TimeTriggerNode = require('../triggers/TimeTriggerNode');
const FileTriggerNode = require('../triggers/FileTriggerNode');

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
        this.currentWorkflow = new SequentialWorkflow(); // 인자 없이 생성
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

    addTimeTriggerNode(intervalMs = 5000) { // id 제거
        const timeTrigger = new TimeTriggerNode(intervalMs); // id 없이 생성
        this.currentWorkflow.add(timeTrigger);
        return this;
    }

    addFileTriggerNode(filePath, eventType = 'change') { // id 제거
        const fileTrigger = new FileTriggerNode(filePath, eventType); // id 없이 생성
        this.currentWorkflow.add(fileTrigger);
        return this;
    }

    build() {
        const builtWorkflow = this.currentWorkflow;
        this.currentWorkflow = null;
        return builtWorkflow;
    }
}

module.exports = WorkflowComposerFacade;