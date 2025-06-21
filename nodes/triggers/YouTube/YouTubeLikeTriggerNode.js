// src/nodes/triggers/youtube/YouTubeLikeTriggerNode.js
const AbstractTriggerNode = require("../AbstractTriggerNode");
const YouTubeLikeTriggerStrategy = require("./YouTubeLikeTriggerStrategy");

/**
 * @class YouTubeLikeTriggerNode
 * 유튜브 '좋아요' 감지를 담당하는 트리거 노드.
 * 전략 패턴의 Context(문맥) 역할을 수행하며, 구체적인 감지 로직을 전략 객체에 위임합니다.
 * 또한, 컴포지트 패턴의 Leaf(리프) 노드로서 WorkflowComponent를 상속받습니다.
 * * 옵저버 패턴에서 Strategy에 대한 Observer 역할을 직접 구현합니다.
 */
class YouTubeLikeTriggerNode extends AbstractTriggerNode {
  constructor(videoId) {
    super();
    this.videoId = videoId;

    // **전략 패턴: Context가 구체적인 전략 객체를 생성하고 보관합니다.**
    this.strategy = new YouTubeLikeTriggerStrategy(videoId);

    // 전략에 자신을 옵저버로 등록
    // 이 노드가 전략의 옵저버 인터페이스를 구현하고, 전략이 notify를 호출하면 이 노드의 update가 실행됨
    this.strategy.attach(this);
  }

  /**
   * 옵저버로서 전략으로부터 알림을 받았을 때 호출되는 메서드.
   * 이 알림을 워크플로우 실행기(RunnerFacade)로 전달합니다.
   * @param {Object} payload - 전략에서 전달된 데이터
   */
  update(payload) {
    // Observer 인터페이스의 update 메서드 구현
    console.log(
      `[YouTubeLikeTriggerNode] 전략으로부터 'update' 알림 수신, 워크플로우로 전달.`
    );
    // AbstractTriggerNode의 update 메서드를 호출하여 triggerCallback이 처리하도록 위임
    super.update(payload);
  }

  /**
   * 유튜브 '좋아요' 감시 시작을 지시하고, 그 결과를 반환합니다.
   * @param {Object} [context={}] - 노드 실행에 필요한 컨텍스트 데이터
   * @returns {{success: boolean, message: string, error?: Error}} 작업 성공 여부와 메시지, 에러를 포함하는 객체
   */
  execute(context = {}) {
    // WorkflowComponent의 execute 메서드 구현
    console.log(
      `[YouTubeLikeTriggerNode] 노드 실행 지시: 비디오 '${this.videoId}' 좋아요 감시 시작.`
    );
    try {
      // 실제 감시 시작 로직은 전략에 위임됩니다.
      // 여기서는 전략의 startMonitoring 메서드를 호출하여 감시를 시작합니다.
      this.strategy.startMonitoring();
      console.log(
        `[YouTubeLikeTriggerNode] 유튜브 좋아요 감시 시작 지시 성공.`
      );
      return {
        success: true,
        message: `YouTube 비디오 '${this.videoId}' 좋아요 감시 시작 지시 성공.`,
      };
    } catch (error) {
      console.error(
        `[YouTubeLikeTriggerNode] 유튜브 좋아요 감시 시작 지시 실패: ${error.message}`
      );
      return {
        success: false,
        message: `YouTube 비디오 '${this.videoId}' 좋아요 감시 시작 지시 실패: ${error.message}`,
        error: error,
      };
    }
  }
}

module.exports = YouTubeLikeTriggerNode;
