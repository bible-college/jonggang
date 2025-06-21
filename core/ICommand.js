// src/core/ICommand.js
/**
 * @interface ICommand
 * 모든 실행 가능한 커맨드가 구현해야 할 인터페이스.
 * 커맨드 패턴의 Command 역할을 합니다.
 */
class ICommand {
  /**
   * 커맨드가 수행할 작업을 실행합니다.
   * @abstract
   */
  execute() {
    throw new Error('Method "execute()" must be implemented.');
  }
}

module.exports = ICommand;
