// src/nodes/actions/slack/SlackMessageNode.js
const Node = require('../../../core/Node'); //
const ICommand = require('../../../core/ICommand'); //

class SlackMessageReceiver {
    sendMessage(channel, message) {
        console.log(`Slack 메시지 전송: 채널 '${channel}','${message}'`);
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
        let lastKnownValue = null; 
        for (const key in context) {
            lastKnownValue = context[key];
        }
        
        let combinedMessage = this.message;
        combinedMessage += ` ${String(lastKnownValue)}`; 

        
        const dynamicCommand = new SlackMessageCommand(this.receiver, this.channel, combinedMessage);
        dynamicCommand.execute();
        
        return { ...context, slackMessageSent: true, finalSlackMessage: combinedMessage }; 
    }
}

module.exports = SlackMessageNode;