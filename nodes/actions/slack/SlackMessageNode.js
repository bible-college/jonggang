const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand');

class SlackMessageReceiver {
    sendMessage(channel, message) {
        console.log(`[SlackAPI - Receiver] Slack 메시지 전송: 채널 '${channel}', 메시지 '${message}'`);
    }
}
class SlackMessageCommand extends ICommand {
    constructor(receiver, channel, message) {
        super();
        this.receiver = receiver;
        this.channel = channel;
        this.message = message;
    }

    execute() {
        console.log(`[SlackMessageCommand] 커맨드 실행: Slack 메시지 준비`);
        this.receiver.sendMessage(this.channel, this.message); 
        console.log(`[SlackMessageCommand] 커맨드 실행 완료.`);
    }
}

class SlackMessageNode extends Node {
    constructor(channel, message) {
        super(); 
        this.channel = channel;
        this.message = message;

        this.receiver = new SlackMessageReceiver();
        this.command = new SlackMessageCommand(this.receiver, channel, message);
    }
    execute(context = {}) { 
        console.log(`[SlackMessageNode] 노드 실행: 내부 커맨드 호출 준비. 이전 컨텍스트:`, context);
        const messageFromReadChannel = context.slackReadMessageContent;
        const finalMessage = `${this.message}. 이전 Slack 채널 읽기 결과: "${messageFromReadChannel}"'}`;
        const dynamicCommand = new SlackMessageCommand(this.receiver, this.channel, finalMessage);
        dynamicCommand.execute();
        console.log(`[SlackMessageNode] 커맨드 실행 완료.`);
        
        return { ...context, slackMessageSent: true, finalSlackMessage: finalMessage }; 
    }
}

module.exports = SlackMessageNode;