// src/core/EventStore.js

/**
 * @class EventStore
 * 이벤트 소싱 패턴의 이벤트 저장소 역할을 합니다.
 * 모든 시스템 이벤트를 불변의 사실로 기록합니다.
 */
class EventStore {
    constructor() {
        this.events = []; // 이벤트들을 저장할 배열
    }

    /**
     * 새로운 이벤트를 저장소에 추가합니다.
     * @param {Object} event - 기록할 이벤트 객체
     */
    append(event) {
        this.events.push(Object.freeze(event)); // 이벤트는 불변 객체로 저장 (Object.freeze로 변경 방지)
    }

    /**
     * 모든 기록된 이벤트를 반환합니다.
     * @returns {Array<Object>} 기록된 이벤트 배열의 복사본
     */
    getAllEvents() {
        return [...this.events]; // 원본 배열이 외부에서 수정되는 것을 막기 위해 복사본 반환
    }

    /**
     * 특정 타입의 이벤트를 필터링하여 반환합니다.
     * @param {string} type - 필터링할 이벤트 타입
     * @returns {Array<Object>} 필터링된 이벤트 배열
     */
    getEventsByType(type) {
        return this.events.filter(event => event.type === type);
    }

    /**
     * 저장소를 비웁니다. (테스트 또는 초기화를 위해)
     */
    clear() {
        this.events = [];
        console.log("[EventStore] 이벤트 저장소가 초기화되었습니다.");
    }
}

module.exports = EventStore;