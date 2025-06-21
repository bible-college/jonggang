
class EventStore {
    constructor() {
        if (EventStore.instance) {
            return EventStore.instance;
        }
        this.events = [];
        EventStore.instance = this;
    }

    logEvent(event) {
        this.events.push(event);
        console.log(`[EventStore] 이벤트 기록됨: ${event.message}`);
    }

    getAllEvents() {
        return this.events;
    }

    getEventsByNodeId(nodeId) {
        return this.events.filter(event => event.nodeId === nodeId);
    }
}

const instance = new EventStore();
module.exports = instance;