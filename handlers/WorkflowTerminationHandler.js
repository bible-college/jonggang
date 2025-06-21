// src/handlers/WorkflowTerminationHandler.js
const IWorkflowExecutionHandler = require("../handlers/IWorkflowExecutionHandler"); // 인터페이스 파일 경로

/**
 * @class WorkflowTerminationHandler
 * 워크플로우 노드 실행이 실패했을 때 워크플로우의 추가 진행을 중단시키는 핸들러.
 * 체인 오브 리스폰서빌리티 패턴의 Concrete Handler 역할을 합니다.
 */
class WorkflowTerminationHandler extends IWorkflowExecutionHandler {
  constructor() {
    super(); // 부모 클래스(IWorkflowExecutionHandler)의 생성자 호출
    this.nextHandler = null; // 다음 핸들러를 저장할 속성
  }

  /**
   * 체인의 다음 핸들러를 설정합니다.
   * @param {IWorkflowExecutionHandler} handler - 체인의 다음 핸들러
   * @returns {IWorkflowExecutionHandler} 설정된 다음 핸들러 (체이닝을 위해)
   */
  setNext(handler) {
    this.nextHandler = handler;
    return handler; // 다음 핸들러 객체를 반환하여 체이닝 가능하게 함
  }

  /**
   * 노드의 실행 결과를 처리하고, 실패 시 워크플로우 중단 신호를 반환합니다.
   * @param {WorkflowComponent} node - 실행된 워크플로우 노드
   * @param {{success: boolean, message: string, error?: Error}} executionResult - 노드의 실행 결과 객체
   * @returns {{terminateWorkflow?: boolean}} - 워크플로우 중단 여부를 포함하는 처리 결과
   */
  handle(node, executionResult) {
    if (!executionResult.success) {
      console.error(
        `[WORKFLOW TERMINATION] 노드 '${node.constructor.name}' 실행 실패로 워크플로우 중단 지시.`
      );
      // 실패했을 경우, 워크플로우 중단 신호를 반환합니다.
      // 이 시점에서 다음 핸들러로 요청을 전달하지 않고, 워크플로우 중단을 의미하는 특정 값을 반환합니다.
      return {
        terminateWorkflow: true,
        message: `워크플로우 중단: 노드 ${node.constructor.name} 실패.`,
      };
    }

    // 노드 실행이 성공했다면, 다음 핸들러가 존재하는지 확인하고 책임을 전달합니다.
    if (this.nextHandler) {
      return this.nextHandler.handle(node, executionResult);
    }

    // 체인의 마지막이고 성공했다면, 중단 플래그 없이 성공을 의미하는 결과를 반환합니다.
    return {
      terminateWorkflow: false,
      message: `노드 ${node.constructor.name} 성공. 워크플로우 계속 진행.`,
    };
  }
}

module.exports = WorkflowTerminationHandler;
