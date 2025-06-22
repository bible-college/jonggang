// src/nodes/triggers/AbstractTriggerNode.js
const Node = require('../../core/Node');
// ITriggerImplementation 직접 임포트 제거

class AbstractTriggerNode extends Node {
    constructor() { // 생성자에서 triggerImplementation을 받지 않음
        super();
        if (new.target === AbstractTriggerNode) {
            throw new TypeError("추상 클래스 'AbstractTriggerNode'는 직접 인스턴스화할 수 없습니다.");
        }

        this.workflowToExecute = null;
        this.triggerCallback = () => {}; // RunnerFacade가 등록할 콜백 함수
        // this.strategy 필드는 구체적인 서브클래스에서 설정될 것으로 예상됨
    }

    setWorkflowToExecute(workflow) {
        this.workflowToExecute = workflow;
    }

    onTrigger(listener) {
        // 이제 이 onTrigger는 RunnerFacade의 리스너를 자신의 전략에 등록하는 역할
        // this.strategy는 구체적인 TriggerNode에 의해 설정되어야 함
        // 설계 관점에서 this.strategy가 항상 ITriggerStrategy의 인스턴스이며 attach 메서드를 가질 것이라고 가정
        // 따라서 불필요한 런타임 체크는 제거합니다.
        // YouTubeLikeTriggerNode의 생성자에서 this.strategy.attach(this);가 이미 호출되므로,
        // 이곳에서는 RunnerFacade의 리스너를 자체 triggerCallback에 할당하는 것으로 충분합니다.
        this.triggerCallback = listener;
        console.log(`[AbstractTriggerNode] 외부 트리거 리스너 등록됨. (트리거 노드의 triggerCallback에 연결)`);
    }

    execute() {
        throw new Error("메서드 'execute()'는 구체적인 트리거 노드에 의해 구현되어야 합니다.");
    }
    // stop 메서드는 필요에 따라 구현체를 통해 전략에 위임 가능
}

module.exports = AbstractTriggerNode;