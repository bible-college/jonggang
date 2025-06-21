// src/nodes/triggers/AbstractTriggerNode.js
const WorkflowComponent = require("../../core/WorkflowComponent");

/**
 * @abstract
 * 모든 트리거 노드가 구현해야 할 추상 클래스.
 * 컴포지트 패턴의 리프 노드 역할과, 옵저버 패턴의 Observer 역할을 겸합니다.
 * 또한, 워크플로우 실행기(RunnerFacade)와의 통신을 위한 콜백 등록 기능을 제공합니다.
 */
class AbstractTriggerNode extends WorkflowComponent {
  constructor() {
    super();
    if (new.target === AbstractTriggerNode) {
      throw new TypeError(
        "Abstract class 'AbstractTriggerNode' cannot be instantiated directly."
      );
    }

    this.workflowToExecute = null; // 트리거 발생 시 실행할 워크플로우 (RunnerFacade에 의해 설정됨)
    this.triggerCallback = null; // RunnerFacade가 등록할 콜백 함수
  }

  /**
   * 이 트리거 노드가 특정 이벤트 발생 시 실행할 워크플로우를 설정합니다.
   * @param {WorkflowComponent} workflow - 실행할 워크플로우 컴포넌트
   */
  setWorkflowToExecute(workflow) {
    this.workflowToExecute = workflow;
  }

  /**
   * RunnerFacade와 같은 외부 객체가 트리거 이벤트를 수신할 콜백 함수를 등록합니다.
   * @param {Function} listener - 트리거 이벤트 발생 시 호출될 콜백 함수
   */
  onTrigger(listener) {
    if (typeof listener !== "function") {
      throw new Error("Trigger listener must be a function.");
    }
    this.triggerCallback = listener;
    console.log(`[AbstractTriggerNode] 외부 트리거 리스너 등록됨.`);
  }

  /**
   * 워크플로우 컴포넌트로서의 execute 메서드.
   * 트리거 노드에게는 주로 "감시 시작"을 의미합니다.
   * @abstract
   * @param {Object} [context={}] - 노드 실행에 필요한 컨텍스트 데이터
   * @returns {{success: boolean, message: string, error?: Error}} 작업 성공 여부와 메시지, 에러를 포함하는 객체
   */
  execute(context = {}) {
    throw new Error(
      "Method 'execute(context)' must be implemented by concrete trigger nodes."
    );
  }

  /**
   * 옵저버로서 전략으로부터 알림을 받았을 때 호출되는 메서드.
   * 이 알림을 등록된 triggerCallback을 통해 RunnerFacade로 전달합니다.
   * @param {Object} payload - 전략에서 전달된 데이터
   */
  update(payload) {
    console.log(
      `[AbstractTriggerNode] 옵저버 업데이트 수신. payload: ${JSON.stringify(
        payload
      )}`
    );
    if (this.triggerCallback) {
      this.triggerCallback(payload);
    } else {
      console.warn(
        "[AbstractTriggerNode] 등록된 triggerCallback이 없어 이벤트를 처리할 수 없습니다."
      );
    }
  }
}

module.exports = AbstractTriggerNode;
