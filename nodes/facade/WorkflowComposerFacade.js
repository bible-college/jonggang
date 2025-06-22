// src/nodes/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require('../composites/SequentialWorkflow');
const DefaultSlackNodeFactory = require('../actions/slack/DefaultSlackNodeFactory');
const DefaultNotionNodeFactory = require('../actions/notion/DefaultNotionNodeFactory');
const GmailTriggerStrategy = require('../triggers/Gmail/GmailTriggerStrategy');
const GmailTriggerNode = require('../triggers/Gmail/GmailTriggerNode');
const YouTubeLikeTriggerNode = require('../triggers/YouTube/YouTubeLikeTriggerNode');
const YouTubeLikeTriggerStrategy = require('../triggers/YouTube/YouTubeLikeTriggerStrategy');
const Registry = require('../../core/Registry');
const WorkflowExecutionLoggerDecorator = require('../../decorators/WorkflowExecutionLoggerDecorator');
const EventStore = require('../../core/EventStore');


/**
 * @class WorkflowComposerFacade
 * 복잡한 워크플로우 구성 과정을 단순화하는 퍼사드 클래스.
 * 빌더 패턴과 팩토리 패턴을 사용하여 노드를 생성하고, 컴포지트 패턴을 사용하여 워크플로우를 구성합니다.
 * 'build()' 메서드 호출 후에도 내부 워크플로우 참조를 유지하여 연속적인 구성을 가능하게 합니다.
 * 이제 생성되는 노드에 데코레이터가 적용됩니다.
 */
class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new DefaultSlackNodeFactory();
        this.notionFactory = new DefaultNotionNodeFactory();
        this.currentWorkflow = null;
        this.eventStore = new EventStore();
    }

    startNewWorkflow() {
        this.currentWorkflow = new SequentialWorkflow();
        return this;
    }

    /**
     * Slack 메시지 노드를 추가하고 추가된 노드 인스턴스를 반환합니다.
     * @param {string} channel - Slack 채널
     * @param {string} message - 전송할 메시지
     * @returns {WorkflowComponent} 추가된 SlackMessageNode 인스턴스
     */
    addSlackMessageNode(channel, message) {
        let slackMessageNode = this.slackFactory.createMessageBuilder()
            .setChannel(channel)
            .setMessage(message)
            .build();
        slackMessageNode = new WorkflowExecutionLoggerDecorator(slackMessageNode, this.eventStore);
        this.currentWorkflow.add(slackMessageNode);
        return slackMessageNode; // 추가된 노드를 직접 반환
    }

    /**
     * Slack 채널 읽기 노드를 추가하고 추가된 노드 인스턴스를 반환합니다.
     * @param {string} channelId - 읽을 Slack 채널 ID
     * @returns {WorkflowComponent} 추가된 SlackReadChannelNode 인스턴스
     */
    addSlackReadChannelNode(channelId) {
        let slackReadNode = this.slackFactory.createReadChannelBuilder()
            .setChannelId(channelId)
            .build();
        slackReadNode = new WorkflowExecutionLoggerDecorator(slackReadNode, this.eventStore);
        this.currentWorkflow.add(slackReadNode);
        return slackReadNode; // 추가된 노드를 직접 반환
    }

    /**
     * Notion 페이지 생성 노드를 추가하고 추가된 노드 인스턴스를 반환합니다.
     * @param {string} pageTitle - Notion 페이지 제목
     * @param {string} content - Notion 페이지 내용
     * @returns {WorkflowComponent} 추가된 NotionPageCreateNode 인스턴스
     */
    addNotionPageCreateNode(pageTitle, content = '') {
        let notionPageNode = this.notionFactory.createPageCreateBuilder()
            .setTitle(pageTitle)
            .setContent(content)
            .build();
        notionPageNode = new WorkflowExecutionLoggerDecorator(notionPageNode, this.eventStore);
        this.currentWorkflow.add(notionPageNode);
        return notionPageNode; // 추가된 노드를 직접 반환
    }

    // --- 추가 시작: YouTubeReadRecentLikedVideoNode를 추가하는 메서드 ---
    /**
     * YouTube 트리거에서 받은 '최신 좋아요' 정보를 기반으로
     * 해당 영상의 상세 정보를 읽어오는 노드를 추가합니다.
     * @returns {WorkflowComponent} 추가된 YouTubeReadRecentLikedVideoNode 인스턴스
     */
    // YouTubeReadRecentLikedVideoNode를 추가하는 메서드 (이제 this.slackFactory 사용)
    addYouTubeReadRecentLikedVideoNode() {
        let youtubeReadRecentLikedVideoNode = this.slackFactory.createReadRecentLikedVideoBuilder().build(); // <-- 수정됨!
        youtubeReadRecentLikedVideoNode = new WorkflowExecutionLoggerDecorator(youtubeReadRecentLikedVideoNode, this.eventStore);
        this.currentWorkflow.add(youtubeReadRecentLikedVideoNode);
        return youtubeReadRecentLikedVideoNode;
    }
    // --- 추가 끝 ---

    /**
     * YouTube 좋아요 트리거 노드를 추가하고 추가된 노드 인스턴스를 반환합니다.
     * @param {string} videoId - 감지할 YouTube 비디오 ID
     * @param {string} implementationType - 사용할 구현체 타입 ('localYouTube', 'cloud' 등)
     * @param {string} notificationType - 알림 방식 ('immediate', 'batch', 'threshold')
     * @param {number} threshold - 임계치 (threshold 방식 사용 시)
     * @returns {WorkflowComponent} 추가된 YouTubeLikeTriggerNode 인스턴스
     */
    addYouTubeLikeTriggerNode(videoId, implementationType, notificationType = 'immediate', threshold = 0) {
        const implementation = Registry.createImplementation(implementationType);
        const youtubeLikeStrategy = new YouTubeLikeTriggerStrategy(implementation, videoId, notificationType, threshold);
        let youtubeTrigger = new YouTubeLikeTriggerNode(videoId, youtubeLikeStrategy);
        youtubeTrigger = new WorkflowExecutionLoggerDecorator(youtubeTrigger, this.eventStore);
        this.currentWorkflow.add(youtubeTrigger);
        return youtubeTrigger; // 추가된 노드를 직접 반환
    }

    /**
     * Gmail 트리거 노드를 추가하고 추가된 노드 인스턴스를 반환합니다.
     * @param {string} accountId - 감지할 Gmail 계정 ID
     * @param {string} implementationType - 사용할 구현체 타입 ('localGmail', 'cloud' 등)
     * @param {string} notificationType - 알림 방식 ('immediate', 'batch', 'threshold')
     * @param {number} threshold - 임계치 (threshold 방식 사용 시)
     * @returns {WorkflowComponent} 추가된 GmailTriggerNode 인스턴스
     */
    addGmailTriggerNode(accountId, implementationType, notificationType = 'immediate', threshold = 0) {
        const implementation = Registry.createImplementation(implementationType);
        const gmailStrategy = new GmailTriggerStrategy(implementation, accountId, notificationType, threshold);
        let gmailTrigger = new GmailTriggerNode(accountId, gmailStrategy);
        gmailTrigger = new WorkflowExecutionLoggerDecorator(gmailTrigger, this.eventStore);
        this.currentWorkflow.add(gmailTrigger);
        return gmailTrigger; // 추가된 노드를 직접 반환
    }

    /**
     * 현재 워크플로우에서 특정 노드를 제거합니다.
     * 이 메서드는 제거할 노드의 객체 참조를 알아야 합니다.
     * @param {WorkflowComponent} nodeToRemove - 제거할 노드의 객체 참조
     * @returns {WorkflowComposerFacade} 현재 퍼사드 인스턴스 (메서드 체이닝을 위해)
     */
    removeNode(nodeToRemove) {
        if (!this.currentWorkflow) {
            console.warn("[WorkflowComposerFacade] 현재 구성 중인 워크플로우가 없습니다. 노드를 제거할 수 없습니다.");
            return this;
        }
        this.currentWorkflow.remove(nodeToRemove);
        return this; // 메서드 체이닝을 위해 퍼사드 인스턴스 반환
    }

    build() {
        const builtWorkflow = this.currentWorkflow;
        // build 후에도 currentWorkflow 참조를 유지하므로 null로 초기화하지 않습니다.
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