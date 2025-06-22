
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand');


class NotionPageCreateReceiver {
    createPage(title, content) {
        console.log(`[NotionAPI - Receiver] Notion 페이지 생성: 제목 '${title}'`);
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
class NotionPageCreateNode extends Node {

    constructor(pageTitle, content = '') {
        super();
        this.pageTitle = pageTitle;
        this.content = content;

        this.receiver = new NotionPageCreateReceiver();
        this.command = new NotionPageCreateCommand(this.receiver, pageTitle, content);
    }

    execute(context = {}) {
        console.log(`[NotionPageCreateNode] 노드 실행: 내부 커맨드 호출 준비.`);
        this.command.execute();
        console.log(`[NotionPageCreateNode] 노드 실행 완료.`);
        return { ...context, notionPageCreated: true, createdPageTitle: this.pageTitle };
    }
}

module.exports = NotionPageCreateNode;