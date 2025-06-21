// src/nodes/builders/notion/NotionPageCreateBuilder.js
const NotionPageCreateNode = require("../notion/NotionPageCreateNode");

/**
 * @class NotionPageCreateNodeBuilder
 * NotionPageCreateNode를 생성하기 위한 빌더 클래스.
 * 빌더 패턴의 Concrete Builder 역할을 합니다.
 */
class NotionPageCreateNodeBuilder {
  constructor() {
    this.title = "";
    this.content = "";
  }

  /**
   * Notion 페이지 제목을 설정합니다.
   * @param {string} title - 페이지 제목
   * @returns {NotionPageCreateNodeBuilder} 체이닝을 위한 빌더 인스턴스
   */
  setTitle(title) {
    this.title = title;
    return this;
  }

  /**
   * Notion 페이지 내용을 설정합니다.
   * @param {string} content - 페이지 내용
   * @returns {NotionPageCreateNodeBuilder} 체이닝을 위한 빌더 인스턴스
   */
  setContent(content) {
    this.content = content;
    return this;
  }

  /**
   * 설정된 값으로 NotionPageCreateNode 인스턴스를 빌드합니다.
   * @returns {NotionPageCreateNode} 새로 생성된 NotionPageCreateNode 인스턴스
   */
  build() {
    return new NotionPageCreateNode(this.title, this.content);
  }
}

module.exports = NotionPageCreateNodeBuilder;
