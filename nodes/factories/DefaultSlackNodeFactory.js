// src/nodes/factories/DefaultSlackNodeFactory.js
const AbstractNodeFactory = require('../AbstractNodeFactory'); // AbstractNodeFactory를 require
const SlackMessageBuilder = require('../builders/SlackMessageBuilder');
const SlackReadChannelBuilder = require('../builders/SlackReadChannelBuilder');

/**
 * @class DefaultSlackNodeFactory
 * Slack 서비스와 관련된 노드 빌더를 생성하는 구체적인 팩토리.
 */
class DefaultSlackNodeFactory extends AbstractNodeFactory { // AbstractNodeFactory를 상속
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