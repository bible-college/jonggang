const WorkflowComponent = require('../../core/WorkflowComponent');
const WorkflowMemento = require('../../core/WorkflowMemento'); // WorkflowMemento 임포트

/**
 * @class SequentialWorkflow
 * 여러 WorkflowComponent(리프 노드 또는 다른 복합 노드)를 순차적으로 실행하는 복합 노드.
 * 컴포지트 패턴의 Composite 역할과 메멘토 패턴의 Originator 역할을 합니다.
 */
class SequentialWorkflow extends WorkflowComponent {
    // id, name, description을 더 이상 생성자에서 받지 않음
    constructor() {
        super(); // WorkflowComponent는 생성자가 없으므로 인자 없이 호출
        this.nodes = [];
    }

    add(component) {
        this.nodes.push(component);
    }

    remove(component) {
        console.warn(`[SequentialWorkflow] remove() 메서드는 설계 모드에서 구현되지 않았습니다.`);
    }

    execute(initialContext = {}) {
        console.log(`\n--- [SequentialWorkflow] 순차 워크플로우 실행 시작 ---`);
        let currentContext = initialContext; // 현재 컨텍스트 초기화
        for (const node of this.nodes) {
            currentContext = node.execute(currentContext); // 각 노드에 현재 컨텍스트 전달 및 업데이트
        }
        console.log(`--- [SequentialWorkflow] 순차 워크플로우 실행 완료 ---\n`);
        return currentContext; // 최종 컨텍스트 반환
    }
    createMemento() {
        console.log("[SequentialWorkflow] 현재 워크플로우 상태를 Memento로 저장.");
        // nodes 배열의 '얕은' 복사를 저장합니다.
        // 실제로는 노드 객체 내부의 모든 상태(receiver, command 등)까지
        // 깊게 복사하거나, 직렬화하여 저장해야 합니다.
        // 여기서는 개념적인 구현이므로, 노드 인스턴스 배열 자체를 스냅샷으로 간주합니다.
        return new WorkflowMemento(this.nodes.slice());
    }

    /**
     * @method restoreFromMemento
     * 주어진 Memento 객체로부터 워크플로우 상태를 복원합니다.
     * 이 메서드는 메멘토 패턴의 Originator 역할을 수행합니다.
     * @param {WorkflowMemento} memento - 복원할 상태를 담은 Memento 객체
     */
    restoreFromMemento(memento) {
        if (memento instanceof WorkflowMemento) {
            console.log("[SequentialWorkflow] Memento로부터 워크플로우 상태 복원 중.");
            this.nodes = memento.getSavedState().slice(); // 복원 시에도 사본을 사용
        } else {
            console.error("[SequentialWorkflow] 유효하지 않은 Memento 객체입니다.");
        }
    }
}

module.exports = SequentialWorkflow;