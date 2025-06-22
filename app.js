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
    triggerNode.wrappedComponent.strategy.notify(payload);
};


const mementoRunner = new WorkflowRunnerFacade();
const caretaker = new WorkflowCaretaker();
const mementoComposer = new WorkflowComposerFacade();
const eventStore = mementoComposer.getEventStore();

let dynamicWorkflow;
let currentTriggerNode = null;

const MEMENTO_TRIGGER_ID_YOUTUBE = 'youtube_video_abc';
const SLACK_READ_CHANNEL_ID = 'general';

// 1단계: 초기 빈 워크플로우 시작 및 상태 저장
dynamicWorkflow = mementoComposer.startNewWorkflow().build();
caretaker.saveMemento(dynamicWorkflow.createMemento());

// 2단계: YouTubeLikeTriggerNode 추가 (로컬 폴링 구현 사용) 및 상태 저장
currentTriggerNode = mementoComposer.addYouTubeLikeTriggerNode(MEMENTO_TRIGGER_ID_YOUTUBE, 'local'); // 이제 add 메서드가 노드를 직접 반환
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());

// --- 추가 시작 ---
// 2.5단계: YouTubeReadRecentLikedVideoNode 추가 및 상태 저장
let youtubeReadRecentLikedVideoNode = mementoComposer.addYouTubeReadRecentLikedVideoNode();
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());

// 4단계: Slack 메시지 노드 추가 및 상태 저장
let slackMessageNode = mementoComposer.addSlackMessageNode('그룹단톡방', '메시지'); // 노드 참조 저장
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());

let slackMessageNode2 = mementoComposer.addSlackMessageNode('개인채널', '메시지'); // 노드 참조 저장
dynamicWorkflow = mementoComposer.build();
caretaker.saveMemento(dynamicWorkflow.createMemento());
// 최종 워크플로우 실행 시뮬레이션 (노션 포함된 상태)
const workflowIdForRun = dynamicWorkflow.id || 'simulated-workflow-1';
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdForRun });
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_YOUTUBE, '최종 워크플로우 실행');


console.log("\n개인채널 삭제")
mementoComposer.removeNode(slackMessageNode2); 
dynamicWorkflow = mementoComposer.build(); 
caretaker.saveMemento(dynamicWorkflow.createMemento()); // 삭제 후 상태 저장

const workflowIdAfterDelete = dynamicWorkflow.id || 'simulated-workflow-2';
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdAfterDelete });
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_YOUTUBE, '삭제 후 워크플로우 실행');



console.log("\n--- 롤백 시연 시작 ---");


caretaker.getMemento(); 
const notionAddedMemento = caretaker.getMemento(); 
dynamicWorkflow.restoreFromMemento(notionAddedMemento);

const workflowIdForRollback = dynamicWorkflow.id || 'simulated-workflow-3';
mementoRunner.runWorkflow(dynamicWorkflow, { workflowId: workflowIdForRollback });
simulateEvent(currentTriggerNode, 'youtube', MEMENTO_TRIGGER_ID_YOUTUBE, '롤백 후 워크플로우 실행');


// 최종 이벤트 저장소 내용 확인
console.log("\n--- 기록된 모든 이벤트 ---");
eventStore.getAllEvents().forEach(event => {
    console.log(`[Event: ${event.type}] Node: ${event.nodeName}, Time: ${new Date(event.timestamp).toLocaleTimeString()}, `);
});

console.log("\n--- 시연 완료 ---");