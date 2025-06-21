// src/facade/WorkflowComposerFacade.js

const SequentialWorkflow = require("../composites/SequentialWorkflow");
const DefaultSlackNodeFactory = require("../../nodes/actions/slack/DefaultSlackNodeFactory");
const DefaultNotionNodeFactory = require("../../nodes/actions/notion/DefaultNotionNodeFactory");
const DefaultYouTubeNodeFactory = require("../triggers/YouTube/DefaultYouTubeNodeFactory"); // YouTube 팩토리 임포트

/**
 * @class WorkflowComposerFacade
 * 복잡한 워크플로우 구성 과정을 단순화하는 퍼사드 클래스.
 * 빌더 패턴과 팩토리 패턴을 사용하여 노드를 생성하고, 컴포지트 패턴을 사용하여 워크플로우를 구성합니다.
 */
class WorkflowComposerFacade {
  constructor() {
    this.slackFactory = new DefaultSlackNodeFactory();
    this.notionFactory = new DefaultNotionNodeFactory();
    this.youtubeFactory = new DefaultYouTubeNodeFactory(); // YouTube 팩토리 인스턴스 생성
    this.currentWorkflow = null;
  }

  /**
   * 새로운 순차 워크플로우 구성을 시작합니다.
   * @returns {WorkflowComposerFacade} 체이닝을 위한 현재 인스턴스
   */
  startNewWorkflow() {
    this.currentWorkflow = new SequentialWorkflow();
    return this;
  }

  /**
   * Slack 메시지 전송 노드를 현재 워크플로우에 추가합니다.
   * @param {string} channel - 메시지를 전송할 Slack 채널
   * @param {string} message - 전송할 메시지 내용
   * @returns {WorkflowComposerFacade} 체이닝을 위한 현재 인스턴스
   */
  addSlackMessageNode(channel, message) {
    const slackMessageNode = this.slackFactory
      .createMessageBuilder()
      .setChannel(channel)
      .setMessage(message)
      .build();
    this.currentWorkflow.add(slackMessageNode);
    return this;
  }

  /**
   * Slack 채널 읽기 노드를 현재 워크플로우에 추가합니다.
   * (예시용, 실제 기능은 불필요시 제거 가능)
   * @param {string} channelId - 읽을 Slack 채널 ID
   * @returns {WorkflowComposerFacade} 체이닝을 위한 현재 인스턴스
   */
  addSlackReadChannelNode(channelId) {
    const slackReadNode = this.slackFactory
      .createReadChannelBuilder()
      .setChannelId(channelId)
      .build();
    this.currentWorkflow.add(slackReadNode);
    return this;
  }

  /**
   * Notion 페이지 생성 노드를 현재 워크플로우에 추가합니다.
   * @param {string} pageTitle - 생성할 Notion 페이지의 제목
   * @param {string} [content=''] - Notion 페이지의 초기 내용
   * @returns {WorkflowComposerFacade} 체이닝을 위한 현재 인스턴스
   */
  addNotionPageCreateNode(pageTitle, content = "") {
    const notionPageNode = this.notionFactory
      .createPageCreateBuilder()
      .setTitle(pageTitle)
      .setContent(content)
      .build();
    this.currentWorkflow.add(notionPageNode);
    return this;
  }

  /**
   * YouTube '좋아요' 트리거 노드를 현재 워크플로우에 추가합니다.
   * @param {string} videoId - 감시할 YouTube 비디오 ID
   * @returns {WorkflowComposerFacade} 체이닝을 위한 현재 인스턴스
   */
  addYouTubeLikeTriggerNode(videoId) {
    const youtubeTrigger = this.youtubeFactory
      .createLikeTriggerBuilder() // 팩토리에서 빌더 생성
      .setVideoId(videoId)
      .build();
    this.currentWorkflow.add(youtubeTrigger);
    return this;
  }

  /**
   * 현재 구성 중인 워크플로우를 빌드하고 반환합니다.
   * @returns {SequentialWorkflow} 빌드된 워크플로우
   * @throws {Error} 구성 중인 워크플로우가 없을 경우
   */
  build() {
    if (!this.currentWorkflow) {
      throw new Error(
        "워크플로우를 시작하려면 먼저 startNewWorkflow()를 호출해야 합니다."
      );
    }
    const builtWorkflow = this.currentWorkflow;
    this.currentWorkflow = null; // 빌드 후 워크플로우 초기화 (새로운 워크플로우를 만들 준비)
    return builtWorkflow;
  }
}

module.exports = WorkflowComposerFacade;
