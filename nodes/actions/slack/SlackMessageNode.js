// src/nodes/actions/slack/SlackMessageNode.js
const WorkflowComponent = require("../../../core/WorkflowComponent");
const ICommand = require("../../../core/ICommand");

// Slack 메시지 전송 로직의 실제 수신자 (Receiver) 역할
class SlackMessageReceiver {
  sendMessage(channel, message) {
    console.log(
      `[SlackAPI - Receiver] Slack 채널 '${channel}'에 메시지 전송: "${message}"`
    );
    // 실제 Slack API 호출 로직은 없음. 개념만 전달.
    // 여기서 실제 Slack API 호출이 실패했다고 가정하고 예외를 발생시킬 수 있습니다.
    // 예를 들어, Math.random() < 0.5 와 같은 조건을 추가하여 50% 확률로 실패를 시뮬레이션할 수 있습니다.
    // if (Math.random() < 0.5) {
    //     throw new Error("Slack API 연결 오류 발생!");
    // }
  }
}

// Slack 메시지 전송 커맨드 (Concrete Command)
class SlackMessageCommand extends ICommand {
  constructor(receiver, channel, message) {
    super();
    this.receiver = receiver;
    this.channel = channel;
    this.message = message;
  }

  execute() {
    console.log(`[SlackMessageCommand] 커맨드 실행: Slack 메시지 전송 준비`);
    this.receiver.sendMessage(this.channel, this.message); // Receiver의 작업 실행
    console.log(`[SlackMessageCommand] 커맨드 실행 완료.`);
  }
}

/**
 * @class SlackMessageNode
 * Slack 메시지를 특정 채널로 전송하는 노드.
 * 컴포지트 패턴의 리프 노드 역할과, 내부적으로 커맨드 패턴을 활용합니다.
 */
class SlackMessageNode extends WorkflowComponent {
  constructor(channel, message) {
    super();
    this.channel = channel;
    this.message = message;

    this.receiver = new SlackMessageReceiver();
    this.command = new SlackMessageCommand(
      this.receiver,
      this.channel,
      this.message
    );
  }

  /**
   * Slack 메시지 전송 작업을 실행하고, 그 결과를 반환합니다.
   * @param {Object} [context={}] - 노드 실행에 필요한 컨텍스트 데이터
   * @returns {{success: boolean, message: string, error?: Error}} 작업 성공 여부와 메시지, 에러를 포함하는 객체
   */
  execute(context = {}) {
    console.log(
      `[SlackMessageNode] 노드 실행: Slack 메시지 전송 작업을 커맨드에 위임.`
    );
    try {
      this.command.execute(); // 커맨드 실행 (성공 또는 실패 발생 가능)
      console.log(`[SlackMessageNode] Slack 메시지 전송 성공.`);
      return {
        success: true,
        message: `Slack 채널 '${this.channel}'에 메시지 전송 성공.`,
      };
    } catch (error) {
      console.error(
        `[SlackMessageNode] Slack 메시지 전송 실패: ${error.message}`
      );
      // 실제 Slack API 실패 로직을 여기에 추가합니다.
      return {
        success: false,
        message: `Slack 채널 '${this.channel}' 메시지 전송 실패: ${error.message}`,
        error: error,
      };
    }
  }
}

module.exports = SlackMessageNode;
