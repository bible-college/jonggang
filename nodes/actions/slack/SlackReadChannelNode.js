
const WorkflowComponent = require('../../../core/WorkflowComponent');
const ICommand = require('../../../core/ICommand');

class SlackReadChannelReceiver {
    readChannel(channelId) {
        console.log(`[SlackAPI - Receiver] Slack 채널 메시지 읽기: 채널 ID '${channelId}'`);
        return `[Mock Data] 메시지 목록 from channel ${channelId}`;
    }
}

class SlackReadChannelCommand extends ICommand {
    constructor(receiver, channelId) {
        super();
        this.receiver = receiver;
        this.channelId = channelId;
    }

    execute() {
        console.log(`[SlackReadChannelCommand] 커맨드 실행: Slack 채널 읽기 준비`);
        const result = this.receiver.readChannel(this.channelId); 
        console.log(`[SlackReadChannelCommand] 커맨드 실행 완료. 결과: ${result}`);
        return result;
    }
}

// 기존: class SlackReadChannelNode extends WorkflowComponent {
// 수정:
class SlackReadChannelNode extends WorkflowComponent { // 직접 WorkflowComponent를 상속받습니다.
    constructor(nodeId, channelId) { // nodeId 인자 추가
        super(nodeId, `SlackReadChannelNode-${nodeId}`); // 부모 클래스(WorkflowComponent)의 생성자 호출
        this.channelId = channelId;

        this.receiver = new SlackReadChannelReceiver();
        this.command = new SlackReadChannelCommand(this.receiver, channelId);
    }

    // 기존 execute() 메서드를 doExecute()로 변경하고 노드의 핵심 로직을 여기에 넣습니다.
    doExecute(context) { // context 인자 추가
        console.log(`[SlackReadChannelNode] 노드 작업 실행: 내부 커맨드 호출 준비.`);
        const result = this.command.execute(); // 실제 Slack 채널 읽기 커맨드 실행
        console.log(`[SlackReadChannelNode] 노드 작업 실행 완료.`);
        // 이 메서드가 반환하는 값은 NodeExecutionResult의 payload가 됩니다.
        return { messages: result, channelId: this.channelId }; // 작업 결과 반환
    }

    // execute() 메서드는 부모인 WorkflowComponent에 의해 제공되므로 여기서 더 이상 구현하지 않습니다.
    // 기존 execute() 메서드는 다음과 같았음 (이제 필요 없음):
    // execute() {
    //     console.log(`[SlackReadChannelNode] 노드 실행: 내부 커맨드 호출 준비.`);
    //     const result = this.command.execute();
    //     console.log(`[SlackReadChannelNode] 노드 실행 완료.`);
    //     return result;
    // }
}

module.exports = SlackReadChannelNode;