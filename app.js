const WorkflowComposerFacade = require('./nodes/facade/WorkflowComposerFacade');
const WorkflowRunnerFacade = require('./nodes/facade/WorkflowRunnerFacade');



const composer = new WorkflowComposerFacade();
const runner = new WorkflowRunnerFacade();

// --- 시간 트리거를 사용하는 워크플로우 예시 (설계 모드) ---
console.log("--- 시간 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---");
const timeTriggerWorkflow = composer
    .startNewWorkflow()
    // 'timeTrigger_id_1' ID 인자를 제거하고, intervalMs만 전달합니다.
    .addTimeTriggerNode(3000) 
    .addSlackMessageNode('#general', '시간 트리거 워크플로우 실행! (설계 모드)')
    .addNotionPageCreateNode('시간 트리거 문서 (설계 모드)', '이 문서는 트리거가 활성화될 때 생성됩니다.')
    .build();

runner.runWorkflow(timeTriggerWorkflow);


// --- 파일 트리거를 사용하는 워크플로우 예시 (설계 모드) ---
// console.log("\n--- 파일 트리거 워크플로우 구성 및 실행 예시 (설계 모드) ---");
// const fileTriggerWorkflow = composer
//     .startNewWorkflow()
//     // 'fileTrigger_id_1' ID 인자를 제거하고, filePath와 eventType만 전달합니다.
//     .addFileTriggerNode('./test-dir', 'change')
//     .addSlackMessageNode('#dev', '파일 변경 감지! 워크플로우 실행! (설계 모드)')
//     .addNotionPageCreateNode('파일 변경 감지 문서 (설계 모드)', '이 문서는 파일 트리거에 의해 생성되었습니다.')
//     .build();

// runner.runWorkflow(fileTriggerWorkflow);


// // 애플리케이션 종료 시 로직 (트리거 중지 로직은 삭제됨)
// process.on('SIGINT', () => {
//     console.log('\n애플리케이션 종료 요청...');
//     console.log('애플리케이션 종료 (트리거 중지 로직 없음).');
//     process.exit();
// });