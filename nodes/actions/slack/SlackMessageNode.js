// src/nodes/actions/slack/SlackMessageNode.js
const WorkflowComponent = require('../../../core/WorkflowComponent');

/**
 * @class SlackMessageNode
 * Slack 메시지를 보내는 액션 노드 (리프 노드).
 * 컴포지트 패턴의 Leaf 역할을 하며, 커맨드 패턴의 Concrete Command 역할을 합니다.
 */
class SlackMessageNode extends WorkflowComponent {
    constructor(channel, message) {
        super();
        this.channel = channel;
        this.message = message;
    }

    /**
     * Slack 메시지 전송 작업을 실행합니다.
     * @returns {boolean} 작업 성공 여부
     */
    execute() {
        console.log(`[SlackMessageNode] 실행: 채널 '${this.channel}'에 메시지 "${this.message}" 전송.`);
        // 실제 Slack API 호출 로직 (예: axios.post('https://slack.com/api/chat.postMessage', ...))
        // 여기서는 시뮬레이션만 합니다.
        if (!this.channel || !this.message) {
            console.error("[SlackMessageNode] 오류: 채널 또는 메시지가 유효하지 않습니다.");
            return false;
        }
        return true; // 성공 가정
    }
}

module.exports = SlackMessageNode;