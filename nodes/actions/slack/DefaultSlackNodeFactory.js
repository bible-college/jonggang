
const AbstractNodeFactory = require('../../../core/AbstractNodeFactory'); // AbstractNodeFactory를 require
const SlackMessageBuilder = require('./SlackMessageBuilder');
const SlackReadChannelBuilder = require('./SlackReadChannelBuilder');

class DefaultSlackNodeFactory extends AbstractNodeFactory { 
    constructor() {
        super('Slack'); // 서비스 이름 전달
    }

    createMessageBuilder() {
        return new SlackMessageBuilder();
    }

    createReadChannelBuilder() {
        return new SlackReadChannelBuilder();
    }
}

module.exports = DefaultSlackNodeFactory;