// // src/facade/WorkflowRunnerFacade.js
// const WorkflowExecutor = require('../../core/WorkflowExecutor');
// const AbstractTriggerNode = require('../triggers/AbstractTriggerNode');

// class WorkflowRunnerFacade {
//     constructor() {
//         this.executor = new WorkflowExecutor();
//         this.activeTriggers = new Map();
//     }

//     runWorkflow(workflowComponent) {
//         // 워크플로우의 첫 번째 노드가 존재하고 트리거 노드인지 확인합니다.
//         const firstNode = (workflowComponent.nodes && workflowComponent.nodes.length > 0)
//             ? workflowComponent.nodes[0]
//             : null;

//         // --- 퍼사드가 제공하는 단순화된 실행 로직 ---
//         if (firstNode instanceof AbstractTriggerNode) {
//             console.log(`[RunnerFacade] 트리거 노드 감지: 워크플로우 실행을 트리거에 위임.`);

//             // 1. 트리거 노드에게 실행할 워크플로우를 연결합니다. (선택적: 현재 로직에서는 직접 사용되지 않음)
//             firstNode.setWorkflowToExecute(workflowComponent);

//             // 2. 트리거 이벤트 발생 시 워크플로우를 실행하도록 리스너를 등록합니다.
//             const triggerListener = (payload) => {
//                 console.log(`[RunnerFacade] 트리거 이벤트 발생: 워크플로우 실행 시작. (Payload: ${JSON.stringify(payload)})`);
//                 this.executor.setWorkflow(workflowComponent); // 실행할 워크플로우 설정
//                 this.executor.runWorkflow(); // 워크플로우 실행 지시
//             };
//             firstNode.onTrigger(triggerListener); // AbstractTriggerNode의 onTrigger 호출
//             this.activeTriggers.set(firstNode, { triggerNode: firstNode, listener: triggerListener, workflow: workflowComponent });

//             // 3. 트리거 노드의 감시 시작을 지시합니다.
//             //    **여기가 수정될 부분입니다.**
//             //    firstNode.execute(); <-- 이 줄을 제거해야 무한 루프가 발생하지 않습니다.
//             //    RunnerFacade는 워크플로우를 트리거 노드에 연결하고 리스너를 등록하는 역할만 합니다.
//             //    트리거 노드 자체의 '감시 시작' 로직은 노드의 책임이지만,
//             //    RunnerFacade가 직접 호출하여 워크플로우 실행을 유발하면 안 됩니다.
//             //    따라서 이 줄을 제거하고, app.js에서 외부 시뮬레이션을 통해 트리거를 발생시키는 방식이 유지되어야 합니다.

//             // 현재 `firstNode.execute()`를 제거하면, `app.js`에서 직접 `triggerNodeInWorkflow.triggerCallback()`을 호출하는
//             // 로직이 워크플로우를 시작하는 유일한 경로가 됩니다.
//             // 이것이 현재 "오류 없음", "알고리즘 없음", "개념적 디자인 패턴" 목표에 가장 부합하는 방식입니다.

//         } else {
//             console.warn("[RunnerFacade] 워크플로우는 반드시 트리거 노드로 시작해야 합니다. 실행 중단.");
//         }
//     }
// }

// module.exports = WorkflowRunnerFacade;

// src/facade/WorkflowRunnerFacade.js
const AbstractTriggerNode = require('../triggers/AbstractTriggerNode');

class WorkflowRunnerFacade {
    runWorkflow(workflowComponent) {
        const firstNode = (workflowComponent.nodes && workflowComponent.nodes.length > 0)
            ? workflowComponent.nodes[0]
            : null;

        if (!firstNode) {
            console.warn("[RunnerFacade] 실행할 노드가 없습니다.");
            return;
        }

        // 1. 포장지(데코레이터) 안의 '원본' 트리거 노드를 명확하게 꺼냅니다.
        const originalTrigger = firstNode.wrappedComponent || firstNode;

        // 2. '원본' 트리거 노드인지 확인합니다.
        if (originalTrigger instanceof AbstractTriggerNode) {
            console.log(`[RunnerFacade] 트리거 노드 감지: 워크플로우 실행을 준비합니다.`);

            // 3. 트리거가 울렸을 때 실행될 '진짜 임무'를 정의합니다.
            //    이 임무는 '액션 노드들만' 실행하는 것입니다.
            const triggerListener = (payload) => {
                console.log(`[RunnerFacade] 트리거 이벤트 발생: 액션 노드 실행을 시작합니다.`);
                // 첫 번째 노드(트리거)를 제외한 나머지 노드들을 가져옵니다.
                const actionNodes = workflowComponent.nodes.slice(1);
                for (const actionNode of actionNodes) {
                    try {
                        // 데코레이터로 포장된 액션 노드를 실행합니다.
                        actionNode.execute();
                    } catch (error) {
                        console.error(`[RunnerFacade] '${actionNode.nodeName}' 실행 중 오류 발생:`, error);
                        break;
                    }
                }
            };

            // 4. '원본' 트리거 노드에 위에서 정의한 임무(리스너)를 등록합니다.
            originalTrigger.onTrigger(triggerListener);

            // 5. '감시 시작'을 위해 포장된 트리거 노드를 '최초 한 번만' 실행합니다.
            //    이 코드가 트리거 노드의 실행 로그("STARTED", "SUCCESS")를 기록합니다.
            console.log(`[RunnerFacade] '${firstNode.nodeName}'의 감지를 시작합니다.`);
            firstNode.execute();

        } else {
            // 이 로직은 트리거가 아닌 일반 워크플로우를 위한 것입니다.
            console.log(`[RunnerFacade] 일반 워크플로우 실행.`);
            workflowComponent.execute();
        }
    }
}

module.exports = WorkflowRunnerFacade;