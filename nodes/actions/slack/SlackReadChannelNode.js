
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand');

class SlackReadChannelReceiver {
    readChannel(channelId) {
        console.log(`[SlackAPI - Receiver] Slack 채널 메시지 읽기: 채널 ID '${channelId}'`);
        return `[Mock Data] 메시지 목록 from channel ${channelId}`;
    }
}


class SlackReadChannelCommand extends ICommand {
    constructor(receiver, channelId) {
        super();
        this.receiver = receiver;
        this.channelId = channelId;
    }

    execute() {
        console.log(`[SlackReadChannelCommand] 커맨드 실행: Slack 채널 읽기 준비`);
        const result = this.receiver.readChannel(this.channelId); 
        console.log(`[SlackReadChannelCommand] 커맨드 실행 완료. 결과: ${result}`);
        return result; 
    }
}

class SlackReadChannelNode extends Node {
    constructor(channelId) {
        super(); 
        this.channelId = channelId;

        this.receiver = new SlackReadChannelReceiver();
        this.command = new SlackReadChannelCommand(this.receiver, channelId);
    }

    execute(context = {}) {
        console.log(`[SlackReadChannelNode] 노드 실행: 내부 커맨드 호출 준비.`);
        const readMessage = this.command.execute(); 
        console.log(`[SlackReadChannelNode] 노드 실행 완료.`);
        return { ...context, slackReadMessageContent: readMessage }; 
    }
}

module.exports = SlackReadChannelNode;