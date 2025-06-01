// src/command/SendMessageCommand.js

class SendMessageCommand {
  execute(input) {
    const { channel, text } = input;
    console.log(`[Slack] '${channel}' 채널에 메시지 전송: "${text}"`);
    return { success: true, sentText: text };
  }
}

module.exports = SendMessageCommand;
