
const WorkflowComponent = require('../../../core/WorkflowComponent');
const ICommand = require('../../../core/ICommand');

class SlackMessageReceiver {
    sendMessage(channel, message) {
        console.log(`[SlackAPI - Receiver] Slack 메시지 전송: 채널 '${channel}', 메시지 '${message}'`);
    }
}

class SlackMessageCommand extends ICommand {
    constructor(receiver, channel, message) {
        super();
        this.receiver = receiver;
        this.channel = channel;
        this.message = message;
    }

    execute() {
        console.log(`[SlackMessageCommand] 커맨드 실행: Slack 메시지 준비`);
        this.receiver.sendMessage(this.channel, this.message);
        console.log(`[SlackMessageCommand] 커맨드 실행 완료.`);
    }
}

// 기존: class SlackMessageNode extends WorkflowComponent {
// 수정:
class SlackMessageNode extends WorkflowComponent { // 직접 WorkflowComponent를 상속받습니다.
    constructor(nodeId, channel, message) { // nodeId 인자 추가
        super(nodeId, `SlackMessageNode-${nodeId}`); // 부모 클래스(WorkflowComponent)의 생성자 호출
        this.channel = channel;
        this.message = message;

        this.receiver = new SlackMessageReceiver();
        this.command = new SlackMessageCommand(this.receiver, channel, message);
    }

    // 기존 execute() 메서드를 doExecute()로 변경하고 노드의 핵심 로직을 여기에 넣습니다.
    doExecute(context) { // context 인자 추가
        console.log(`[SlackMessageNode] 노드 작업 실행: 내부 커맨드 호출 준비.`);
        this.command.execute(); // 실제 Slack 메시지 전송 커맨드 실행
        console.log(`[SlackMessageNode] 노드 작업 실행 완료.`);
        // 이 메서드가 반환하는 값은 NodeExecutionResult의 payload가 됩니다.
        return { messageSent: true, channel: this.channel, message: this.message }; 
    }

    // execute() 메서드는 부모인 WorkflowComponent에 의해 제공되므로 여기서 더 이상 구현하지 않습니다.
    // 기존 execute() 메서드는 다음과 같았음 (이제 필요 없음):
    // execute() {
    //     console.log(`[SlackMessageNode] 노드 실행: 내부 커맨드 호출 준비.`);
    //     this.command.execute();
    //     console.log(`[SlackMessageNode] 노드 실행 완료.`);
    //     return true;
    // }
}

module.exports = SlackMessageNode;