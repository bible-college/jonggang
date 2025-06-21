// src/nodes/AbstractNodeFactory.js
/**
 * @abstract
 * 모든 서비스별 노드 팩토리가 따를 수 있는 가장 기본적인 추상 팩토리.
 * 모든 팩토리가 공유해야 할 공통적인 특징(예: 서비스 이름 반환)만 정의합니다.
 */
class AbstractNodeFactory {
  constructor(serviceName) {
    if (new.target === AbstractNodeFactory) {
      throw new TypeError(
        "Abstract class 'AbstractNodeFactory' cannot be instantiated directly."
      );
    }
    this.serviceName = serviceName;
  }

  getServiceName() {
    return this.serviceName;
  }
}

module.exports = AbstractNodeFactory;
