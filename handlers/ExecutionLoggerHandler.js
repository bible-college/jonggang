// src/handlers/ExecutionLoggerHandler.js
const IWorkflowExecutionHandler = require("../handlers/IWorkflowExecutionHandler"); // 인터페이스 파일 경로

/**
 * @class ExecutionLoggerHandler
 * 워크플로우 노드의 실행 성공/실패 여부를 콘솔에 로깅하는 핸들러.
 * 체인 오브 리스폰서빌리티 패턴의 Concrete Handler 역할을 합니다.
 */
class ExecutionLoggerHandler extends IWorkflowExecutionHandler {
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
   * 노드의 실행 결과를 로깅합니다.
   * @param {WorkflowComponent} node - 실행된 워크플로우 노드
   * @param {{success: boolean, message: string, error?: Error}} executionResult - 노드의 실행 결과 객체
   * @returns {{terminateWorkflow?: boolean}} - 다음 핸들러의 처리 결과 또는 자체 처리 결과
   */
  handle(node, executionResult) {
    if (executionResult.success) {
      console.log(`[EXECUTION LOG] 노드 '${node.constructor.name}' 실행 성공.`);
    } else {
      console.error(
        `[EXECUTION LOG] 노드 '${node.constructor.name}' 실행 실패: ${executionResult.message}`
      );
      if (executionResult.error) {
        console.error(`[EXECUTION LOG] 에러 상세:`, executionResult.error);
      }
    }

    // 다음 핸들러가 존재하면 요청을 다음 핸들러로 전달합니다.
    if (this.nextHandler) {
      return this.nextHandler.handle(node, executionResult);
    }

    // 더 이상 처리할 핸들러가 없으면 최종 실행 결과를 반환합니다.
    // 여기서는 워크플로우 중단 여부와 같은 추가적인 정보를 반환할 수 있습니다.
    return { terminateWorkflow: !executionResult.success }; // 단순히 실패하면 중단하도록 임시 설정
  }
}

module.exports = ExecutionLoggerHandler;
