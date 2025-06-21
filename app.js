// src/app.js

// 기존 app.js 상단 임포트 유지
const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade');
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade');
const Registry = require('./core/Registry');

// 레지스트리 패턴을 위해, 사용될 구현체 모듈들을 여기서 로드합니다.
require('./nodes/triggers/YouTube/LocalYouTubePollingImplementation');
// require('./nodes/triggers/YouTube/CloudYouTubeWebhookImplementation');

// ... (기존 임포트 및 Registry 로드)

// Caretaker 및 SequentialWorkflow 임포트만 유지.
const WorkflowCaretaker = require('./core/WorkflowCaretaker');

// 시뮬레이션 헬퍼 함수를 전역 스코프로 이동
const simulateEvent = (triggerNode, videoId, likes, message) => {
    const payload = {
        timestamp: new Date().toISOString(), // 실제 시간 스탬프 사용
        videoId: videoId,
        newLikes: likes,
        message: message
    };
    triggerNode.strategy.notify(payload);
};
console.log("\n--- 메멘토 패턴 시연 (간소화 - 연속 빌드) ---\n");

const mementoRunner = new WorkflowRunnerFacade();
const caretaker = new WorkflowCaretaker();
const mementoComposer = new WorkflowComposerFacade(); // Memento 데모를 위한 전용 컴포저

let dynamicWorkflow; // 현재 작업 중인 워크플로우 인스턴스를 담을 변수
let currentTriggerNode = null; // 트리거 노드 참조를 위한 변수
const MEMENTO_TRIGGER_ID = 'DynamicTrigger_Memento'; // Memento 데모용 트리거 ID
const SLACK_READ_CHANNEL_ID = 'general'; // 읽을 Slack 채널 ID (예시)


// 1단계: 초기 빈 워크플로우 시작 및 상태 저장
dynamicWorkflow = mementoComposer.startNewWorkflow().build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] 초기 빈 워크플로우 상태 저장.");


// 2단계: YouTubeLikeTriggerNode 추가 및 상태 저장
mementoComposer.addYouTubeLikeTriggerNode(MEMENTO_TRIGGER_ID, 'local', 'immediate');
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] 트리거 노드 추가 및 상태 저장.");
currentTriggerNode = dynamicWorkflow.nodes[0];


// --- 변경된 부분 시작 ---

// 3단계: Slack 채널 읽기 노드 추가 및 상태 저장 (Slack 메시지 노드보다 먼저 실행)
mementoComposer.addSlackReadChannelNode(SLACK_READ_CHANNEL_ID);
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] Slack 채널 읽기 노드 추가 및 상태 저장.");


// 4단계: Slack 메시지 노드 추가 및 상태 저장
// 이제 SlackMessageNode는 context에서 읽어온 메시지를 사용합니다.
// 여기서는 기본 메시지를 빈 문자열로 두거나, 추가적인 설명을 넣을 수 있습니다.
mementoComposer.addSlackMessageNode('#dynamic-channel', '트리거 이벤트 알림'); // 기본 메시지 추가
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] Slack 메시지 노드 추가 및 상태 저장.");


// 5단계: Notion 페이지 생성 노드 추가 및 상태 저장
// Notion 노드도 이제 context의 트리거 정보 및 Slack 정보 활용 가능
mementoComposer.addNotionPageCreateNode('YouTube 좋아요 알림', '이 내용은 동적으로 채워집니다.');
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] Notion 노드 추가 및 상태 저장.");

// --- 변경된 부분 끝 ---

console.log("-> 현재 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(', '));

// 최종 워크플로우 실행 시뮬레이션
console.log("\n--- 최종 워크플로우 실행 시뮬레이션 ---");
mementoRunner.runWorkflow(dynamicWorkflow);
simulateEvent(currentTriggerNode, 'video_final_001', 100, '최종 워크플로우 실행'); // 비디오 ID 및 좋아요 수 변경

// --- 롤백 시연 (한 번만) ---
console.log("\n--- 롤백 시연 시작 ---");

// Notion 노드 추가 이전 상태로 롤백 (여기서는 Slack 메시지 노드 추가 후 상태로 롤백됩니다.)
caretaker.getMemento(); // Notion 노드 추가 상태 Memento를 스택에서 제거 (버림)
caretaker.getMemento(); // Slack 메시지 노드 추가 상태 Memento를 스택에서 제거 (버림)
const previousMemento = caretaker.getMemento(); // Slack 채널 읽기 노드 추가 전 상태의 Memento를 가져옴 (총 2개 제거)

dynamicWorkflow.restoreFromMemento(previousMemento); // Originator에게 복원 지시
console.log("[메멘토] Notion 및 Slack 메시지 노드 제거 후 롤백 완료.");
console.log("-> 롤백 후 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(', '));

// 롤백된 상태의 워크플로우 실행 시뮬레이션
console.log("\n--- 롤백 후 워크플로우 실행 시뮬레이션 ---");
mementoRunner.runWorkflow(dynamicWorkflow);
simulateEvent(currentTriggerNode, 'video_rollback_002', 70, '롤백 후 워크플로우 실행'); // 비디오 ID 및 좋아요 수 변경

console.log("\n--- 메멘토 패턴 시연 완료 ---");