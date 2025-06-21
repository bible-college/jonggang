// src/core/AbstractSubject.js
/**
 * @abstract
 * 옵저버 패턴에서 Subject(관찰 대상)의 추상 클래스.
 * 옵저버를 관리하고 알림을 보내는 기본 기능을 제공합니다.
 */
class AbstractSubject {
  constructor() {
    this.observers = [];
  }

  /**
   * 옵저버를 등록합니다.
   * @param {Object} observer - Observer 인터페이스를 구현하는 객체 (update 메서드 가짐)
   */
  attach(observer) {
    this.observers.push(observer);
    console.log(
      `[AbstractSubject] 옵저버 ${observer.constructor.name} 등록됨.`
    );
  }

  /**
   * 옵저버를 해지합니다.
   * @param {Object} observer - 해지할 옵저버
   */
  detach(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
    console.log(
      `[AbstractSubject] 옵저버 ${observer.constructor.name} 해지됨.`
    );
  }

  /**
   * 등록된 모든 옵저버에게 데이터를 전달하여 알립니다.
   * @param {any} data - 옵저버에게 전달할 데이터
   */
  notify(data) {
    console.log(
      `[AbstractSubject] 모든 옵저버에게 알림: ${JSON.stringify(data)}`
    );
    this.observers.forEach((observer) => observer.update(data));
  }
}
module.exports = AbstractSubject;
