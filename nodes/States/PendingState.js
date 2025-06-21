// 복사2/nodes/states/PendingState.js
const INodeState = require('./INodeState.js'); // INodeState 인터페이스 불러오기

class PendingState extends INodeState {
    execute(node, context) {
        console.log(`[${node.nodeName}] Node is in Pending State. Preparing for execution.`);
        // 노드가 대기 상태임을 알리고, 실행을 준비한다는 메시지를 출력합니다.
        this.transitionTo(node, new RunningState());
        // 현재 상태(Pending)에서 다음 상태(Running)로 전이를 요청합니다.
        // 여기서 'node.execute(context)'를 직접 호출하지 않고 'return node.execute(context);'로 연결하는 것은
        // WorkflowComponent의 execute() 템플릿 메서드가 상태 전이에 따라 다음 동작을 유도하기 위함입니다.
        // 실제 상태 패턴에서는 execute() 내부에서 다음 상태의 동작을 직접 호출하기도 합니다.
        // 여기서는 흐름의 이해를 돕기 위해 간략화합니다.
    }
}

// 다음 상태인 RunningState를 정의해야 하므로 미리 불러옵니다.
const RunningState = require('./RunningState.js'); 

module.exports = PendingState;