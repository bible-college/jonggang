// src/app.js

// ... (기존 임포트 유지)
const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade'); //
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade'); //
const Registry = require('./core/Registry'); //

// 레지스트리 패턴을 위해, 사용될 구현체 모듈들을 여기서 로드합니다.
// 이제 유튜브와 Gmail의 구체적인 구현체 대신, 일반적인 구현체를 로드합니다.
require('./core/implementations/LocalPollingImplementation'); // 새로운 일반 로컬 구현체
require('./core/implementations/CloudWebhookImplementation'); // 새로운 일반 클라우드 구현체

// Caretaker 및 SequentialWorkflow 임포트만 유지.
const WorkflowCaretaker = require('./core/WorkflowCaretaker'); //

// 시뮬레이션 헬퍼 함수를 전역 스코프로 이동
// payload 구조를 서비스별로 통합하여 시뮬레이션하도록 변경
const simulateEvent = (triggerNode, service, id, message) => {
    const payload = {
        timestamp: new Date().toISOString(), // 실제 시간 스탬프 사용
        service: service, //
        id: id, // videoId 또는 accountId
        message: message //
    };
    if (triggerNode && triggerNode.wrappedComponent && triggerNode.wrappedComponent.strategy) { //
        triggerNode.wrappedComponent.strategy.notify(payload); //
    } else {
        console.error("[app.js] 시뮬레이션 오류: 트리거 노드의 전략을 찾을 수 없습니다. 데코레이터 또는 노드 구조를 확인하세요."); //
    }
};
console.log("\n--- 메멘토 패턴 시연 (간소화 - 연속 빌드) ---\n"); //

const mementoRunner = new WorkflowRunnerFacade(); //
const caretaker = new WorkflowCaretaker(); //
const mementoComposer = new WorkflowComposerFacade(); // Memento 데모를 위한 전용 컴포저

// EventStore 인스턴스 가져오기 (이벤트 확인용)
const eventStore = mementoComposer.getEventStore(); //

let dynamicWorkflow; // 현재 작업 중인 워크플로우 인스턴스를 담을 변수
let currentTriggerNode = null; // 트리거 노드 참조를 위한 변수
const MEMENTO_TRIGGER_ID_GMAIL = 'gmail_account_123'; // M멘토 데모용 Gmail 트리거 ID
const MEMENTO_TRIGGER_ID_YOUTUBE = 'youtube_video_abc'; // M멘토 데모용 YouTube 트리거 ID
const SLACK_READ_CHANNEL_ID = 'general'; // 읽을 Slack 채널 ID (예시)


// 1단계: 초기 빈 워크플로우 시작 및 상태 저장
dynamicWorkflow = mementoComposer.startNewWorkflow().build(); //
caretaker.saveMemento(dynamicWorkflow.createMemento()); //
console.log("[메멘토] 초기 빈 워크플로우 상태 저장."); //


// 2단계: GmailTriggerNode 추가 (로컬 폴링 구현 사용) 및 상태 저장
// mementoComposer는 이전 상태의 워크플로우를 내부적으로 유지하고 있으므로, continueWorkflow 호출이 필요 없습니다.
mementoComposer.addYouTubeLikeTriggerNode(MEMENTO_TRIGGER_ID_YOUTUBE, 'local', 'immediate'); // 'cloud' 구현체 사용
// mementoComposer.addGmailTriggerNode(MEMENTO_TRIGGER_ID_GMAIL, 'local', 'immediate'); // 'local' 구현체 사용
dynamicWorkflow = mementoComposer.build(); // 변경된 워크플로우 인스턴스 반환
caretaker.saveMemento(dynamicWorkflow.createMemento()); //
console.log("[메멘토] Gmail 트리거 노드 (로컬 폴링) 추가 및 상태 저장."); //
currentTriggerNode = dynamicWorkflow.nodes[0]; // 데코레이터로 감싸진 트리거 노드


// 3단계: Slack 채널 읽기 노드 추가 및 상태 저장
mementoComposer.addSlackReadChannelNode(SLACK_READ_CHANNEL_ID); //
dynamicWorkflow = mementoComposer.build(); //
caretaker.saveMemento(dynamicWorkflow.createMemento()); //
console.log("[메멘토] Slack 채널 읽기 노드 추가 및 상태 저장."); //


// 4단계: Slack 메시지 노드 추가 및 상태 저장
mementoComposer.addSlackMessageNode('#dynamic-channel', '동적 워크플로우 Slack 메시지'); //
dynamicWorkflow = mementoComposer.build(); //
caretaker.saveMemento(dynamicWorkflow.createMemento()); //
console.log("[메멘토] Slack 메시지 노드 추가 및 상태 저장."); //


// 5단계: Notion 페이지 생성 노드 추가 및 상태 저장
mementoComposer.addNotionPageCreateNode('동적 Notion 페이지', '동적 워크플로우 Notion 내용'); //
dynamicWorkflow = mementoComposer.build(); //
caretaker.saveMemento(dynamicWorkflow.createMemento()); //
console.log("[메멘토] Notion 노드 추가 및 상태 저장."); //
// 참고: 여기서는 모든 노드가 WorkflowExecutionLoggerDecorator로 감싸져 있습니다.
console.log("-> 현재 워크플로우 노드 구성:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(' -> ')); //

// 최종 워크플로우 실행 시뮬레이션
console.log("\n--- 최종 워크플로우 실행 시뮬레이션 ---"); //
// 워크플로우 실행 시, 워크플로우의 ID를 initialContext에 넣어줍니다.
const workflowIdForRun = dynamicWorkflow.id || 'simulated-workflow-1'; // SequentialWorkflow에 ID를 추가했다면 dynamicWorkflow.id 사용
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdForRun }); //
// 변경된 simulateEvent 호출: 서비스와 ID를 전달
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_GMAIL, '최종 워크플로우 실행 - Gmail 이벤트'); //


// --- 롤백 시연 (한 번만) ---
console.log("\n--- 롤백 시연 시작 ---"); //

// Notion 노드 추가 이전 상태로 롤백
caretaker.getMemento(); // Notion 노드 추가 후의 상태 (4단계)를 스택에서 제거
const previousMemento = caretaker.getMemento(); // Slack 메시지 노드 추가 후의 상태 (3단계)를 가져옴

dynamicWorkflow.restoreFromMemento(previousMemento); //
console.log("[메멘토] Notion 노드 제거 후 롤백 완료."); //
console.log("-> 롤백 후 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(', ')); //

// 롤백된 상태의 워크플로우 실행 시뮬레이션
console.log("\n--- 롤백 후 워크플로우 실행 시뮬레이션 ---"); //
// 롤백 후 워크플로우 실행 시에도 워크플로우 ID를 전달합니다.
const workflowIdForRollback = dynamicWorkflow.id || 'simulated-workflow-2'; //
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdForRollback }); //
// 변경된 simulateEvent 호출: 서비스와 ID를 전달
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_GMAIL, '롤백 후 워크플로우 실행 - Gmail 이벤트'); //


// 최종 이벤트 저장소 내용 확인 (디버깅/테스트용)
console.log("\n--- 기록된 모든 이벤트 ---"); //
eventStore.getAllEvents().forEach(event => { //
    console.log(`[Event: ${event.type}] Node: ${event.nodeName}, Time: ${new Date(event.timestamp).toLocaleTimeString()}, `); //
}); //

console.log("\n--- 메멘토 패턴 시연 완료 ---"); //