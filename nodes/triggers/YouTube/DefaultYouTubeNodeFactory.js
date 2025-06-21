// src/nodes/factories/DefaultYouTubeNodeFactory.js
const AbstractNodeFactory = require("../../../core/AbstractNodeFactory");
const YouTubeLikeTriggerBuilder = require("../YouTube/YouTubeLikeTriggerBuilder"); // YouTubeLikeTriggerBuilder 경로

/**
 * @class DefaultYouTubeNodeFactory
 * YouTube 서비스와 관련된 노드 빌더를 생성하는 구체적인 팩토리.
 */
class DefaultYouTubeNodeFactory extends AbstractNodeFactory {
  constructor() {
    super("YouTube");
  }

  /**
   * YouTube 좋아요 트리거 빌더를 생성합니다.
   * @returns {YouTubeLikeTriggerBuilder} YouTube 좋아요 트리거 빌더 인스턴스
   */
  createLikeTriggerBuilder() {
    return new YouTubeLikeTriggerBuilder();
  }
}

module.exports = DefaultYouTubeNodeFactory;
