// src/core/WorkflowExecutor.js (수정)
const WorkflowComponent = require("./WorkflowComponent"); // WorkflowComponent import 추가
const ExecutionLoggerHandler = require("../handlers/ExecutionLoggerHandler");
const FailureNotificationHandler = require("../handlers/FailureNotificationHandler");
const WorkflowTerminationHandler = require("../handlers/WorkflowTerminationHandler");

/**
 * @class WorkflowExecutor
 * 주어진 워크플로우(WorkflowComponent)를 실행하는 역할을 담당합니다.
 * 커맨드 패턴의 인보커(Invoker) 역할을 하며, 체인 오브 리스폰서빌리티를 관리합니다.
 */
class WorkflowExecutor {
  constructor() {
    this.workflow = null; // 실행할 워크플로우 컴포넌트

    // 체인 오브 리스폰서빌리티 핸들러 체인 구성
    // 순서: 로깅 -> 실패 알림 -> 워크플로우 중단
    this.executionChain = new ExecutionLoggerHandler(); // 체인의 시작
    const failureNotifier = new FailureNotificationHandler();
    const terminator = new WorkflowTerminationHandler();

    // 핸들러들을 순서대로 연결합니다.
    this.executionChain
      .setNext(failureNotifier) // 로깅 다음에 실패 알림 연결
      .setNext(terminator); // 실패 알림 다음에 워크플로우 중단 연결
  }

  /**
   * 실행할 워크플로우를 설정합니다.
   * @param {WorkflowComponent} workflow - 실행할 워크플로우 컴포넌트 (주로 SequentialWorkflow)
   */
  setWorkflow(workflow) {
    this.workflow = workflow;
  }

  /**
   * 설정된 워크플로우를 실행합니다.
   * 이는 워크플로우 컴포넌트의 execute() 메서드를 호출하는 것으로,
   * 커맨드 객체(WorkflowComponent)의 execute()를 요청하는 인보커의 역할입니다.
   * 이때, 노드 실행 결과 처리를 위한 핸들러 체인을 워크플로우에 전달합니다.
   */
  runWorkflow() {
    if (this.workflow) {
      console.log(`[WorkflowExecutor] 워크플로우 실행 지시.`);
      // 워크플로우 컴포넌트(SequentialWorkflow)의 execute() 메서드를 호출하며,
      // 우리가 구성한 핸들러 체인을 인자로 전달합니다.
      // 이제 SequentialWorkflow 내부에서 각 노드 실행 후 이 핸들러 체인을 사용하게 됩니다.
      this.workflow.execute(this.executionChain);
    } else {
      console.warn(
        "[WorkflowExecutor] 실행할 워크플로우가 설정되지 않았습니다."
      );
    }
  }
}

module.exports = WorkflowExecutor;
