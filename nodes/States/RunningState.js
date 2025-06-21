// 복사2/nodes/states/RunningState.js
const INodeState = require('./INodeState'); // INodeState 인터페이스 불러오기

class RunningState extends INodeState {
    execute(node, context) {
        console.log(`[${node.nodeName}] Node is in Running State. Core task is being performed.`);
        // 노드가 현재 실행 중임을 알립니다.
        // 실제 노드의 핵심 로직(doExecute)이 이 상태에서 수행됩니다.
        // 이 상태의 execute 메서드는 템플릿 메서드의 'doExecute' 단계와 연결되어 있습니다.
    }
}

// 다음 상태인 SuccessState와 FailureState를 정의해야 하므로 미리 불러옵니다.
const SuccessState = require('./SuccessState'); 
const FailureState = require('./FailureState');

module.exports = RunningState;