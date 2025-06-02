// src/factory/slack/SendMessageFactory.js

const SlackFeatureFactory = require('./SlackFeatureFactory');
const SendMessageCommand = require('../../command/SendMessageCommand');
const SimpleSchema = require('../../schema/SimpleSchema');
const SimpleFormatter = require('../../formatter/SimpleFormatter');

class SendMessageFactory extends SlackFeatureFactory {
  createCommand() {
    return new SendMessageCommand();
  }

  getDisplayName() {
    return 'Slack 메시지 보내기';
  }
}

module.exports = SendMessageFactory;
