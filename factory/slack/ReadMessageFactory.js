// src/factory/slack/ReadMessageFactory.js

const SlackFeatureFactory = require('./SlackFeatureFactory');
const ReadMessageCommand = require('../../command/ReadMessageCommand');
const SimpleSchema = require('../../schema/SimpleSchema');
const SimpleFormatter = require('../../formatter/SimpleFormatter');

class ReadMessageFactory extends SlackFeatureFactory {
  createCommand() {
    return new ReadMessageCommand();
  }

  createInputSchema() {
    return new SimpleSchema(['channel']);
  }

  createFormatter() {
    return new SimpleFormatter();
  }

  getDisplayName() {
    return 'Slack 메시지 읽기';
  }
}

module.exports = ReadMessageFactory;
