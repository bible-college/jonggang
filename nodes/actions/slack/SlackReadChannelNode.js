
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand');

class SlackReadChannelReceiver {
    readChannel(channelId) {
        return `메시지 한국성서대`;
    }
}


class SlackReadChannelCommand extends ICommand {
    constructor(receiver, channelId) {
        super();
        this.receiver = receiver;
        this.channelId = channelId;
    }

    execute() {
        const result = this.receiver.readChannel(this.channelId); 
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
        const readMessage = this.command.execute(); 
        return { ...context, slackReadMessageContent: readMessage }; 
    }
}

module.exports = SlackReadChannelNode;