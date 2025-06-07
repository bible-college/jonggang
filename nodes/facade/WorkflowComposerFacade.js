// src/facade/WorkflowComposerFacade.js

// 필요한 각 클래스를 개별적으로 명시적 경로로 require 합니다.
const SequentialWorkflow = require('../nodes/composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../nodes/factories/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../nodes/factories/DefaultNotionNodeFactory');

// 트리거 노드들을 직접 require 합니다.
const TimeTriggerNode = require('../nodes/triggers/TimeTriggerNode');
const FileTriggerNode = require('../nodes/triggers/FileTriggerNode');

const { v4: uuidv4 } = require('uuid'); // ID 생성을 위해 uuid 라이브러리 임포트


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

    startNewWorkflow(name = '새로운 워크플로우', description = '자동화 워크플로우.') {
        this.currentWorkflow = new SequentialWorkflow(uuidv4(), name, description);
        return this;
    }

    // --- 액션 노드 추가 메서드 ---
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
    addTimeTriggerNode(id, intervalMs = 5000) {
        const timeTrigger = new TimeTriggerNode(id, undefined, undefined, intervalMs);
        this.currentWorkflow.add(timeTrigger);
        return this;
    }

    addFileTriggerNode(id, filePath, eventType = 'change') {
        const fileTrigger = new FileTriggerNode(id, undefined, undefined, filePath, eventType);
        this.currentWorkflow.add(fileTrigger);
        return this;
    }
    // --- 트리거 노드 추가 메서드 끝 ---

    build() {
        const builtWorkflow = this.currentWorkflow;
        this.currentWorkflow = null; // 빌드 후 워크플로우 초기화 (새로운 워크플로우 생성을 위함)
        return builtWorkflow;
    }
}

module.exports = WorkflowComposerFacade;