// src/core/AbstractNode.js

class AbstractNode {
  constructor() {
    if (new.target === AbstractNode) {
      throw new Error('AbstractNode는 추상 클래스입니다. 직접 인스턴스화할 수 없습니다.');
    }
  }

  execute(input) {
    throw new Error('execute() 메서드는 반드시 구현되어야 합니다.');
  }

  getType() {
    throw new Error('getType() 메서드는 반드시 구현되어야 합니다.');
  }
}

module.exports = AbstractNode;
