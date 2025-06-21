// src/facade/WorkflowRunnerFacade.js
const WorkflowExecutor = require("../../core/WorkflowExecutor");
const AbstractTriggerNode = require("../triggers/AbstractTriggerNode");

/**
 * @class WorkflowRunnerFacade
 * 워크플로우 실행 과정을 단순화하는 퍼사드 클래스.
 * 워크플로우 실행기(WorkflowExecutor)와 트리거 노드의 연동을 관리합니다.
 */
class WorkflowRunnerFacade {
  constructor() {
    this.executor = new WorkflowExecutor(); // 워크플로우 실행기
    this.activeTriggers = new Map(); // 현재 활성화된 트리거 노드를 관리
  }

  /**
   * 주어진 워크플로우 컴포넌트를 실행합니다.
   * 만약 첫 번째 노드가 트리거 노드라면, 해당 트리거를 설정하고 감시를 시작합니다.
   * 그렇지 않으면, 워크플로우를 즉시 실행합니다.
   * @param {WorkflowComponent} workflowComponent - 실행할 워크플로우 (주로 SequentialWorkflow)
   */
  runWorkflow(workflowComponent) {
    // 워크플로우의 첫 번째 노드가 존재하고 트리거 노드인지 확인합니다.
    const firstNode =
      workflowComponent.nodes && workflowComponent.nodes.length > 0
        ? workflowComponent.nodes[0]
        : null;

    // --- 퍼사드가 제공하는 단순화된 실행 로직 ---
    if (firstNode instanceof AbstractTriggerNode) {
      console.log(
        `[RunnerFacade] 트리거 노드 감지: 워크플로우 실행을 트리거에 위임.`
      );

      // 1. 트리거 노드에게 실행할 워크플로우를 연결합니다.
      //    트리거 노드는 이 워크플로우를 특정 이벤트 발생 시 executor를 통해 실행합니다.
      firstNode.setWorkflowToExecute(workflowComponent);

      // 2. 트리거 이벤트 발생 시 워크플로우를 실행하도록 리스너를 등록합니다.
      const triggerListener = (payload) => {
        console.log(
          `[RunnerFacade] 트리거 이벤트 발생: 워크플로우 실행 시작. (Payload: ${JSON.stringify(
            payload
          )})`
        );
        this.executor.setWorkflow(workflowComponent); // 실행할 워크플로우 설정
        this.executor.runWorkflow(); // 워크플로우 실행 지시
      };
      firstNode.onTrigger(triggerListener); // AbstractTriggerNode의 onTrigger 호출

      // 활성 트리거 맵에 등록하여 관리합니다 (예: 나중에 중지할 때 사용)
      this.activeTriggers.set(firstNode, {
        triggerNode: firstNode,
        listener: triggerListener,
        workflow: workflowComponent,
      });

      // 3. 트리거 노드의 감시 시작을 지시합니다.
      //    이제 이 execute 호출은 WorkflowComponent의 반환 규약을 따릅니다.
      const triggerInitResult = firstNode.execute();
      if (!triggerInitResult.success) {
        console.error(
          `[RunnerFacade] 트리거 노드 초기화 실패: ${triggerInitResult.message}`
        );
        // 초기화 실패 시 워크플로우 실행을 중단하거나 적절히 처리
        return;
      }
      console.log(
        `[RunnerFacade] 트리거 노드 초기화 성공: ${triggerInitResult.message}`
      );
    } else {
      // 첫 번째 노드가 트리거 노드가 아니면, 워크플로우를 즉시 실행합니다.
      console.log(`[RunnerFacade] 일반 워크플로우 감지: 즉시 실행 지시.`);
      this.executor.setWorkflow(workflowComponent);
      this.executor.runWorkflow();
    }
  }

  /**
   * 활성화된 특정 트리거의 감시를 중지합니다.
   * (현재는 간단한 구현이며, 실제에서는 트리거 ID 등으로 관리될 수 있습니다.)
   * @param {AbstractTriggerNode} triggerNode - 중지할 트리거 노드 인스턴스
   */
  stopTriggerMonitoring(triggerNode) {
    if (this.activeTriggers.has(triggerNode)) {
      const { triggerNode: activeTrigger, listener } =
        this.activeTriggers.get(triggerNode);
      activeTrigger.detach(listener); // 옵저버 패턴의 detach (이 예시에서는 직접 detach 로직 없음)
      activeTrigger.strategy.stopMonitoring(); // 전략에 감시 중지 지시
      this.activeTriggers.delete(triggerNode);
      console.log(
        `[RunnerFacade] 트리거 노드 감시 중지됨: ${activeTrigger.constructor.name}`
      );
    } else {
      console.warn(`[RunnerFacade] 활성화되지 않은 트리거 노드입니다.`);
    }
  }
}

module.exports = WorkflowRunnerFacade;
