
const ITriggerImplementation = require('../../../core/ITriggerImplementation');
const Registry = require('../../../core/Registry');

class LocalYouTubePollingImplementation extends ITriggerImplementation {
    constructor() { 
        super();
        this.triggerCallback = null;
        console.log(`[LocalYouTubePollingImplementation] 로컬 폴링 개념적 구현체 생성됨.`);
    }

    startListening(callback) {
        this.triggerCallback = callback;
        console.log(`[LocalYouTubePollingImplementation] 로컬 폴링 감지 대기 시작 (개념적).`);
    }

    stopListening() {
        console.log(`[LocalYouTubePollingImplementation] 로컬 폴링 감지 중지 (개념적).`);
        this.triggerCallback = null;
    }
}

Registry.registerImplementation('local', () => new LocalYouTubePollingImplementation());

module.exports = LocalYouTubePollingImplementation;