// src/nodes/actions/notion/NotionPageCreateNode.js

const WorkflowComponent = require('../../../core/WorkflowComponent'); // WorkflowComponent 경로 수정

class NotionPageCreateNode extends WorkflowComponent {
    // ID, 이름, 설명을 받지 않고, 채널과 메시지만 받습니다.
    constructor(title, content) {
        super(); // 부모 생성자 호출 (인자 없음)
        this.title = title;
        this.content = content;
    }

    execute() {
        // 유효성 검사 로직을 제거하여 순수하게 페이지 생성(시뮬레이션) 기능만 남깁니다.
        console.log(`[NotionPageCreateNode] 실행: 제목 '${this.title}'의 Notion 페이지 생성 시도.`);
        // 실제 Notion API 호출 로직은 없음.
        console.log(`[NotionPageCreateNode] (설계 모드) Notion 페이지 생성 완료 '추정'.`);
        return true; // 항상 성공으로 가정
    }
}

module.exports = NotionPageCreateNode;