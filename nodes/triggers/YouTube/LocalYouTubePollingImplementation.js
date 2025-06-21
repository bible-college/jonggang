// src/nodes/triggers/YouTube/LocalYouTubePollingImplementation.js
const ITriggerImplementation = require('../../../core/ITriggerImplementation');
const Registry = require('../../../core/Registry'); // Registry 임포트

/**
 * @class LocalYouTubePollingImplementation
 * 로컬 환경에서 유튜브 좋아요 이벤트를 주기적으로 폴링하여 감지하는 개념적 구현체.
 * Bridge 패턴의 Concrete Implementor 역할을 합니다. (알고리즘 배제)
 */
class LocalYouTubePollingImplementation extends ITriggerImplementation {
    constructor() { // 모든 구체적인 파라미터 및 알고리즘 관련 속성 제거
        super();
        this.triggerCallback = null;
        console.log(`[LocalYouTubePollingImplementation] 로컬 폴링 개념적 구현체 생성됨.`);
    }

    startListening(callback) {
        this.triggerCallback = callback;
        console.log(`[LocalYouTubePollingImplementation] 로컬 폴링 감지 대기 시작 (개념적).`);
        // 실제 구현에서는 여기에 주기적인 API 호출 로직이 들어갈 것입니다.
        // 콜백은 외부(app.js 시뮬레이션)에서 직접 호출하여 시뮬레이션해야 합니다.
    }

    stopListening() {
        console.log(`[LocalYouTubePollingImplementation] 로컬 폴링 감지 중지 (개념적).`);
        this.triggerCallback = null;
    }
}

// 이 모듈이 로드될 때 자체적으로 레지스트리에 등록
Registry.registerImplementation('localYouTube', () => new LocalYouTubePollingImplementation());

module.exports = LocalYouTubePollingImplementation;