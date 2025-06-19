// src/nodes/triggers/strategies/ITriggerStrategy.js
// EventEmitter 사용 제거

/**
 * @interface ITriggerStrategy
 * 트리거 감지 전략을 위한 인터페이스 (추상 클래스로 구현).
 * 모든 구체적인 트리거 전략은 이 인터페이스를 구현해야 합니다.
 * (중지 로직은 포함하지 않고, 설계 패턴 예시를 위해 최소화된 동작만 수행)
 * * 옵저버 패턴의 Subject(주제) 역할을 직접 구현합니다.
 */
class ITriggerStrategy {
    constructor() {
        if (new.target === ITriggerStrategy) {
            throw new TypeError("Interface 'ITriggerStrategy' cannot be instantiated directly.");
        }
        this.observers = []; // 옵저버 목록
    }

    /**
     * 옵저버를 등록합니다. (attach/subscribe)
     * @param {Object} observer - update() 메서드를 가진 옵저버 객체
     */
    attach(observer) {
        this.observers.push(observer);
        console.log(`[ITriggerStrategy] 옵저버 ${observer.constructor.name} 등록됨.`);
    }

    /**
     * 옵저버를 해지합니다. (detach/unsubscribe)
     * @param {Object} observer - 제거할 옵저버 객체
     */
    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
        console.log(`[ITriggerStrategy] 옵저버 ${observer.constructor.name} 해지됨.`);
    }

    /**
     * 등록된 모든 옵저버에게 알립니다. (notify)
     * @param {Object} data - 옵저버에게 전달할 데이터
     */
    notify(data) {
        console.log(`[ITriggerStrategy] 모든 옵저버에게 알림: ${JSON.stringify(data)}`);
        this.observers.forEach(observer => observer.update(data));
    }

    /**
     * 트리거 감지 로직을 시작합니다.
     * @abstract
     */
    startMonitoring() {
        // 실제 로직 없음, 단순히 구현되어야 함을 명시
        throw new Error("Method 'startMonitoring()' must be implemented by concrete trigger strategies.");
    }

    // stopMonitoring() 메서드 삭제
}

module.exports = ITriggerStrategy;