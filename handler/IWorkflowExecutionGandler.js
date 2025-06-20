// src/core/IWorkflowExecutionHandler.js (새로 생성)
/**
 * @interface IWorkflowExecutionHandler
 * 워크플로우 실행 결과를 처리하는 핸들러를 위한 인터페이스.
 * 체인 오브 리스폰서빌리티 패턴의 Handler 역할을 합니다.
 */
class IWorkflowExecutionHandler {
  /**
   * 체인의 다음 핸들러를 설정합니다.
   * @param {IWorkflowExecutionHandler} handler - 체인의 다음 핸들러
   * @returns {IWorkflowExecutionHandler} 설정된 다음 핸들러 (체이닝을 위해)
   */
  setNext(handler) {
    throw new Error(
      "Method 'setNext()' must be implemented by concrete handlers."
    );
  }

  /**
   * 노드의 실행 결과를 처리합니다.
   * 이 메서드는 구체적인 핸들러에서 구현되어야 합니다.
   *
   * @param {WorkflowComponent} node - 실행된 워크플로우 노드
   * @param {{success: boolean, message: string, error?: Error}} executionResult - 노드의 실행 결과 객체
   * @returns {{terminateWorkflow?: boolean}} - 워크플로우 중단 여부와 같은 처리 결과
   */
  handle(node, executionResult) {
    throw new Error(
      "Method 'handle()' must be implemented by concrete handlers."
    );
  }
}

module.exports = IWorkflowExecutionHandler;
