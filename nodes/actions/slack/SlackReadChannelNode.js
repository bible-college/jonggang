// src/nodes/actions/slack/SlackReadChannelNode.js
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand');

// Slack 채널 메시지 읽기 로직의 실제 수신자 (Receiver) 역할
// 비동기 로직 제거, 동기적으로 동작하는 것처럼 수정
class SlackReadChannelReceiver {
    readChannel(channelId) {
        console.log(`[SlackAPI - Receiver] Slack 채널 메시지 읽기: 채널 ID '${channelId}'`);
        // 실제 Slack API 호출 로직은 없음. 개념만 전달.
        // 여기서는 읽어온 메시지 데이터를 반환한다고 가정할 수 있지만,
        // 현재는 콘솔 로그만 남깁니다.
        return `[Mock Data] 메시지 목록 from channel ${channelId}`;
    }
}

// Slack 채널 메시지를 읽는 구체적인 커맨드 (Concrete Command)
class SlackReadChannelCommand extends ICommand {
    constructor(receiver, channelId) {
        super();
        this.receiver = receiver;
        this.channelId = channelId;
    }

    execute() {
        console.log(`[SlackReadChannelCommand] 커맨드 실행: Slack 채널 읽기 준비`);
        const result = this.receiver.readChannel(this.channelId); // 수신자의 실제 작업 호출
        console.log(`[SlackReadChannelCommand] 커맨드 실행 완료. 결과: ${result}`);
        return result; // 읽어온 데이터를 반환할 수도 있습니다.
    }
}

/**
 * @class SlackReadChannelNode
 * Slack 채널 메시지 읽기 노드.
 * 컴포지트 패턴의 리프 노드 역할과, 내부적으로 커맨드 패턴을 활용합니다.
 */
class SlackReadChannelNode extends Node {
    constructor(channelId) {
        super(); // WorkflowComponent 생성자 호출
        this.channelId = channelId;

        this.receiver = new SlackReadChannelReceiver();
        this.command = new SlackReadChannelCommand(this.receiver, channelId);
    }

    // WorkflowComponent의 execute()를 구현합니다.
    // 이제 이 execute()는 단순히 내부 커맨드의 execute()를 호출합니다.
    execute(context = {}) {
        console.log(`[SlackReadChannelNode] 노드 실행: 내부 커맨드 호출 준비.`);
        const readMessage = this.command.execute(); // 노드가 가진 커맨드를 실행
        console.log(`[SlackReadChannelNode] 노드 실행 완료.`);
        // 실행 결과를 context에 추가하고 반환
        return { ...context, slackReadMessageContent: readMessage }; // 새로운 속성
    }
}

module.exports = SlackReadChannelNode;