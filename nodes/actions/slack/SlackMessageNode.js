// src/nodes/actions/slack/SlackMessageNode.js

const WorkflowComponent = require('../../../core/WorkflowComponent'); // WorkflowComponent 경로 수정

class SlackMessageNode extends WorkflowComponent {
    constructor(channel, message) {
        super(); // 부모 생성자 호출 (인자 없음)
        this.channel = channel;
        this.message = message;
    }

    execute() {
        // 유효성 검사 로직을 제거하여 순수하게 메시지 전송(시뮬레이션) 기능만 남깁니다.
        console.log(`[SlackMessageNode] 실행: 채널 '${this.channel}'에 메시지 "${this.message}" 전송 시도.`);
        // 실제 Slack API 호출 로직은 없음.
        console.log(`[SlackMessageNode] (설계 모드) 메시지 전송 완료 '추정'.`);
        return true; // 항상 성공으로 가정
    }
}

module.exports = SlackMessageNode;