// src/app.js

// 기존 app.js 상단 임포트 유지
const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade');
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade');
const Registry = require('./core/Registry');

// 레지스트리 패턴을 위해, 사용될 구현체 모듈들을 여기서 로드합니다.
require('./nodes/triggers/YouTube/LocalYouTubePollingImplementation');
require('./nodes/triggers/YouTube/CloudYouTubeWebhookImplementation');

// Caretaker 및 SequentialWorkflow 임포트만 유지.
const WorkflowCaretaker = require('./core/WorkflowCaretaker');

// 시뮬레이션 헬퍼 함수를 전역 스코프로 이동
const simulateEvent = (triggerNode, videoId, likes, message) => {
    const payload = {
        timestamp: '개념적 시간',
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

// 1단계: 초기 빈 워크플로우 시작 및 상태 저장
// mementoComposer는 이제 build() 후에도 currentWorkflow를 유지합니다.
dynamicWorkflow = mementoComposer.startNewWorkflow().build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] 초기 빈 워크플로우 상태 저장.");


// 2단계: YouTubeLikeTriggerNode 추가 및 상태 저장
// mementoComposer는 이전 상태의 워크플로우를 내부적으로 유지하고 있으므로, continueWorkflow 호출이 필요 없습니다.
mementoComposer.addYouTubeLikeTriggerNode(MEMENTO_TRIGGER_ID, 'local', 'immediate');
dynamicWorkflow = mementoComposer.build(); // 변경된 워크플로우 인스턴스 반환
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] 트리거 노드 추가 및 상태 저장.");
currentTriggerNode = dynamicWorkflow.nodes[0]; // 첫 번째 노드가 항상 트리거임을 가정


// 3단계: Slack 메시지 노드 추가 및 상태 저장
// mementoComposer는 이전 상태의 워크플로우를 내부적으로 유지하고 있습니다.
mementoComposer.addSlackMessageNode('#dynamic-channel', '동적 워크플로우 Slack 메시지');
dynamicWorkflow = mementoComposer.build(); // 변경된 워크플로우 인스턴스 반환
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] Slack 노드 추가 및 상태 저장.");


// 4단계: Notion 페이지 생성 노드 추가 및 상태 저장
// mementoComposer는 이전 상태의 워크플로우를 내부적으로 유지하고 있습니다.
mementoComposer.addNotionPageCreateNode('동적 Notion 페이지', '동적 워크플로우 Notion 내용');
dynamicWorkflow = mementoComposer.build(); // 변경된 워크플로우 인스턴스 반환
caretaker.saveMemento(dynamicWorkflow.createMemento());
console.log("[메멘토] Notion 노드 추가 및 상태 저장.");
console.log("-> 현재 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(', '));

// 최종 워크플로우 실행 시뮬레이션
console.log("\n--- 최종 워크플로우 실행 시뮬레이션 ---");
mementoRunner.runWorkflow(dynamicWorkflow);
simulateEvent(currentTriggerNode, 'video_final', 100, '최종 워크플로우 실행');


// --- 롤백 시연 (한 번만) ---
console.log("\n--- 롤백 시연 시작 ---");

// Notion 노드 추가 이전 상태로 롤백
caretaker.getMemento(); // 현재 상태 Memento를 스택에서 제거 (버림)
const previousMemento = caretaker.getMemento(); // Notion 노드 추가 전 상태의 Memento를 가져옴

dynamicWorkflow.restoreFromMemento(previousMemento); // Originator에게 복원 지시
console.log("[메멘토] Notion 노드 제거 후 롤백 완료.");
console.log("-> 롤백 후 워크플로우 노드:", dynamicWorkflow.nodes.map(n => n.constructor.name).join(', '));

// 롤백된 상태의 워크플로우 실행 시뮬레이션
console.log("\n--- 롤백 후 워크플로우 실행 시뮬레이션 ---");
mementoRunner.runWorkflow(dynamicWorkflow);
simulateEvent(currentTriggerNode, 'video_rollback', 70, '롤백 후 워크플로우 실행');

console.log("\n--- 메멘토 패턴 시연 완료 ---");
