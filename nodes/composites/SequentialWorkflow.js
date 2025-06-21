// src/nodes/composites/SequentialWorkflow.js
const WorkflowComponent = require("../../core/WorkflowComponent");
const IWorkflowExecutionHandler = require("../../handlers/IWorkflowExecutionHandler"); // 핸들러 인터페이스 추가 (타입 힌트 목적)

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

  /**
   * 자식 노드를 워크플로우에 추가합니다.
   * @param {WorkflowComponent} component - 추가할 워크플로우 컴포넌트 (노드)
   */
  add(component) {
    this.nodes.push(component);
  }

  /**
   * 자식 노드를 워크플로우에서 제거합니다. (현재 구현에서는 간단히 경고만 출력)
   * @param {WorkflowComponent} component - 제거할 워크플로우 컴포넌트
   */
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
   * @returns {{success: boolean, message: string}} 워크플로우가 성공적으로 완료되었으면 true를 포함한 객체, 중간에 중단되었으면 false를 포함한 객체
   */
  execute(executionHandlerChain = null) {
    console.log(`\n--- [SequentialWorkflow] 순차 워크플로우 실행 시작 ---`);
    let overallSuccess = true;
    let overallMessage = "워크플로우 성공적으로 완료.";

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
      let chainResult = { terminateWorkflow: false, message: "" }; // 핸들러 체인의 결과 초기화

      try {
        // 각 노드의 execute() 메서드를 호출하고, 그 결과를 받습니다.
        // WorkflowComponent.js 수정에 따라 이제 execute()는 결과 객체를 반환해야 합니다.
        nodeExecutionResult = node.execute({
          executionHandlerChain: executionHandlerChain,
        }); // 노드에 체인 전달 (선택적)
        // execute() 결과가 예상된 객체 형태가 아닐 경우 처리
        if (
          typeof nodeExecutionResult !== "object" ||
          nodeExecutionResult === null ||
          typeof nodeExecutionResult.success === "undefined"
        ) {
          console.warn(
            `[SequentialWorkflow] 노드 '${node.constructor.name}'가 예상된 형식의 결과를 반환하지 않았습니다. 기본 성공으로 처리.`
          );
          nodeExecutionResult = {
            success: true,
            message: `Node '${node.constructor.name}' executed, but returned no explicit result. Assuming success.`,
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
      } else if (!nodeExecutionResult.success) {
        // 핸들러 체인이 없는데 노드가 실패했다면, 워크플로우를 중단합니다.
        overallSuccess = false;
        overallMessage = `워크플로우 중단: 핸들러 체인 없이 노드 '${node.constructor.name}' 실패.`;
        break; // 루프 중단
      }

      // 핸들러 체인이 워크플로우 중단을 지시했는지 확인합니다.
      if (chainResult.terminateWorkflow) {
        overallSuccess = false;
        overallMessage = `핸들러 체인에 의해 워크플로우 중단됨. 원인: ${
          chainResult.message || `노드 '${node.constructor.name}' 실패.`
        }`;
        console.error(`[SequentialWorkflow] ${overallMessage}`);
        break; // 루프 중단
      }
    }

    if (overallSuccess) {
      console.log(`--- [SequentialWorkflow] 순차 워크플로우 실행 완료 ---\n`);
    } else {
      console.log(`--- [SequentialWorkflow] 순차 워크플로우 실행 중단 ---\n`);
    }
    return { success: overallSuccess, message: overallMessage };
  }
}

module.exports = SequentialWorkflow;
