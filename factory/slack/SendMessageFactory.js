// src/factory/slack/SendMessageFactory.js

const SlackFeatureFactory = require('./SlackFeatureFactory');
const SendMessageCommand = require('../../command/SendMessageCommand');

class SendMessageFactory extends SlackFeatureFactory {
  createCommand() {
    return new SendMessageCommand();
  }

  getDisplayName() {
    return 'Slack 메시지 보내기';
  }
}

module.exports = SendMessageFactory;
