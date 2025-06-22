
const SlackMessageNode = require('../../actions/slack/SlackMessageNode');

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
        return new SlackMessageNode(this.channel, this.message);
    }
}

module.exports = SlackMessageNodeBuilder;