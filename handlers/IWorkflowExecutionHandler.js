// src/core/IWorkflowExecutionHandler.js
/**
 * @interface IWorkflowExecutionHandler
 * 체인 오브 리스폰서빌리티 패턴에서 핸들러가 구현해야 할 인터페이스.
 * 모든 구체적인 핸들러는 이 인터페이스를 구현해야 합니다.
 */
class IWorkflowExecutionHandler {
  constructor() {
    if (new.target === IWorkflowExecutionHandler) {
      throw new TypeError(
        "Interface 'IWorkflowExecutionHandler' cannot be instantiated directly."
      );
    }
  }

  /**
   * 체인의 다음 핸들러를 설정합니다.
   * @abstract
   * @param {IWorkflowExecutionHandler} handler - 체인의 다음 핸들러
   * @returns {IWorkflowExecutionHandler} 설정된 다음 핸들러 (체이닝을 위해)
   */
  setNext(handler) {
    throw new Error('Method "setNext(handler)" must be implemented.');
  }

  /**
   * 워크플로우 노드의 실행 결과를 처리합니다.
   * @abstract
   * @param {WorkflowComponent} node - 실행된 워크플로우 노드
   * @param {{success: boolean, message: string, error?: Error}} executionResult - 노드의 실행 결과 객체
   * @returns {{terminateWorkflow?: boolean}} - 다음 핸들러의 처리 결과 또는 자체 처리 결과.
   * `terminateWorkflow: true`를 반환하면 워크플로우가 중단될 수 있음을 나타냅니다.
   */
  handle(node, executionResult) {
    throw new Error(
      'Method "handle(node, executionResult)" must be implemented.'
    );
  }
}

module.exports = IWorkflowExecutionHandler;
