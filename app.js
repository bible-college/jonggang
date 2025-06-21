// src/app.js
const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade');
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade');
const Registry = require('./core/Registry'); // Registry 임포트


// 레지스트리 패턴을 위해, 사용될 구현체 모듈들을 여기서 로드합니다.
// 이렇게 하면 각 모듈 파일 끝에 있는 Registry.registerImplementation() 호출이 실행됩니다.
require('./nodes/triggers/YouTube/LocalYouTubePollingImplementation');
// require('./nodes/triggers/YouTube/CloudYouTubeWebhookImplementation'); //클라우드로 사용시 이거 주석 풀기

const composer = new WorkflowComposerFacade();
const runner = new WorkflowRunnerFacade();

// --- 로컬 폴링 기반 유튜브 좋아요 트리거 워크플로우 (즉시 알림) ---
console.log("\n--- 로컬 폴링 기반 유튜브 좋아요 트리거 워크플로우 (즉시 알림) ---");
const triggerNodeId_local_immediate = 'LocalTrigger_Immediate';
const youtube_save_local_immediate = composer
    .startNewWorkflow()
    .addYouTubeLikeTriggerNode(triggerNodeId_local_immediate, 'local', 'immediate') // 'local' 구현체, 'immediate' 전략
    .addSlackMessageNode('#local-updates', `[${triggerNodeId_local_immediate}] 좋아요 감지 (즉시)!`)
    .addNotionPageCreateNode(`노션 좋아요 감지 (배치)!`, '개념적 웹훅을 통해 감지된 배치 이벤트입니다.')
    .build();

runner.runWorkflow(youtube_save_local_immediate);


// // --- 클라우드 웹훅 기반 유튜브 좋아요 트리거 워크플로우 (배치 알림) ---
// console.log("\n--- 클라우드 웹훅 기반 유튜브 좋아요 트리거 워크플로우 (배치 알림) ---");
// const triggerNodeId_cloud_batch = 'CloudTrigger_Batch';
// const youtube_save_cloud_batch = composer
//     .startNewWorkflow()
//     .addYouTubeLikeTriggerNode(triggerNodeId_cloud_batch, 'cloud', 'batch') // 'cloud' 구현체, 'batch' 전략
//     .addNotionPageCreateNode(`[${triggerNodeId_cloud_batch}] 좋아요 감지 (배치)!`, '개념적 웹훅을 통해 감지된 배치 이벤트입니다.')
//     .build();

// runner.runWorkflow(youtube_save_cloud_batch);


// // --- 로컬 폴링 기반 유튜브 좋아요 트리거 워크플로우 (임계치 알림) ---
// console.log("\n--- 로컬 폴링 기반 유튜브 좋아요 트리거 워크플로우 (임계치 알림) ---");
// const triggerNodeId_local_threshold = 'LocalTrigger_Threshold';
// const youtube_save_local_threshold = composer
//     .startNewWorkflow()
//     .addYouTubeLikeTriggerNode(triggerNodeId_local_threshold, 'local', 'threshold', 5) // 'local' 구현체, 'threshold' 전략 (변화 5 이상)
//     .addSlackMessageNode('#local-threshold', `[${triggerNodeId_local_threshold}] 좋아요 감지 (임계치)!`)
//     .build();

// runner.runWorkflow(youtube_save_local_threshold);


// ***** 중요: 이제 구현체 자체에서 자동 트리거 로직을 제거했으므로, *****
// ***** 워크플로우의 트리거를 시뮬레이션하기 위해서는 이 코드가 필수적입니다. *****
console.log("\n--- 외부에서 유튜브 좋아요 트리거 이벤트 강제 발생 시뮬레이션 ---");

// 시뮬레이션 헬퍼 함수
const simulateEvent = (triggerNode, videoId, likes, message) => {
    if (triggerNode.strategy) {
        const payload = {
            timestamp: '개념적 시간', // Date 객체 제거
            videoId: videoId,
            newLikes: likes, // 임계치 전략을 위해 좋아요 수 추가
            message: message
        };
        triggerNode.strategy.notify(payload);
    }
};

// 1. 즉시 알림 (immediate) 전략 시뮬레이션
console.log("\n--- 즉시 알림 (immediate) 전략 시뮬레이션 ---");
simulateEvent(youtube_save_local_immediate.nodes[0], 'videoA_immediate', 100, `[시뮬레이션] 비디오 'videoA_immediate' 좋아요 100 (즉시)`);

// // 2. 배치 알림 (batch) 전략 시뮬레이션
// console.log("\n--- 배치 알림 (batch) 전략 시뮬레이션 ---");
// // 배치 전략은 2개 이벤트가 들어와야 (개념적으로) 알림을 보내므로, 2번 호출합니다.
// simulateEvent(youtube_save_cloud_batch.nodes[0], 'videoB_batch', 200, `[시뮬레이션] 비디오 'videoB_batch' 좋아요 200 (배치1)`);
// simulateEvent(youtube_save_cloud_batch.nodes[0], 'videoB_batch', 201, `[시뮬레이션] 비디오 'videoB_batch' 좋아요 201 (배치2)`);


// // 3. 임계치 알림 (threshold) 전략 시뮬레이션
// console.log("\n--- 임계치 알림 (threshold) 전략 시뮬레이션 ---");
// // 임계치 전략은 초기 상태이거나 변화가 임계치(5) 이상일 때 알림을 보냅니다.
// simulateEvent(youtube_save_local_threshold.nodes[0], 'videoC_threshold', 50, `[시뮬레이션] 비디오 'videoC_threshold' 좋아요 50 (초기)`);
// simulateEvent(youtube_save_local_threshold.nodes[0], 'videoC_threshold', 52, `[시뮬레이션] 비디오 'videoC_threshold' 좋아요 52 (변화2)`);
// simulateEvent(youtube_save_local_threshold.nodes[0], 'videoC_threshold', 58, `[시뮬레이션] 비디오 'videoC_threshold' 좋아요 58 (변화6)`);
// simulateEvent(youtube_save_local_threshold.nodes[0], 'videoC_threshold', 59, `[시뮬레이션] 비디오 'videoC_threshold' 좋아요 59 (변화1)`);

console.log("\n--- 모든 시뮬레이션 완료 ---");