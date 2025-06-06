// src/nodes/builders/NotionPageCreateBuilder.js
const NotionPageCreateNode = require('../actions/notion/NotionPageCreateNode');

/**
 * @class NotionPageCreateBuilder
 * Notion 페이지 생성 노드(NotionPageCreateNode)를 단계적으로 구성하는 빌더 클래스.
 */
class NotionPageCreateBuilder {
    constructor() {
        this.pageTitle = null;
        this.content = null;
        // 필요에 따라 Notion 페이지의 다른 속성 (parent, properties 등) 추가 가능
    }

    setTitle(title) {
        this.pageTitle = title;
        return this;
    }

    setContent(content) {
        this.content = content;
        return this;
    }

    build() {
        if (!this.pageTitle) {
            throw new Error("[NotionPageCreateBuilder] 페이지 제목은 필수입니다.");
        }
        return new NotionPageCreateNode(this.pageTitle, this.content);
    }
}

module.exports = NotionPageCreateBuilder;