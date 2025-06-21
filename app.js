// app.js
const WorkflowComposerFacade = require("../jonggang/nodes/facade/WorkflowComposerFacade");
const WorkflowRunnerFacade = require("../jonggang/nodes/facade/WorkflowRunnerFacade");
const YouTubeLikeTriggerNode = require("../jonggang/nodes/triggers/YouTube/YouTubeLikeTriggerNode"); // 트리거 시뮬레이션을 위해 직접 임포트

console.log("--- n8n 자동화 워크플로우 디자인 패턴 프로젝트 시작 ---");

// 1. 워크플로우 빌더 퍼사드 생성
const composer = new WorkflowComposerFacade();

// 2. 워크플로우 구성 (컴포지트 + 빌더 + 팩토리 패턴 활용)
console.log("\n[App] 워크플로우 구성 중...");
const myWorkflow = composer
  .startNewWorkflow()
  .addYouTubeLikeTriggerNode("your-youtube-video-id") // 예시 YouTube 비디오 ID
  .addNotionPageCreateNode(
    "새로운 유튜브 좋아요 알림",
    "유튜브 비디오에 새로운 좋아요가 감지되었습니다! 자세한 내용은 여기에서 확인하세요."
  )
  .addSlackMessageNode(
    "#general", // 예시 Slack 채널
    "🎉 유튜브 비디오에 새로운 좋아요가 감지되어 Notion 페이지가 생성되었습니다!"
  )
  .build();

console.log("[App] 워크플로우 구성 완료.");

// 3. 워크플로우 실행기 퍼사드 생성
const runner = new WorkflowRunnerFacade();

// 4. 워크플로우 실행 지시 (트리거 노드를 포함하고 있으므로 감시 시작)
console.log("\n[App] 워크플로우 실행기에 워크플로우 등록 및 감시 시작 지시.");
runner.runWorkflow(myWorkflow);

// --- 유튜브 트리거 시뮬레이션 ---
// 실제 n8n에서는 유튜브 API 폴링 등을 통해 이벤트를 감지하지만,
// 여기서는 수동으로 트리거 이벤트를 발생시켜 워크플로우를 시작합니다.
// myWorkflow의 첫 번째 노드가 YouTubeLikeTriggerNode임을 가정합니다.
const youtubeTriggerNode = myWorkflow.nodes[0];

if (youtubeTriggerNode instanceof YouTubeLikeTriggerNode) {
  console.log("\n[App] 5초 후 유튜브 좋아요 트리거 이벤트 시뮬레이션...");
  setTimeout(() => {
    console.log("\n--- [SIMULATION] 유튜브 좋아요 이벤트 발생! ---");
    // YouTubeLikeTriggerStrategy 내부에서 notify를 호출하여 이벤트를 발행하는 것을 시뮬레이션합니다.
    // YouTubeLikeTriggerNode의 update 메서드가 호출되고, 이는 다시 runner.executor.runWorkflow()를 트리거합니다.
    youtubeTriggerNode.strategy.notify({
      videoId: youtubeTriggerNode.videoId,
      newLikes: 1234,
    });
    console.log("--- [SIMULATION] 트리거 이벤트 시뮬레이션 완료. ---");
  }, 5000); // 5초 후 트리거 발생
} else {
  console.error(
    "[App] 첫 번째 노드가 YouTubeLikeTriggerNode가 아닙니다. 트리거 시뮬레이션 불가."
  );
}

// --- 노드 실패 시뮬레이션 안내 ---
console.log("\n--- 노드 실패 시뮬레이션 안내 ---");
console.log("NotionPageCreateNode.js 또는 SlackMessageNode.js 파일에서");
console.log(
  "Receiver 클래스 내부의 'if (Math.random() < 0.5)' 주석을 해제하면,"
);
console.log("해당 노드가 50% 확률로 실패하게 되어, 체인 오브 리스폰서빌리티의");
console.log(
  "'ExecutionLoggerHandler', 'FailureNotificationHandler', 'WorkflowTerminationHandler' 동작을 확인할 수 있습니다."
);
console.log("실패 시 워크플로우가 중단되는 것을 콘솔 로그에서 확인하세요.");

console.log(
  "\n--- n8n 자동화 워크플로우 디자인 패턴 프로젝트 종료 대기 중 ---"
);
// (실제 애플리케이션이라면 이벤트를 계속 대기하거나 서버를 실행합니다.)
