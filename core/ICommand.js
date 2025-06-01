// src/core/ICommand.js

class ICommand {
  execute(input) {
    throw new Error('execute(input) 메서드는 반드시 구현되어야 합니다.');
  }
}

module.exports = ICommand;
