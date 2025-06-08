// src/nodes/actions/notion/NotionPageCreateNode.js (수정)
const WorkflowComponent = require('../../../core/WorkflowComponent');
const ICommand = require('../../../core/ICommand');

// Notion 페이지 생성 로직의 실제 수신자 (Receiver) 역할
// 비동기 로직 제거, 동기적으로 동작하는 것처럼 수정
class NotionPageCreateReceiver {
    createPage(title, content) {
        console.log(`[NotionAPI - Receiver] Notion 페이지 생성: 제목 '${title}'`);
        // 실제 Notion API 호출 로직은 없음. 개념만 전달.
    }
}

// Notion 페이지 생성 커맨드 (Concrete Command)
class NotionPageCreateCommand extends ICommand {
    constructor(receiver, title, content) {
        super();
        this.receiver = receiver;
        this.title = title;
        this.content = content;
    }

    execute() {
        console.log(`[NotionPageCreateCommand] 커맨드 실행: Notion 페이지 생성 준비`);
        this.receiver.createPage(this.title, this.content);
        console.log(`[NotionPageCreateCommand] 커맨드 실행 완료.`);
    }
}

/**
 * @class NotionPageCreateNode
 * Notion 페이지 생성 노드.
 * 컴포지트 패턴의 리프 노드 역할과, 내부적으로 커맨드 패턴을 활용합니다.
 */
class NotionPageCreateNode extends WorkflowComponent {
    // id, name, description은 더 이상 생성자에서 받지 않음
    constructor(pageTitle, content = '') {
        super();
        // this.id = id; // 제거
        // this.name = name; // 제거
        // this.description = description; // 제거
        this.pageTitle = pageTitle;
        this.content = content;

        this.receiver = new NotionPageCreateReceiver();
        this.command = new NotionPageCreateCommand(this.receiver, pageTitle, content);
    }

    execute() {
        console.log(`[NotionPageCreateNode] 노드 실행: 내부 커맨드 호출 준비.`);
        this.command.execute();
        console.log(`[NotionPageCreateNode] 노드 실행 완료.`);
        return true;
    }
}

module.exports = NotionPageCreateNode;