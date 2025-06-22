const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand');

class SlackMessageReceiver {
    sendMessage(channel, message) {
        console.log(`Slack 메시지 전송: 채널 '${channel}', 메시지 '${message}'`);
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
        this.receiver.sendMessage(this.channel, this.message); 
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
        const messageFromReadChannel = context.slackReadMessageContent;
        const finalMessage = `${this.message}. 이전 Slack 채널 읽기 결과: "${messageFromReadChannel}"'}`;
        const dynamicCommand = new SlackMessageCommand(this.receiver, this.channel, finalMessage);
        dynamicCommand.execute();
        
        return { ...context, slackMessageSent: true, finalSlackMessage: finalMessage }; 
    }
}

module.exports = SlackMessageNode;