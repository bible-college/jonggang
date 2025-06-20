// src/core/ITriggerImplementation.js
/**
 * @interface ITriggerImplementation
 * 트리거 감지 방식(로컬 폴링, 클라우드 웹훅 등)에 대한 구현을 정의하는 인터페이스.
 * Bridge 패턴의 Implementor 역할을 합니다.
 */
class ITriggerImplementation {
    constructor() {
        if (new.target === ITriggerImplementation) {
            throw new TypeError("Interface 'ITriggerImplementation' cannot be instantiated directly.");
        }
    }

    /**
     * 특정 이벤트를 감지하기 위한 리스닝을 시작합니다.
     * 구현체는 이벤트를 감지했을 때 등록된 콜백을 호출해야 합니다.
     * @param {function} callback - 트리거 이벤트 발생 시 호출될 콜백 함수
     */
    startListening(callback) {
        throw new Error("Method 'startListening()' must be implemented.");
    }

    /**
     * 이벤트 감지를 중지합니다.
     */
    stopListening() {
        throw new Error("Method 'stopListening()' must be implemented.");
    }
}

module.exports = ITriggerImplementation;