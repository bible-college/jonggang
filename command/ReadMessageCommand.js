// src/command/ReadMessageCommand.js

class ReadMessageCommand {
  execute(input) {
    const { channel } = input;
    console.log(`[Slack] '${channel}' 채널에서 메시지 읽기`);
    
    // 실제 로직 없이 단순 반환
    return {
      success: true,
      messages: ['Hello', 'World'],
    };
  }
}

module.exports = ReadMessageCommand;
