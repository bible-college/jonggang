// src/nodes/factories/DefaultSlackNodeFactory.js
const AbstractNodeFactory = require("../../../core/AbstractNodeFactory"); // AbstractNodeFactory 경로 수정
const SlackMessageBuilder = require("../slack/SlackMessageBuilder"); // SlackMessageBuilder 경로 수정
const SlackReadChannelBuilder = require("../slack/SlackReadChannelBuilder"); // SlackReadChannelBuilder 경로 수정 (새로 추가될 빌더)

/**
 * @class DefaultSlackNodeFactory
 * Slack 서비스와 관련된 노드 빌더를 생성하는 구체적인 팩토리.
 */
class DefaultSlackNodeFactory extends AbstractNodeFactory {
  constructor() {
    super("Slack"); // 서비스 이름 전달
  }

  /**
   * Slack 메시지 빌더를 생성합니다.
   * @returns {SlackMessageBuilder} Slack 메시지 빌더 인스턴스
   */
  createMessageBuilder() {
    return new SlackMessageBuilder();
  }

  /**
   * Slack 채널 읽기 빌더를 생성합니다.
   * (예시용, 실제 기능은 불필요시 제거 가능)
   * @returns {SlackReadChannelBuilder} Slack 채널 읽기 빌더 인스턴스
   */
  createReadChannelBuilder() {
    // 이 빌더는 아직 구현되지 않았지만, 확장성을 위해 팩토리에 정의
    // 필요하다면 src/nodes/builders/slack/SlackReadChannelBuilder.js 파일 생성 필요
    return new SlackReadChannelBuilder();
  }
}

module.exports = DefaultSlackNodeFactory;
