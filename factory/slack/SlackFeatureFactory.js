// src/factory/slack/SlackFeatureFactory.js

const AbstractActionFactory = require('../abstract/AbstractActionFactory');

class SlackFeatureFactory extends AbstractActionFactory {
  // Slack 액션 전용 확장 메서드를 정의할 수 있는 공간
  // 예: Slack API 인증 처리, 공통 메시지 포맷터 등
}

module.exports = SlackFeatureFactory;
