// src/core/WorkflowComponent.js (수정)
/**
 * @abstract
 * 모든 워크플로우 구성 요소(리프 노드, 복합 노드)가 구현해야 할 기본 인터페이스.
 * 컴포지트 패턴의 Component 역할을 하며, 커맨드 패턴의 Command 역할도 겸합니다.
 */
class WorkflowComponent {
  /**
   * 이 컴포넌트가 수행할 작업을 실행합니다.
   * 모든 구체적인 노드와 복합 워크플로우는 이 메서드를 구현해야 합니다.
   *
   * @param {Object} [context={}] - 노드 실행에 필요한 컨텍스트 데이터 (예: 체인 오브 리스폰서빌리티 핸들러)
   * @returns {{success: boolean, message: string, error?: Error}} 작업 성공 여부와 메시지, 에러를 포함하는 객체
   */
  execute(context = {}) {
    // execute() 메서드는 각 구체적인 하위 클래스에서 구현되어야 하며,
    // 실행 결과를 { success: boolean, message: string, error?: Error } 형태로 반환해야 합니다.
    // 여기서는 추상 메서드임을 명시하는 용도로만 사용됩니다.
    throw new Error(
      "execute() must be implemented by concrete components and return an execution result object."
    );
  }

  /**
   * 자식 컴포넌트를 추가합니다. 리프 노드에서는 지원되지 않습니다.
   * @param {WorkflowComponent} component - 추가할 자식 컴포넌트
   */
  add(component) {
    throw new Error(`add() is not supported by ${this.constructor.name}.`);
  }

  /**
   * 자식 컴포넌트를 제거합니다. 리프 노드에서는 지원되지 않습니다.
   * @param {WorkflowComponent} component - 제거할 자식 컴포넌트
   */
  remove(component) {
    throw new Error(`remove() is not supported by ${this.constructor.name}.`);
  }
}

module.exports = WorkflowComponent;
