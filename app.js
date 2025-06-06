// src/app.js
const { WorkflowComposerFacade, WorkflowRunnerFacade } = require('./facade');

const composer = new WorkflowComposerFacade();
const runner = new WorkflowRunnerFacade();

// --- 시간 트리거를 사용하는 워크플로우 예시 (설계 모드) ---
console.log("--- 시간 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---");
const timeTriggerWorkflow = composer
    .startNewWorkflow()
    .addTimeTriggerNode('timeTrigger1', 3000)
    .addSlackMessageNode('#general', '시간 트리거 워크플로우 실행! (설계 모드)')
    .addNotionPageCreateNode('시간 트리거 문서 (설계 모드)', '이 문서는 트리거가 활성화될 때 생성됩니다.')
    .build();

runner.runWorkflow(timeTriggerWorkflow);

setTimeout(() => {
    console.log('\n--- 3초 후, 시간 트리거가 다시 발생한 것처럼 워크플로우 재실행 시뮬레이션 ---');
    runner.runWorkflow(timeTriggerWorkflow);
}, 3000);

// --- 파일 트리거를 사용하는 워크플로우 예시 (설계 모드) ---
console.log("\n--- 파일 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---");
const fileTriggerWorkflow = composer
    .startNewWorkflow()
    .addFileTriggerNode('fileTrigger1', './test-dir', 'change')
    .addSlackMessageNode('#dev', '파일 변경 감지! 워크플로우 실행! (설계 모드)')
    .addNotionPageCreateNode('파일 변경 감지 문서 (설계 모드)', '이 문서는 파일 트리거에 의해 생성되었습니다.')
    .build();

runner.runWorkflow(fileTriggerWorkflow);

setTimeout(() => {
    console.log('\n--- 5초 후, 파일 트리거가 다시 발생한 것처럼 워크플로우 재실행 시뮬레이션 ---');
    runner.runWorkflow(fileTriggerWorkflow);
}, 5000);


// 애플리케이션 종료 시 로직에서 트리거 중지 부분 삭제
process.on('SIGINT', () => {
    console.log('\n애플리케이션 종료 요청...');
    console.log('애플리케이션 종료 (트리거 중지 로직 없음).');
    process.exit();
});

// 특정 시간 후 특정 트리거 중지 예시 호출 부분 삭제
// setTimeout(() => { ... }, 10000);