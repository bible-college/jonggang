// src/nodes/builders/slack/SlackMessageBuilder.js
const SlackMessageNode = require("../slack/SlackMessageNode");

/**
 * @class SlackMessageNodeBuilder
 * SlackMessageNode를 생성하기 위한 빌더 클래스.
 * 빌더 패턴의 Concrete Builder 역할을 합니다.
 */
class SlackMessageNodeBuilder {
  constructor() {
    this.channel = "";
    this.message = "";
  }

  /**
   * Slack 메시지를 보낼 채널을 설정합니다.
   * @param {string} channel - 채널 이름 (예: '#general')
   * @returns {SlackMessageNodeBuilder} 체이닝을 위한 빌더 인스턴스
   */
  setChannel(channel) {
    this.channel = channel;
    return this;
  }

  /**
   * Slack 메시지 내용을 설정합니다.
   * @param {string} message - 메시지 내용
   * @returns {SlackMessageNodeBuilder} 체이닝을 위한 빌더 인스턴스
   */
  setMessage(message) {
    this.message = message;
    return this;
  }

  /**
   * 설정된 값으로 SlackMessageNode 인스턴스를 빌드합니다.
   * @returns {SlackMessageNode} 새로 생성된 SlackMessageNode 인스턴스
   */
  build() {
    return new SlackMessageNode(this.channel, this.message);
  }
}

module.exports = SlackMessageNodeBuilder;
