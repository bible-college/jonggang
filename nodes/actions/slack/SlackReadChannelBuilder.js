// src/nodes/builders/slack/SlackReadChannelBuilder.js
const WorkflowComponent = require("../../../core/WorkflowComponent"); // 임시로 WorkflowComponent 사용

/**
 * @class SlackReadChannelNode (임시 스텁)
 * Slack 채널 읽기 노드 (실제 구현 없음).
 * @extends WorkflowComponent
 */
class SlackReadChannelNode extends WorkflowComponent {
  constructor(channelId) {
    super();
    this.channelId = channelId;
  }

  execute(context = {}) {
    console.log(
      `[SlackReadChannelNode] 채널 '${this.channelId}' 읽기 작업 실행 (개념적).`
    );
    return {
      success: true,
      message: `Slack 채널 '${this.channelId}' 읽기 작업 완료.`,
    };
  }
}

/**
 * @class SlackReadChannelBuilder
 * SlackReadChannelNode를 생성하기 위한 빌더 클래스.
 */
class SlackReadChannelBuilder {
  constructor() {
    this.channelId = "";
  }

  setChannelId(channelId) {
    this.channelId = channelId;
    return this;
  }

  build() {
    return new SlackReadChannelNode(this.channelId);
  }
}

module.exports = SlackReadChannelBuilder;
