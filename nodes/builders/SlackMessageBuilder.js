// src/nodes/builders/slack/SlackMessageNodeBuilder.js (수정)
const SlackMessageNode = require('../../actions/slack/SlackMessageNode');
// const { v4: uuidv4 } = require('uuid'); // uuid 라이브러리 제거

class SlackMessageNodeBuilder {
    constructor() {
        // this.id = uuidv4(); // id 속성 제거
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
        return new SlackMessageNode(this.channel, this.message);
    }
}

module.exports = SlackMessageNodeBuilder;