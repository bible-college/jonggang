// src/nodes/triggers/YouTube/CloudYouTubeWebhookImplementation.js
const ITriggerImplementation = require('../../../core/ITriggerImplementation');
const Registry = require('../../../core/Registry'); // Registry 임포트

/**
 * @class CloudYouTubeWebhookImplementation
 * 클라우드 환경에서 웹훅을 통해 유튜브 좋아요 변경 이벤트를 수신하는 개념적 구현체.
 * Bridge 패턴의 Concrete Implementor 역할을 합니다. (알고리즘 배제)
 */
class CloudYouTubeWebhookImplementation extends ITriggerImplementation {
    constructor() { // videoId를 받지 않습니다.
        super();
        this.triggerCallback = null;
        console.log(`[CloudYouTubeWebhookImplementation] 클라우드 웹훅 개념적 구현체 생성됨.`);
    }

    startListening(callback) {
        this.triggerCallback = callback;
        console.log(`[CloudYouTubeWebhookImplementation] 클라우드 웹훅 수신 대기 시작 (개념적).`);
        // 실제 웹훅 수신 로직 없음. 콜백은 외부(app.js 시뮬레이션)에서 직접 호출하여 시뮬레이션해야 합니다.
    }

    stopListening() {
        console.log(`[CloudYouTubeWebhookImplementation] 클라우드 웹훅 수신 중지 (개념적).`);
        this.triggerCallback = null;
    }
}

// 이 모듈이 로드될 때 자체적으로 레지스트리에 등록
Registry.registerImplementation('cloud', () => new CloudYouTubeWebhookImplementation());

module.exports = CloudYouTubeWebhookImplementation;