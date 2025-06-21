const ITriggerImplementation = require('../../../core/ITriggerImplementation');
const Registry = require('../../../core/Registry');

class CloudGmailWebhookImplementation extends ITriggerImplementation {
    constructor() {
        super();
        // 클라우드 웹훅 설정 등 (개념적)
    }

    startListening(callback) {
        console.log('[CloudGmailWebhookImplementation] 웹훅 감지 시작');
        // 클라우드 이벤트 연결 (개념적)
        this.callback = callback;
    }

    stopListening() {
        console.log('[CloudGmailWebhookImplementation] 웹훅 감지 중지');
        // 웹훅 해제 로직 (개념적)
        this.callback = null;
    }

  
}
Registry.registerImplementation('cloud', () => new CloudGmailWebhookImplementation());

module.exports = CloudGmailWebhookImplementation;
