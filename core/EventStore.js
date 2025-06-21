// core/EventStore.js

/**
 * @class EventStore
 * 이벤트 소싱 개념을 적용하여 노드 실행 이벤트를 기록하고 조회하는 중앙 저장소.
 * 싱글턴 패턴으로 구현되어 애플리케이션 전체에서 단일 인스턴스를 보장합니다.
 */
// 1: 이 클래스가 어떤 역할을 하는지 설명하는 주석입니다.
// 2: '이벤트 소싱'은 모든 변경 사항을 이벤트로 기록하는 방식입니다.
// 3: '싱글턴 패턴'은 이 클래스의 객체가 프로그램 전체에서 단 하나만 생성되도록 보장하는 디자인 패턴입니다.
//    어디서든 EventStore를 불러와도 항상 같은 객체를 사용하게 됩니다.
class EventStore {
    // 4: EventStore 라는 이름의 클래스를 선언합니다.
    constructor() {
        // 5: 이 클래스로 객체를 만들 때(new EventStore()) 가장 먼저 실행되는 코드입니다.
        if (EventStore.instance) {
            // 6: 만약 'EventStore.instance' 라는 변수에 이미 객체가 있다면,
            return EventStore.instance;
            // 7: 새로운 객체를 만들지 않고, 기존에 만들어둔 객체를 즉시 반환합니다. (싱글턴 패턴의 핵심)
        }
        this.events = [];
        // 8: 'this.events' 라는 빈 배열을 만듭니다. 앞으로 모든 이벤트가 여기에 저장될 것입니다.
        EventStore.instance = this;
        // 9: 'EventStore.instance' 라는 변수에 지금 막 생성된 자기 자신(this)을 저장합니다.
        //    이렇게 하면 다음에 누군가 new EventStore()를 호출했을 때, 6번 줄의 조건에 걸리게 됩니다.
    }

    /**
     * 노드 실행 이벤트를 기록합니다.
     * @param {Object} event - 기록할 이벤트 객체 { nodeId, timestamp, status, message }
     */
    // 10: 'logEvent' 라는 메서드(기능)가 어떤 역할을 하는지 설명하는 주석입니다.
    logEvent(event) {
        // 11: 'logEvent' 라는 이름의 메서드를 선언합니다. 'event' 라는 객체를 파라미터로 받습니다.
        this.events.push(event);
        // 12: 8번 줄에서 만든 'this.events' 배열에, 파라미터로 받은 'event' 객체를 추가합니다.
        console.log(`[EventStore] 이벤트 기록됨: ${event.message}`);
        // 13: 어떤 이벤트가 기록되었는지 확인하기 쉽도록 콘솔에 로그 메시지를 출력합니다.
    }

    /**
     * 기록된 모든 이벤트를 조회합니다.
     * @returns {Array<Object>}
     */
    // 14: 'getAllEvents' 메서드에 대한 설명 주석입니다.
    getAllEvents() {
        // 15: 'getAllEvents' 라는 이름의 메서드를 선언합니다.
        return this.events;
        // 16: 현재까지 'this.events' 배열에 저장된 모든 이벤트들을 그대로 반환합니다.
    }

    /**
     * 특정 노드 ID에 대한 이벤트만 필터링하여 반환합니다.
     * @param {string} nodeId
     * @returns {Array<Object>}
     */
    // 17: 'getEventsByNodeId' 메서드에 대한 설명 주석입니다.
    getEventsByNodeId(nodeId) {
        // 18: 'getEventsByNodeId' 메서드를 선언합니다. 조회하고 싶은 'nodeId'를 파라미터로 받습니다.
        return this.events.filter(event => event.nodeId === nodeId);
        // 19: 'this.events' 배열의 모든 이벤트를 하나씩 확인하면서(filter),
        //     이벤트의 'nodeId'가 파라미터로 받은 'nodeId'와 같은 것들만 골라서 새로운 배열로 만들어 반환합니다.
    }
}

// 싱글턴 인스턴스를 생성하여 내보냅니다.
// 20: 이 파일 밖에서도 EventStore를 사용할 수 있도록 설정하는 부분입니다.
const instance = new EventStore();
// 21: EventStore 클래스의 객체(인스턴스)를 딱 한 번 생성해서 'instance' 라는 상수에 담습니다.
module.exports = instance;
// 22: 다른 파일에서 require('./core/EventStore')를 했을 때, 21번 줄에서 만든 'instance' 객체를 넘겨줍니다.