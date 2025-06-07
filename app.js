// src/app.js
const { WorkflowComposerFacade, WorkflowRunnerFacade } = require('./facade');

const composer = new WorkflowComposerFacade();
const runner = new WorkflowRunnerFacade();

// --- 시간 트리거를 사용하는 워크플로우 예시 (설계 모드) ---
console.log("--- 시간 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---");
const timeTriggerWorkflow = composer
    .startNewWorkflow()
    .addTimeTriggerNode('timeTrigger_id_1', 3000) // ID는 이제 개념적
    .addSlackMessageNode('#general', '시간 트리거 워크플로우 실행! (설계 모드)')
    .addNotionPageCreateNode('시간 트리거 문서 (설계 모드)', '이 문서는 트리거가 활성화될 때 생성됩니다.')
    .build();

runner.runWorkflow(timeTriggerWorkflow);

// 수동으로 3초 후에 다시 워크플로우를 실행하여 트리거가 또 발생한 것처럼 시뮬레이션
setTimeout(() => {
    console.log('\n--- 3초 후, 시간 트리거가 다시 발생한 것처럼 워크플로우 재실행 시뮬레이션 ---');
    runner.runWorkflow(timeTriggerWorkflow);
}, 3000);

// --- 파일 트리거를 사용하는 워크플로우 예시 (설계 모드) ---
console.log("\n--- 파일 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---");
const fileTriggerWorkflow = composer
    .startNewWorkflow()
    .addFileTriggerNode('fileTrigger_id_1', './test-dir', 'change') // ID와 경로는 이제 개념적
    .addSlackMessageNode('#dev', '파일 변경 감지! 워크플로우 실행! (설계 모드)')
    .addNotionPageCreateNode('파일 변경 감지 문서 (설계 모드)', '이 문서는 파일 트리거에 의해 생성되었습니다.')
    .build();

runner.runWorkflow(fileTriggerWorkflow);

// 수동으로 5초 후에 다시 워크플로우를 실행하여 파일 변경이 또 발생한 것처럼 시뮬레이션
setTimeout(() => {
    console.log('\n--- 5초 후, 파일 트리거가 다시 발생한 것처럼 워크플로우 재실행 시뮬레이션 ---');
    runner.runWorkflow(fileTriggerWorkflow);
}, 5000);


// 애플리케이션 종료 시 로직 (트리거 중지 로직은 삭제됨)
process.on('SIGINT', () => {
    console.log('\n애플리케이션 종료 요청...');
    console.log('애플리케이션 종료 (트리거 중지 로직 없음).');
    process.exit();
});