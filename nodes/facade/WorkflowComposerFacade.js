// src/facade/WorkflowComposerFacade.js
const { factories, composites, triggers } = require('../nodes'); // 'triggers' 모듈 추가

/**
 * @class WorkflowComposerFacade
 * 워크플로우를 정의하고 구성(조립)하는 과정을 단순화하는 퍼사드 클래스.
 * 노드 타입별 개별 메서드를 통해 클라이언트에게 간결한 인터페이스를 제공합니다.
 */
class WorkflowComposerFacade {
    constructor() {
        this.slackFactory = new factories.DefaultSlackNodeFactory();
        this.notionFactory = new factories.DefaultNotionNodeFactory();
        this.currentWorkflow = null;
    }

    startNewWorkflow() {
        console.log("\n[ComposerFacade] 새로운 워크플로우 구성 시작...");
        this.currentWorkflow = new composites.SequentialWorkflow();
        return this;
    }

    // --- 액션 노드 추가 메서드 (이전과 동일) ---
    addSlackMessageNode(channel, message) {
        if (!this.currentWorkflow) {
            throw new Error("[ComposerFacade] 워크플로우를 시작하지 않았습니다. startNewWorkflow()를 먼저 호출하세요.");
        }
        console.log(`[ComposerFacade] Slack 메시지 노드 추가: 채널 '${channel}', 메시지 '${message}'`);
        const slackMessageNode = this.slackFactory.createMessageBuilder()
            .setChannel(channel)
            .setMessage(message)
            .build();
        this.currentWorkflow.add(slackMessageNode);
        return this;
    }

    addSlackReadChannelNode(channelId) {
        if (!this.currentWorkflow) {
            throw new Error("[ComposerFacade] 워크플로우를 시작하지 않았습니다. startNewWorkflow()를 먼저 호출하세요.");
        }
        console.log(`[ComposerFacade] Slack 채널 읽기 노드 추가: 채널 ID '${channelId}'`);
        const slackReadNode = this.slackFactory.createReadChannelBuilder()
            .setChannelId(channelId)
            .build();
        this.currentWorkflow.add(slackReadNode);
        return this;
    }

    addNotionPageCreateNode(pageTitle, content = '') {
        if (!this.currentWorkflow) {
            throw new Error("[ComposerFacade] 워크플로우를 시작하지 않았습니다. startNewWorkflow()를 먼저 호출하세요.");
        }
        console.log(`[ComposerFacade] Notion 페이지 생성 노드 추가: 제목 '${pageTitle}'`);
        const notionPageNode = this.notionFactory.createPageCreateBuilder()
            .setTitle(pageTitle)
            .setContent(content)
            .build();
        this.currentWorkflow.add(notionPageNode);
        return this;
    }
    // --- 액션 노드 추가 메서드 끝 ---

    // --- 트리거 노드 추가 메서드 (새로 추가) ---
    addTimeTriggerNode(id, intervalMs = 5000) {
        if (!this.currentWorkflow) {
            throw new Error("[ComposerFacade] 워크플로우를 시작하지 않았습니다. startNewWorkflow()를 먼저 호출하세요.");
        }
        console.log(`[ComposerFacade] 시간 트리거 노드 추가: ID '${id}', 간격 ${intervalMs / 1000}초`);
        const timeTrigger = new triggers.TimeTriggerNode(id, undefined, undefined, intervalMs);
        this.currentWorkflow.add(timeTrigger); // 워크플로우 컴포넌트로 추가
        return this;
    }

    addFileTriggerNode(id, filePath, eventType = 'change') {
        if (!this.currentWorkflow) {
            throw new Error("[ComposerFacade] 워크플로우를 시작하지 않았습니다. startNewWorkflow()를 먼저 호출하세요.");
        }
        console.log(`[ComposerFacade] 파일 트리거 노드 추가: ID '${id}', 경로 '${filePath}', 이벤트 '${eventType}'`);
        const fileTrigger = new triggers.FileTriggerNode(id, undefined, undefined, filePath, eventType);
        this.currentWorkflow.add(fileTrigger); // 워크플로우 컴포넌트로 추가
        return this;
    }
    // --- 트리거 노드 추가 메서드 끝 ---

    build() {
        if (!this.currentWorkflow) {
            throw new Error("[ComposerFacade] 구성할 워크플로우가 없습니다. startNewWorkflow()를 먼저 호출하세요.");
        }
        console.log("[ComposerFacade] 워크플로우 구성 완료. 워크플로우 객체 반환.");
        const builtWorkflow = this.currentWorkflow;
        this.currentWorkflow = null; // 빌드 후 워크플로우 초기화 (새로운 워크플로우 생성을 위함)
        return builtWorkflow;
    }
}

module.exports = WorkflowComposerFacade;