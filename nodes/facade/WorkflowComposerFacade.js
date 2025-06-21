// src/nodes/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory');
const GmailTriggerStrategy = require('../triggers/Gmail/GmailTriggerStrategy');
const GmailTriggerNode = require('../triggers/Gmail/GmailTriggerNode');
const YouTubeLikeTriggerNode = require('../triggers/YouTube/YouTubeLikeTriggerNode');
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy');

// Registry 임포트
const Registry = require('../../core/Registry');


/**
 * @class WorkflowComposerFacade
 * 복잡한 워크플로우 구성 과정을 단순화하는 퍼사드 클래스.
 * 빌더 패턴과 팩토리 패턴을 사용하여 노드를 생성하고, 컴포지트 패턴을 사용하여 워크플로우를 구성합니다.
 * 'build()' 메서드 호출 후에도 내부 워크플로우 참조를 유지하여 연속적인 구성을 가능하게 합니다.
 */
class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new DefaultSlackNodeFactory();
        this.notionFactory = new DefaultNotionNodeFactory();
        this.currentWorkflow = null; // 현재 작업 중인 워크플로우 인스턴스
    }

    /**
     * 새로운 워크플로우 구성을 시작합니다.
     * @returns {WorkflowComposerFacade} 현재 퍼사드 인스턴스
     */
    startNewWorkflow() {
        this.currentWorkflow = new SequentialWorkflow();
        return this;
    }

    /**
     * Slack 메시지 노드를 현재 워크플로우에 추가합니다.
     * @param {string} channel - 메시지를 보낼 Slack 채널.
     * @param {string} message - 보낼 메시지 내용.
     * @returns {WorkflowComposerFacade} 현재 퍼사드 인스턴스
     */
    addSlackMessageNode(channel, message) {
        // currentWorkflow가 항상 유효하다고 가정
        const slackMessageNode = this.slackFactory.createMessageBuilder()
            .setChannel(channel)
            .setMessage(message)
            .build();
        this.currentWorkflow.add(slackMessageNode);
        return this;
    }

    /**
     * Slack 채널 읽기 노드를 현재 워크플로우에 추가합니다.
     * @param {string} channelId - 읽을 Slack 채널 ID.
     * @returns {WorkflowComposerFacade} 현재 퍼사드 인스턴스
     */
    addSlackReadChannelNode(channelId) {
        // currentWorkflow가 항상 유효하다고 가정
        const slackReadNode = this.slackFactory.createReadChannelBuilder()
            .setChannelId(channelId)
            .build();
        this.currentWorkflow.add(slackReadNode);
        return this;
    }

    /**
     * Notion 페이지 생성 노드를 현재 워크플로우에 추가합니다.
     * @param {string} pageTitle - 생성할 Notion 페이지의 제목.
     * @param {string} content - 페이지 내용 (선택 사항).
     * @returns {WorkflowComposerFacade} 현재 퍼사드 인스턴스
     */
    addNotionPageCreateNode(pageTitle, content = '') {
        // currentWorkflow가 항상 유효하다고 가정
        const notionPageNode = this.notionFactory.createPageCreateBuilder()
            .setTitle(pageTitle)
            .setContent(content)
            .build();
        this.currentWorkflow.add(notionPageNode);
        return this;
    }

    /**
     * YouTube '좋아요' 트리거 노드를 현재 워크플로우에 추가합니다.
     * @param {string} videoId - 이 트리거 노드가 개념적으로 연결될 유튜브 비디오 ID. (노드 식별자)
     * @param {string} implementationType - 사용할 구현체의 타입 ('local' 또는 'cloud').
     * @param {string} notificationType - 알림 방식 ('immediate', 'batch', 'threshold').
     * @param {number} threshold - 'threshold' 방식 사용 시 기준값 (예: 좋아요 변화 수).
     * @returns {WorkflowComposerFacade} 현재 퍼사드 인스턴스
     */
    addYouTubeLikeTriggerNode(videoId, implementationType, notificationType = 'immediate', threshold = 0) {
        // currentWorkflow가 항상 유효하다고 가정
        const implementation = Registry.createImplementation(implementationType);
        const youtubeLikeStrategy = new YouTubeLikeTriggerStrategy(implementation, notificationType, threshold);
        const youtubeTrigger = new YouTubeLikeTriggerNode(videoId, youtubeLikeStrategy);
        this.currentWorkflow.add(youtubeTrigger);
        return this;
    }
    
    addGmailTriggerNode(videoId, implementationType, notificationType = 'immediate', threshold = 0) {
        // currentWorkflow가 항상 유효하다고 가정
        const implementation = Registry.createImplementation(implementationType);
        const GmailStrategy = new GmailTriggerStrategy(implementation, notificationType, threshold);
        const GmailTrigger = new GmailTriggerNode(videoId, GmailStrategy);
        this.currentWorkflow.add(GmailTrigger);
        return this;
    }
    /**
     * 현재 구성 중인 워크플로우를 완성하고 반환합니다.
     * 이 메서드는 퍼사드의 내부 currentWorkflow를 null로 초기화하지 않습니다.
     * @returns {SequentialWorkflow} 구성된 워크플로우 객체
     */
    build() {
        const builtWorkflow = this.currentWorkflow;
        // this.currentWorkflow = null; // 이 줄을 제거하여 연속적인 구성을 가능하게 합니다.
        return builtWorkflow;
    }

    /**
     * 현재 퍼사드가 작업 중인 워크플로우 인스턴스를 반환합니다.
     * (build()가 초기화하지 않으므로, 이 메서드는 필요에 따라 내부 워크플로우 참조를 얻는 데 사용될 수 있습니다.)
     * @returns {SequentialWorkflow | null}
     */
    getCurrentWorkflow() {
        return this.currentWorkflow;
    }
}

module.exports = WorkflowComposerFacade;
