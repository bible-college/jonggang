// src/nodes/actions/notion/NotionPageCreateNode.js
const WorkflowComponent = require('../../../core/WorkflowComponent');

/**
 * @class NotionPageCreateNode
 * Notion 페이지를 생성하는 액션 노드 (리프 노드).
 */
class NotionPageCreateNode extends WorkflowComponent {
    constructor(pageTitle, content) {
        super();
        this.pageTitle = pageTitle;
        this.content = content;
    }

    execute() {
        console.log(`[NotionPageCreateNode] 실행: "${this.pageTitle}" 제목으로 Notion 페이지 생성. 내용: "${this.content || '(내용 없음)'}"`);
        // 실제 Notion API (pages.create 등) 호출 로직
        if (!this.pageTitle) {
            console.error("[NotionPageCreateNode] 오류: 페이지 제목이 유효하지 않습니다.");
            return false;
        }
        return true; // 성공 가정
    }
}

module.exports = NotionPageCreateNode;