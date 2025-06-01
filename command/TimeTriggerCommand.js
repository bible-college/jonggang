// src/command/TimeTriggerCommand.js

class TimeTriggerCommand {
  execute() {
    const timestamp = new Date().toISOString();
    console.log(`[Trigger] 현재 시간 트리거 실행됨: ${timestamp}`);

    return {
      triggeredAt: timestamp,
      success: true,
    };
  }
}

module.exports = TimeTriggerCommand;
