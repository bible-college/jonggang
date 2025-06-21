// 복사2/nodes/states/FailureState.js
const INodeState = require('./INodeState'); // INodeState 인터페이스 불러오기

class FailureState extends INodeState {
    execute(node, context) {
        console.log(`[${node.nodeName}] Node is in Failure State. Task failed.`);
        // 노드가 실패 상태임을 알립니다.
        // 실패 후 추가적인 에러 처리가 필요할 수 있지만, 여기서는 체인 오브 리스폰서빌리티로 결과가 전달되므로 직접적인 상태 전이는 없습니다.
    }
}

module.exports = FailureState;