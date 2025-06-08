// src/nodes/factories/DefaultSlackNodeFactory.js
const AbstractNodeFactory = require('../../../core/AbstractNodeFactory'); // AbstractNodeFactory를 require
const SlackMessageBuilder = require('./SlackMessageBuilder');
const SlackReadChannelBuilder = require('./SlackReadChannelBuilder');

/**
 * @class DefaultSlackNodeFactory
 * Slack 서비스와 관련된 노드 빌더를 생성하는 구체적인 팩토리.
 */
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