class EventStore {
    constructor() {
        this.events = []; // 이벤트들을 저장할 배열
    }

    append(event) {
        this.events.push(Object.freeze(event)); 
    }

    getAllEvents() {
        return [...this.events]; 
    }


    getEventsByType(type) {
        return this.events.filter(event => event.type === type);
    }

    clear() {
        this.events = [];
        console.log("[EventStore] 이벤트 저장소가 초기화되었습니다.");
    }
}

module.exports = EventStore;