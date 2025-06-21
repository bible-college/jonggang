
const AbstractNodeFactory = require('../../../core/AbstractNodeFactory'); 
const SlackMessageBuilder = require('./SlackMessageBuilder');
const SlackReadChannelBuilder = require('./SlackReadChannelBuilder');

class DefaultSlackNodeFactory extends AbstractNodeFactory { 
    constructor() {
        super('Slack'); 
    }

    createMessageBuilder() {
        return new SlackMessageBuilder();
    }

    createReadChannelBuilder() {
        return new SlackReadChannelBuilder();
    }
}

module.exports = DefaultSlackNodeFactory;