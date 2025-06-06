// src/nodes/builders/SlackReadChannelBuilder.js
const SlackReadChannelNode = require('../actions/slack/SlackReadChannelNode');

/**
 * @class SlackReadChannelBuilder
 * Slack 채널 읽기 노드(SlackReadChannelNode)를 단계적으로 구성하는 빌더 클래스.
 */
class SlackReadChannelBuilder {
    constructor() {
        this.channelId = null;
    }

    setChannelId(id) {
        this.channelId = id;
        return this;
    }

    build() {
        if (!this.channelId) {
            throw new Error("[SlackReadChannelBuilder] 채널 ID는 필수입니다.");
        }
        return new SlackReadChannelNode(this.channelId);
    }
}

module.exports = SlackReadChannelBuilder;