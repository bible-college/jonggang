// src/app.js (기존 코드를 유지하고, 아래 코드를 추가합니다)

// 기존 app.js 상단 임포트 유지
const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade');
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade');
const Registry = require('./core/Registry');

// 레지스트리 패턴을 위해, 사용될 구현체 모듈들을 여기서 로드합니다.
require('./nodes/triggers/YouTube/LocalYouTubePollingImplementation');

// 새로 추가할 Caretaker 임포트
const WorkflowCaretaker = require('./core/WorkflowCaretaker'); // 새로 생성할 Caretaker 클래스 임포트

const composer = new WorkflowComposerFacade();
const runner = new WorkflowRunnerFacade();

// --- 기존 워크플로우 정의 및 실행 로직 (유지) ---
console.log("\n--- 로컬 폴링 기반 유튜브 좋아요 트리거 워크플로우 (즉시 알림) ---");
const triggerNodeId_local_immediate = 'LocalTrigger_Immediate';
const youtube_save_local_immediate = composer
    .startNewWorkflow()
    .addYouTubeLikeTriggerNode(triggerNodeId_local_immediate, 'local', 'immediate')
    .addSlackMessageNode('#local-updates', `[${triggerNodeId_local_immediate}] 좋아요 감지 (즉시)!`)
    .addNotionPageCreateNode(`s노션 좋아요 감지 (배치)!`, '개념적 웹훅을 통해 감지된 배치 이벤트입니다.')
    .build();

runner.runWorkflow(youtube_save_local_immediate);

// 기존 시뮬레이션 헬퍼 함수 유지
const simulateEvent = (triggerNode, videoId, likes, message) => {
    if (triggerNode.strategy) {
        const payload = {
            timestamp: '개념적 시간',
            videoId: videoId,
            newLikes: likes,
            message: message
        };
        triggerNode.strategy.notify(payload);
    }
};

console.log("\n--- 외부에서 유튜브 좋아요 트리거 이벤트 강제 발생 시뮬레이션 ---");
console.log("\n--- 즉시 알림 (immediate) 전략 시뮬레이션 ---");
simulateEvent(youtube_save_local_immediate.nodes[0], 'videoA_immediate', 100, `[시뮬레이션] 비디오 'videoA_immediate' 좋아요 100 (즉시)`);

console.log("\n--- 모든 시뮬레이션 완료 (기존 워크플로우) ---\n");


// -----------------------------------------------------------
// --- 메멘토 패턴을 이용한 노드 추가/실행 및 롤백 구현 (새로운 추가 코드) ---
// -----------------------------------------------------------
console.log("\n=========================================================");
console.log("=== 메멘토 패턴을 이용한 노드별 워크플로우 실행 및 롤백 ===");
console.log("=========================================================\n");

const mementoComposer = new WorkflowComposerFacade();
const mementoRunner = new WorkflowRunnerFacade();
const caretaker = new WorkflowCaretaker();

let dynamicWorkflow = mementoComposer.startNewWorkflow().build(); // 빈 워크플로우로 시작

// 초기 상태 저장 (빈 워크플로우)
caretaker.save(dynamicWorkflow);
console.log("[메멘토 테스트] 초기 빈 워크플로우 상태 저장 완료.");

// 1단계: 트리거 노드 추가 및 실행
console.log("\n--- 1단계: YouTubeLikeTriggerNode 추가 및 실행 ---");
const initialTriggerNodeId = 'DynamicTrigger_Initial';
const triggerNode = new (require('./nodes/triggers/YouTube/YouTubeLikeTriggerNode'))(
    initialTriggerNodeId,
    new (require('./nodes/triggers/YouTube/YouTubeLikeTriggerStrategy'))(
        Registry.createImplementation('local'), 'immediate'
    )
);
dynamicWorkflow.add(triggerNode);
caretaker.save(dynamicWorkflow); // 상태 저장
console.log("[메멘토 테스트] 트리거 노드 추가 및 상태 저장 완료.");

// 워크플로우 실행 준비 (트리거 노드 감시 시작)
mementoRunner.runWorkflow(dynamicWorkflow);
// 시뮬레이션 (이벤트가 발생했다고 가정)
console.log("\n[메멘토 테스트] 트리거 노드 시뮬레이션 이벤트 발생:");
simulateEvent(triggerNode, 'dynamicVideo1', 50, '동적 워크플로우 트리거');

// 2단계: Slack 메시지 노드 추가 및 실행
console.log("\n--- 2단계: SlackMessageNode 추가 및 실행 ---");
const slackNode = new (require('./nodes/actions/slack/SlackMessageNode'))('#dynamic-channel', '동적 워크플로우 Slack 메시지');
dynamicWorkflow.add(slackNode);
caretaker.save(dynamicWorkflow); // 상태 저장
console.log("[메멘토 테스트] Slack 노드 추가 및 상태 저장 완료.");

// 전체 워크플로우 다시 실행 (이전 트리거가 다시 발생했다고 가정)
// 실제로는 트리거가 다시 발생하거나, 수동으로 전체 워크플로우를 재실행하는 로직이 필요
console.log("\n[메멘토 테스트] 트리거 이벤트 재발생 시뮬레이션 (Slack 노드 포함):");
simulateEvent(triggerNode, 'dynamicVideo2', 60, 'Slack 노드 포함 시뮬레이션');

// 3단계: Notion 페이지 생성 노드 추가 및 실행
console.log("\n--- 3단계: NotionPageCreateNode 추가 및 실행 ---");
const notionNode = new (require('./nodes/actions/notion/NotionPageCreateNode'))('동적 Notion 페이지', '동적 워크플로우 Notion 내용');
dynamicWorkflow.add(notionNode);
caretaker.save(dynamicWorkflow); // 상태 저장
console.log("[메멘토 테스트] Notion 노드 추가 및 상태 저장 완료.");

// 전체 워크플로우 다시 실행 (이전 트리거가 다시 발생했다고 가정)
console.log("\n[메멘토 테스트] 트리거 이벤트 재발생 시뮬레이션 (Notion 노드 포함):");
simulateEvent(triggerNode, 'dynamicVideo3', 70, 'Notion 노드 포함 시뮬레이션');


console.log("\n--- 모든 노드 추가 및 실행 완료 ---");
console.log("최종 워크플로우 노드 수:", dynamicWorkflow.nodes.length);
dynamicWorkflow.nodes.forEach(node => console.log(`- ${node.constructor.name}`));

// -----------------------------------------------------------
// --- 롤백하여 마지막 노드 제외하고 다시 실행 ---
console.log("\n--- 롤백 및 재실행 ---");

// 마지막 상태 롤백 (Notion 노드 제거)
caretaker.restore(dynamicWorkflow); // Notion 노드 추가 전 상태로 되돌림
console.log("[메멘토 테스트] 마지막 노드(Notion) 제외하고 롤백 완료.");
console.log("롤백 후 워크플로우 노드 수:", dynamicWorkflow.nodes.length);
dynamicWorkflow.nodes.forEach(node => console.log(`- ${node.constructor.name}`));

// 롤백된 상태에서 다시 실행 (트리거 노드와 Slack 노드만 포함)
console.log("\n[메멘토 테스트] 롤백된 상태에서 트리거 이벤트 재발생 시뮬레이션:");
simulateEvent(triggerNode, 'dynamicVideo4', 80, '롤백 후 재실행 시뮬레이션');

console.log("\n=========================================================");
console.log("=== 메멘토 패턴 테스트 완료 ===");
console.log("=========================================================\n");