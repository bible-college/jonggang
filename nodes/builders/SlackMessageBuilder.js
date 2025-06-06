// src/nodes/builders/SlackMessageBuilder.js
const SlackMessageNode = require('../actions/slack/SlackMessageNode');

/**
 * @class SlackMessageBuilder
 * Slack 메시지 노드(SlackMessageNode)를 단계적으로 구성하는 빌더 클래스.
 * 빌더 패턴의 Concrete Builder 역할을 합니다.
 */
class SlackMessageBuilder {
    constructor() {
        this.channel = null;
        this.message = null;
        // 필요에 따라 다른 Slack 메시지 옵션 (blocks, attachments 등) 추가 가능
    }

    setChannel(channel) {
        this.channel = channel;
        return this; // 메서드 체이닝을 위해 `this` 반환
    }

    setMessage(message) {
        this.message = message;
        return this; // 메서드 체이닝을 위해 `this` 반환
    }

    /**
     * 설정된 옵션으로 SlackMessageNode 인스턴스를 생성하여 반환합니다.
     * @returns {SlackMessageNode}
     */
    build() {
        if (!this.channel || !this.message) {
            console.warn("[SlackMessageBuilder] 경고: 채널 또는 메시지가 설정되지 않았습니다. 기본값으로 노드를 생성합니다.");
        }
        return new SlackMessageNode(this.channel, this.message);
    }
}

module.exports = SlackMessageBuilder;