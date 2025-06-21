
const WorkflowComponent = require('../../../core/WorkflowComponent');
const ICommand = require('../../../core/ICommand');

class NotionPageCreateReceiver {
    createPage(title, content) {
        console.log(`[NotionAPI - Receiver] Notion 페이지 생성: 제목 '${title}'`);

    }
}

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

// 기존: class NotionPageCreateNode extends WorkflowComponent {
// 수정:
class NotionPageCreateNode extends WorkflowComponent { // 직접 WorkflowComponent를 상속받습니다.
    constructor(nodeId, pageTitle, content = '') { // nodeId 인자 추가
        super(nodeId, `NotionPageCreateNode-${nodeId}`); // 부모 클래스(WorkflowComponent)의 생성자 호출
        this.pageTitle = pageTitle;
        this.content = content;

        this.receiver = new NotionPageCreateReceiver();
        this.command = new NotionPageCreateCommand(this.receiver, pageTitle, content);
    }

    // 기존 execute() 메서드를 doExecute()로 변경하고 노드의 핵심 로직을 여기에 넣습니다.
    doExecute(context) { // context 인자 추가
        console.log(`[NotionPageCreateNode] 노드 작업 실행: 내부 커맨드 호출 준비.`);
        this.command.execute(); // 실제 Notion 페이지 생성 커맨드 실행
        console.log(`[NotionPageCreateNode] 노드 작업 실행 완료.`);
        // 이 메서드가 반환하는 값은 NodeExecutionResult의 payload가 됩니다.
        return { pageCreated: true, title: this.pageTitle }; // 작업 결과 반환
    }

    // execute() 메서드는 부모인 WorkflowComponent에 의해 제공되므로 여기서 더 이상 구현하지 않습니다.
    // 기존 execute() 메서드는 다음과 같았음 (이제 필요 없음):
    // execute() {
    //     console.log(`[NotionPageCreateNode] 노드 실행: 내부 커맨드 호출 준비.`);
    //     this.command.execute();
    //     console.log(`[NotionPageCreateNode] 노드 실행 완료.`);
    //     return true;
    // }
}

module.exports = NotionPageCreateNode;