// src/app.js
// src/app.js

// ... (기존 임포트 유지)
const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade'); //
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade'); //
const Registry = require('./core/Registry'); //

// 레지스트리 패턴을 위해, 사용될 구현체 모듈들을 여기서 로드합니다.
// 이제 유튜브와 Gmail의 구체적인 구현체 대신, 일반적인 구현체를 로드합니다.
require('./core/implementations/LocalPollingImplementation'); // 새로운 일반 로컬 구현체
require('./core/implementations/CloudWebhookImplementation'); // 새로운 일반 클라우드 구현체

const WorkflowCaretaker = require('./core/WorkflowCaretaker');

const simulateEvent = (triggerNode, service, id, message) => {
    const payload = {
        timestamp: new Date().toISOString(),
        service: service,
        id: id,
        message: message
    };
    if (triggerNode && triggerNode.wrappedComponent && triggerNode.wrappedComponent.strategy) {
        triggerNode.wrappedComponent.strategy.notify(payload);
    } else {
        console.error("[app.js] 시뮬레이션 오류: 트리거 노드의 전략을 찾을 수 없습니다. 데코레이터 또는 노드 구조를 확인하세요.");
    }
};

console.log("\n--- 메멘토 패턴 시연 (간소화 - 연속 빌드) ---");

const mementoRunner = new WorkflowRunnerFacade();
const caretaker = new WorkflowCaretaker();
const mementoComposer = new WorkflowComposerFacade();
const eventStore = mementoComposer.getEventStore();

let dynamicWorkflow;
let currentTriggerNode = null;
// const MEMENTO_TRIGGER_ID_GMAIL = 'gmail_account_123';
const MEMENTO_TRIGGER_ID_YOUTUBE = 'youtube_video_abc';
const SLACK_READ_CHANNEL_ID = 'general';

// 1단계: 초기 빈 워크플로우 시작 및 상태 저장
dynamicWorkflow = mementoComposer.startNewWorkflow().build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] 초기 빈 워크플로우 상태 저장.");

// 2단계: YouTubeLikeTriggerNode 추가 (로컬 폴링 구현 사용) 및 상태 저장
currentTriggerNode = mementoComposer.addYouTubeLikeTriggerNode(MEMENTO_TRIGGER_ID_YOUTUBE, 'local'); // 이제 add 메서드가 노드를 직접 반환
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] YouTube 트리거 노드 (로컬 폴링) 추가 및 상태 저장.");

// --- 추가 시작 ---
// 2.5단계: YouTubeReadRecentLikedVideoNode 추가 및 상태 저장
// 이 노드는 트리거에서 받은 컨텍스트 정보(좋아요 비디오 ID)를 사용합니다.
let youtubeReadRecentLikedVideoNode = mementoComposer.addYouTubeReadRecentLikedVideoNode();
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] YouTube 최신 좋아요 받은 영상 읽기 노드 추가 및 상태 저장.");
// --- 추가 끝 ---



// 3단계: Slack 채널 읽기 노드 추가 및 상태 저장
let slackReadChannelNode = mementoComposer.addSlackReadChannelNode(SLACK_READ_CHANNEL_ID); // 노드 참조 저장
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] Slack 채널 읽기 노드 추가 및 상태 저장.");

// 4단계: Slack 메시지 노드 추가 및 상태 저장
let slackMessageNode = mementoComposer.addSlackMessageNode('#dynamic-channel', '동적 워크플로우 Slack 메시지'); // 노드 참조 저장
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] Slack 메시지 노드 추가 및 상태 저장.");

// 5단계: Notion 페이지 생성 노드 추가 및 상태 저장
let notionPageNode = mementoComposer.addNotionPageCreateNode('동적 Notion 페이지', '동적 워크플로우 Notion 내용'); // 노드 참조 저장
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento()); // 노션 추가 후 상태 저장
console.log("[메멘토] Notion 노드 추가 및 상태 저장.");

console.log("-> 현재 워크플로우 노드 구성:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(' -> '));

// 최종 워크플로우 실행 시뮬레이션 (노션 포함된 상태)
console.log("\n--- 최종 워크플로우 실행 시뮬레이션 (노션 포함) ---");
const workflowIdForRun = dynamicWorkflow.id || 'simulated-workflow-1';
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdForRun });
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_YOUTUBE, '최종 워크플로우 실행 - YouTube 이벤트');


// --- 특정 노드 삭제 시연 (노션 노드 삭제) ---
console.log("\n--- 특정 노드 삭제 시연 (노션 노드 삭제) ---");
console.log("-> 삭제 전 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(' -> '));

// Notion 노드를 직접 삭제합니다.
mementoComposer.removeNode(notionPageNode); // 저장해 둔 Notion 노드 참조를 사용하여 삭제
dynamicWorkflow = mementoComposer.build(); // 변경된 워크플로우 인스턴스 반영 (Optional but good practice)
caretaker.saveMemento(dynamicWorkflow.createMemento()); // 삭제 후 상태 저장
console.log("[메멘토] Notion 노드 제거 후 상태 저장.");
console.log("-> 삭제 후 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(' -> '));

// 삭제 후 워크플로우 실행 시뮬레이션 (노션 삭제된 상태)
console.log("\n--- 삭제 후 워크플로우 실행 시뮬레이션 (노션 제거됨) ---");
const workflowIdAfterDelete = dynamicWorkflow.id || 'simulated-workflow-2';
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdAfterDelete });
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_YOUTUBE, '삭제 후 워크플로우 실행 - YouTube 이벤트');


// --- 롤백 시연 (노션 노드가 다시 나타나도록 롤백) ---
console.log("\n--- 롤백 시연 시작 ---");

// 현재 스택은 [초기, 유튜브, 슬랙읽기, 슬랙메시지, 노션추가, 노션삭제] 상태가 저장되어 있습니다.
caretaker.getMemento(); // '노션 삭제 후' 상태를 스택에서 제거 (이전 단계에서 저장한 것)
const notionAddedMemento = caretaker.getMemento(); // '노션 추가 후' 상태를 가져옴
dynamicWorkflow.restoreFromMemento(notionAddedMemento);
console.log("[메멘토] 롤백 완료: Notion 노드 추가 이전 상태로 복원.");
console.log("-> 롤백 후 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(' -> '));

// 롤백된 상태의 워크플로우 실행 시뮬레이션 (노션 복원됨)
console.log("\n--- 롤백 후 워크플로우 실행 시뮬레이션 (노션 복원됨) ---");
const workflowIdForRollback = dynamicWorkflow.id || 'simulated-workflow-3';
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdForRollback });
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_YOUTUBE, '롤백 후 워크플로우 실행 - YouTube 이벤트');


// 최종 이벤트 저장소 내용 확인
console.log("\n--- 기록된 모든 이벤트 ---");
eventStore.getAllEvents().forEach(event => {
    console.log(`[Event: ${event.type}] Node: ${event.nodeName}, Time: ${new Date(event.timestamp).toLocaleTimeString()}, `);
});

console.log("\n--- 메멘토 패턴 시연 완료 ---");