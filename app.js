const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade');
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade');

const composer = new WorkflowComposerFacade();
const runner = new WorkflowRunnerFacade();

// --- 유튜브 좋아요 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---
console.log("--- 유튜브 좋아요 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---");
const youtube_save = composer
    .startNewWorkflow()
    .addYouTubeLikeTriggerNode('someVideoId123') // 비디오 ID는 'someVideoId123'으로 설정했습니다.
    .addSlackMessageNode('#general', '유튜브 좋아요 트리거 워크플로우 실행! (설계 모드)')
    .addNotionPageCreateNode('유튜브 좋아요 감지 문서 (설계 모드)', '이 문서는 유튜브 좋아요 트리거에 의해 생성됩니다.')
    .build();

runner.runWorkflow(youtube_save);

// ***** 중요 수정: 트리거 이벤트 시뮬레이션 부분을 최소화합니다. *****
console.log("\n--- 외부에서 유튜브 좋아요 트리거 이벤트 강제 발생 시뮬레이션 ---");
// 워크플로우의 첫 번째 노드(트리거 노드)의 triggerCallback을 직접 호출합니다.
// youtube_save.nodes[0]은 AbstractTriggerNode 인스턴스이며, triggerCallback을 가지고 있다고 가정합니다.
youtube_save.nodes[0].triggerCallback({
    timestamp: new Date(),
    videoId: youtube_save.nodes[0].videoId,
    message: `[외부 시뮬레이션] 유튜브 비디오 '${youtube_save.nodes[0].videoId}' 좋아요 변화 감지!`
});
console.log("--- 유튜브 좋아요 트리거 이벤트 시뮬레이션 완료 ---");