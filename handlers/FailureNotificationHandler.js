// src/handlers/FailureNotificationHandler.js
const IWorkflowExecutionHandler = require("../handlers/IWorkflowExecutionHandler"); // 인터페이스 파일 경로

/**
 * @class FailureNotificationHandler
 * 워크플로우 노드 실행이 실패했을 때 알림을 발생시키는 핸들러.
 * 체인 오브 리스폰서빌리티 패턴의 Concrete Handler 역할을 합니다.
 */
class FailureNotificationHandler extends IWorkflowExecutionHandler {
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
   * 노드의 실행 결과를 처리하고, 실패 시 알림을 발생시킵니다.
   * @param {WorkflowComponent} node - 실행된 워크플로우 노드
   * @param {{success: boolean, message: string, error?: Error}} executionResult - 노드의 실행 결과 객체
   * @returns {{terminateWorkflow?: boolean}} - 다음 핸들러의 처리 결과 또는 자체 처리 결과
   */
  handle(node, executionResult) {
    if (!executionResult.success) {
      // 노드 실행이 실패했을 경우에만 알림
      console.warn(
        `[NOTIFICATION] 노드 '${node.constructor.name}' 실행 실패! 사용자에게 알림 필요: ${executionResult.message}`
      );
      // 여기에 실제 알림 로직 (예: 이메일 전송, Slack 메시지 전송 등)이 추가될 수 있습니다.
    }

    // 다음 핸들러가 존재하면 요청을 다음 핸들러로 전달합니다.
    if (this.nextHandler) {
      return this.nextHandler.handle(node, executionResult);
    }

    // 더 이상 처리할 핸들러가 없으면 최종 실행 결과를 반환합니다.
    return { terminateWorkflow: !executionResult.success };
  }
}

module.exports = FailureNotificationHandler;
