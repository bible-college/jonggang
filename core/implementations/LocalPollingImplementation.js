// src/core/implementations/LocalPollingImplementation.js
const ITriggerImplementation = require('../ITriggerImplementation'); //
const Registry = require('../Registry'); //

/**
 * @class LocalPollingImplementation
 * 로컬 환경에서 주기적으로 폴링하여 이벤트를 감지하는 개념적 구현체.
 * Bridge 패턴의 Concrete Implementor 역할을 합니다.
 * 서비스별 로직은 config 객체를 통해 간접적으로 처리될 수 있습니다.
 */
class LocalPollingImplementation extends ITriggerImplementation {
    constructor() {
        super();
        this.triggerCallback = null;
        this.config = null;
    }

    /**
     * 감지 대기를 시작합니다.
     * @param {function} callback - 트리거 이벤트 발생 시 호출될 콜백 함수
     * @param {Object} config - 서비스별 설정 (예: { service: 'youtube', videoId: 'abc' } 또는 { service: 'gmail', accountId: 'xyz' })
     */
    startListening(callback, config) { //
        this.triggerCallback = callback; //
        this.config = config; //
        // 실제 구현에서는 여기에 주기적인 API 호출 로직이 들어갈 것입니다.
        // 예를 들어, config.service와 config.videoId/accountId를 사용하여 API 호출 결정.
        // 현재는 뼈대만 남깁니다.
    }

    stopListening() { //
        // 실제 구현에서는 폴링 중지 로직이 들어갈 것입니다.
        // 현재는 뼈대만 남깁니다.
        this.triggerCallback = null; //
        this.config = null; //
    }
}

// 이 모듈이 로드될 때 자체적으로 레지스트리에 등록
Registry.registerImplementation('local', () => new LocalPollingImplementation()); //

module.exports = LocalPollingImplementation; //