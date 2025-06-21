// 복사2/nodes/states/INodeState.js
class INodeState {
    constructor() {
        if (new.target === INodeState) {
            throw new TypeError("Interface 'INodeState' cannot be instantiated directly.");
        }
        // 이 클래스는 인터페이스 역할을 하므로 직접 인스턴스화할 수 없도록 강제합니다.
        // 즉, 'new INodeState()'와 같이 객체를 만들 수 없습니다.
    }

    /**
     * 해당 상태에서 노드의 실행 관련 행위를 정의합니다.
     * 모든 구체적인 상태 클래스는 이 메서드를 구현해야 합니다.
     * @param {WorkflowComponent} node - 현재 상태를 가진 노드 인스턴스.
     * @param {Object} context - 워크플로우 실행 컨텍스트.
     */
    execute(node, context) {
        throw new Error("Method 'execute()' must be implemented by concrete states.");
        // 'execute()' 메서드는 자식 클래스에서 반드시 구현해야 한다고 명시합니다.
    }

    /**
     * 노드의 상태 전이를 요청합니다.
     * @param {WorkflowComponent} node - 상태를 변경하려는 노드 인스턴스.
     * @param {INodeState} newState - 변경할 새로운 상태 객체.
     */
    transitionTo(node, newState) {
        console.log(`[NodeState] ${node.nodeName} transitioning from ${node.currentState.constructor.name} to ${newState.constructor.name}`);
        // 노드의 상태가 변경되는 과정을 콘솔에 기록하여 가시성을 높입니다.
        node.setState(newState);
        // 실제 노드 객체의 'setState' 메서드를 호출하여 노드의 현재 상태를 변경합니다.
    }
}

module.exports = INodeState;