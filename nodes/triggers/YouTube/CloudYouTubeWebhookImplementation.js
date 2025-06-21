
const ITriggerImplementation = require('../../../core/ITriggerImplementation');
const Registry = require('../../../core/Registry'); // Registry 임포트

class CloudYouTubeWebhookImplementation extends ITriggerImplementation {
    constructor() { 
        super();
        this.triggerCallback = null;
        console.log(`[CloudYouTubeWebhookImplementation] 클라우드 웹훅 개념적 구현체 생성됨.`);
    }

    startListening(callback) {
        this.triggerCallback = callback;
        console.log(`[CloudYouTubeWebhookImplementation] 클라우드 웹훅 수신 대기 시작 (개념적).`);
    }

    stopListening() {
        console.log(`[CloudYouTubeWebhookImplementation] 클라우드 웹훅 수신 중지 (개념적).`);
        this.triggerCallback = null;
    }
}

Registry.registerImplementation('cloud', () => new CloudYouTubeWebhookImplementation());

module.exports = CloudYouTubeWebhookImplementation;