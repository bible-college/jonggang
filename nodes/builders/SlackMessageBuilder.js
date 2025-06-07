// src/nodes/builders/slack/SlackMessageNodeBuilder.js
const SlackMessageNode = require('../../actions/slack/SlackMessageNode');
// const { v4: uuidv4 } = require('uuid'); // UUID 라이브러리 제거 (여기서는 필요 없음)

class SlackMessageNodeBuilder {
    constructor() {
        this.channel = '';
        this.message = '';
    }

    setChannel(channel) {
        this.channel = channel;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    build() {
        // SlackMessageNode의 constructor가 channel, message만 받도록 변경되었으므로,
        // 이들을 함께 전달합니다.
        const node = new SlackMessageNode(this.channel, this.message);
        return node;
    }
}

module.exports = SlackMessageNodeBuilder;