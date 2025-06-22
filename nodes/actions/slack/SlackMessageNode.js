// src/nodes/actions/slack/SlackMessageNode.js (수정)
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand');

class SlackMessageReceiver {
    sendMessage(channel, message) {
        console.log(`[SlackAPI - Receiver] Slack 메시지 전송: 채널 '${channel}', 메시지 '${message}'`);
        // 실제 Slack API 호출 로직은 없음. 개념만 전달.
    }
}

// Slack 메시지를 보내는 구체적인 커맨드 (Concrete Command)
class SlackMessageCommand extends ICommand {
    constructor(receiver, channel, message) {
        super();
        this.receiver = receiver;
        this.channel = channel;
        this.message = message;
    }

    execute() {
        console.log(`[SlackMessageCommand] 커맨드 실행: Slack 메시지 준비`);
        this.receiver.sendMessage(this.channel, this.message); // 수신자의 실제 작업 호출
        console.log(`[SlackMessageCommand] 커맨드 실행 완료.`);
    }
}

class SlackMessageNode extends Node {
    constructor(channel, message) {
        super(); // WorkflowComponent 생성자 호출
        this.channel = channel;
        this.message = message;

        this.receiver = new SlackMessageReceiver();
        this.command = new SlackMessageCommand(this.receiver, channel, message);
    }

    // WorkflowComponent의 execute()를 구현합니다.
    // 이제 이 execute()는 단순히 내부 커맨드의 execute()를 호출합니다.
    execute(context = {}) { // context 인자 추가
        console.log(`[SlackMessageNode] 노드 실행: 내부 커맨드 호출 준비. 이전 컨텍스트:`, context);
        // 예를 들어, 이전 노드에서 읽어온 slackReadChannelResult를 메시지에 포함
        const messageFromReadChannel = context.slackReadMessageContent;
        const finalMessage = `${this.message}. 이전 Slack 채널 읽기 결과: "${messageFromReadChannel}"'}`;
        const dynamicCommand = new SlackMessageCommand(this.receiver, this.channel, finalMessage);
        dynamicCommand.execute();
        console.log(`[SlackMessageNode] 커맨드 실행 완료.`);
        
        return { ...context, slackMessageSent: true, finalSlackMessage: finalMessage }; // 전송된 최종 메시지도 context에 추가
    }
}

module.exports = SlackMessageNode;