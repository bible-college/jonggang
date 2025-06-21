// src/nodes/builders/youtube/YouTubeLikeTriggerBuilder.js
const YouTubeLikeTriggerNode = require("../../triggers/YouTube/YouTubeLikeTriggerNode");

/**
 * @class YouTubeLikeTriggerBuilder
 * YouTubeLikeTriggerNode를 생성하기 위한 빌더 클래스.
 * 빌더 패턴의 Concrete Builder 역할을 합니다.
 */
class YouTubeLikeTriggerBuilder {
  constructor() {
    this.videoId = "";
  }

  /**
   * 감시할 YouTube 비디오 ID를 설정합니다.
   * @param {string} videoId - YouTube 비디오 ID
   * @returns {YouTubeLikeTriggerBuilder} 체이닝을 위한 빌더 인스턴스
   */
  setVideoId(videoId) {
    this.videoId = videoId;
    return this;
  }

  /**
   * 설정된 값으로 YouTubeLikeTriggerNode 인스턴스를 빌드합니다.
   * @returns {YouTubeLikeTriggerNode} 새로 생성된 YouTubeLikeTriggerNode 인스턴스
   */
  build() {
    return new YouTubeLikeTriggerNode(this.videoId);
  }
}

module.exports = YouTubeLikeTriggerBuilder;
