// src/nodes/actions/notion/NotionPageCreateNode.js
const WorkflowComponent = require("../../../core/WorkflowComponent");
const ICommand = require("../../../core/ICommand");

// Notion 페이지 생성 로직의 실제 수신자 (Receiver) 역할
// 비동기 로직 제거, 동기적으로 동작하는 것처럼 수정
class NotionPageCreateReceiver {
  createPage(title, content) {
    console.log(`[NotionAPI - Receiver] Notion 페이지 생성: 제목 '${title}'`);
    // 실제 Notion API 호출 로직은 없음. 개념만 전달.
    // 여기서 실제 Notion API 호출이 실패했다고 가정하고 예외를 발생시킬 수 있습니다.
    // 예를 들어, Math.random() < 0.5 와 같은 조건을 추가하여 50% 확률로 실패를 시뮬레이션할 수 있습니다.
    // if (Math.random() < 0.5) {
    //     throw new Error("Notion API 일시적 오류 발생!");
    // }
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
    console.log(
      `[NotionPageCreateCommand] 커맨드 실행: Notion 페이지 생성 준비`
    );
    this.receiver.createPage(this.title, this.content); // Receiver의 작업 실행
    console.log(`[NotionPageCreateCommand] 커맨드 실행 완료.`);
  }
}

/**
 * @class NotionPageCreateNode
 * Notion 페이지 생성 노드.
 * 컴포지트 패턴의 리프 노드 역할과, 내부적으로 커맨드 패턴을 활용합니다.
 */
class NotionPageCreateNode extends WorkflowComponent {
  constructor(pageTitle, content = "") {
    super();
    this.pageTitle = pageTitle;
    this.content = content;

    this.receiver = new NotionPageCreateReceiver();
    this.command = new NotionPageCreateCommand(
      this.receiver,
      this.pageTitle,
      this.content
    );
  }

  /**
   * Notion 페이지 생성 작업을 실행하고, 그 결과를 반환합니다.
   * @param {Object} [context={}] - 노드 실행에 필요한 컨텍스트 데이터
   * @returns {{success: boolean, message: string, error?: Error}} 작업 성공 여부와 메시지, 에러를 포함하는 객체
   */
  execute(context = {}) {
    // WorkflowComponent의 execute 메서드 구현
    console.log(
      `[NotionPageCreateNode] 노드 실행: Notion 페이지 생성 작업을 커맨드에 위임.`
    );
    try {
      this.command.execute(); // 커맨드 실행 (성공 또는 실패 발생 가능)
      console.log(`[NotionPageCreateNode] Notion 페이지 생성 성공.`);
      return {
        success: true,
        message: `Notion 페이지 '${this.pageTitle}' 생성 성공.`,
      };
    } catch (error) {
      console.error(
        `[NotionPageCreateNode] Notion 페이지 생성 실패: ${error.message}`
      );
      // 실제 Notion API 실패 로직을 여기에 추가합니다.
      return {
        success: false,
        message: `Notion 페이지 '${this.pageTitle}' 생성 실패: ${error.message}`,
        error: error,
      };
    }
  }
}

module.exports = NotionPageCreateNode;
