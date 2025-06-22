// src/core/implementations/CloudWebhookImplementation.js
const ITriggerImplementation = require('../ITriggerImplementation'); //
const Registry = require('../Registry'); //

/**
 * @class CloudWebhookImplementation
 * 클라우드 환경에서 웹훅을 통해 이벤트를 수신하는 개념적 구현체.
 * Bridge 패턴의 Concrete Implementor 역할을 합니다.
 * 서비스별 로직은 config 객체를 통해 간접적으로 처리될 수 있습니다.
 */
class CloudWebhookImplementation extends ITriggerImplementation {
    constructor() {
        super();
        this.triggerCallback = null;
        this.config = null;
    }

    /**
     * 감지 대기를 시작합니다.
     * @param {function} callback - 트리거 이벤트 발생 시 호출될 콜백 함수
     * @param {Object} config - 서비스별 설정 (예: { service: 'youtube', videoId: 'abc' })
     */
    startListening(callback, config) { //
        this.triggerCallback = callback; //
        this.config = config; //
        // 실제 웹훅 수신 로직 없음. 뼈대만 남깁니다.
        // 이 config를 사용하여 웹훅 엔드포인트 등록 등을 수행할 수 있습니다.
    }

    stopListening() { //
        // 실제 웹훅 해제 로직 (개념적) 뼈대만 남깁니다.
        this.triggerCallback = null; //
        this.config = null; //
    }
}

// 이 모듈이 로드될 때 자체적으로 레지스트리에 등록
Registry.registerImplementation('cloud', () => new CloudWebhookImplementation()); //

module.exports = CloudWebhookImplementation; //