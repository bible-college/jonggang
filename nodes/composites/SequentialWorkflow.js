// src/nodes/composites/SequentialWorkflow.js (수정)
const WorkflowComponent = require("../../core/WorkflowComponent");
const IWorkflowExecutionHandler = require("../../core/IWorkflowExecutionHandler"); // 핸들러 인터페이스 추가 (타입 힌트 목적)

/**
 * @class SequentialWorkflow
 * 여러 WorkflowComponent(리프 노드 또는 다른 복합 노드)를 순차적으로 실행하는 복합 노드.
 * 컴포지트 패턴의 Composite 역할을 합니다.
 */
class SequentialWorkflow extends WorkflowComponent {
  constructor() {
    super();
    this.nodes = [];
  }

  add(component) {
    this.nodes.push(component);
  }

  remove(component) {
    console.warn(
      `[SequentialWorkflow] remove() 메서드는 설계 모드에서 구현되지 않았습니다.`
    );
    // 실제 구현에서는 this.nodes 배열에서 component를 제거하는 로직이 필요합니다.
    // 예: this.nodes = this.nodes.filter(n => n !== component);
  }

  /**
   * 순차적으로 노드들을 실행하고, 각 노드의 실행 결과를 핸들러 체인에 전달합니다.
   * 핸들러 체인이 워크플로우 중단을 지시하면, 즉시 실행을 중단합니다.
   *
   * @param {IWorkflowExecutionHandler} [executionHandlerChain=null] - 노드 실행 결과를 처리할 핸들러 체인
   * @returns {boolean} 워크플로우가 성공적으로 완료되었으면 true, 중간에 중단되었으면 false
   */
  execute(executionHandlerChain = null) {
    console.log(`\n--- [SequentialWorkflow] 순차 워크플로우 실행 시작 ---`);

    // 유효한 핸들러 체인이 전달되었는지 확인 (옵션)
    if (
      executionHandlerChain &&
      !(executionHandlerChain instanceof IWorkflowExecutionHandler)
    ) {
      console.warn(
        "[SequentialWorkflow] 유효하지 않은 핸들러 체인이 전달되었습니다."
      );
      executionHandlerChain = null; // 무효한 체인은 사용하지 않음
    }

    for (const node of this.nodes) {
      let nodeExecutionResult = {
        success: false,
        message: "Node did not return a result.",
        error: null,
      };
      let chainResult = { terminateWorkflow: false }; // 핸들러 체인의 결과 초기화

      try {
        // 각 노드의 execute() 메서드를 호출하고, 그 결과를 받습니다.
        // WorkflowComponent.js 수정에 따라 이제 execute()는 결과 객체를 반환해야 합니다.
        nodeExecutionResult = node.execute({
          executionHandlerChain: executionHandlerChain,
        }); // 노드에 체인 전달 (선택적)
        if (
          typeof nodeExecutionResult.success === "undefined" ||
          nodeExecutionResult === null
        ) {
          // 노드가 예상된 결과 객체를 반환하지 않았을 경우 기본값 설정
          nodeExecutionResult = {
            success: true,
            message: `Node '${node.constructor.name}' executed but returned no explicit result. Assuming success.`,
            error: null,
          };
        }
      } catch (error) {
        // 노드 실행 중 예외가 발생한 경우, 실패 결과로 처리합니다.
        nodeExecutionResult = {
          success: false,
          message: `노드 '${node.constructor.name}' 실행 중 예외 발생: ${error.message}`,
          error: error,
        };
      }

      // 노드의 실행 결과를 핸들러 체인에 전달합니다.
      if (executionHandlerChain) {
        chainResult = executionHandlerChain.handle(node, nodeExecutionResult);
      }

      // 핸들러 체인이 워크플로우 중단을 지시했는지 확인합니다.
      // 또는 현재 노드 자체가 실패했고 (terminateWorkflow가 true일 가능성이 높지만)
      // 명시적으로 중단을 원하는 경우 추가 조건을 둘 수 있습니다.
      if (chainResult.terminateWorkflow) {
        console.error(
          `[SequentialWorkflow] 핸들러 체인에 의해 워크플로우 중단됨. 원인: ${
            chainResult.message || "알 수 없음"
          }`
        );
        return false; // 워크플로우 실패로 간주하고 종료
      }
    }

    console.log(`--- [SequentialWorkflow] 순차 워크플로우 실행 완료 ---\n`);
    return true; // 모든 노드가 성공적으로 실행되었음을 나타냅니다.
  }
}

module.exports = SequentialWorkflow;
