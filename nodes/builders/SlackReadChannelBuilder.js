// src/nodes/builders/slack/SlackReadChannelNodeBuilder.js

const SlackReadChannelNode = require('../../actions/slack/SlackReadChannelNode');

class SlackReadChannelNodeBuilder {
    constructor() {
        this.channelId = '';
    }

    setChannelId(channelId) {
        this.channelId = channelId;
        return this;
    }

    build() {
        const node = new SlackReadChannelNode(this.channelId);
        return node;
    }
}

module.exports = SlackReadChannelNodeBuilder;