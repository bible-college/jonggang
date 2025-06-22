
const ITriggerImplementation = require('../ITriggerImplementation'); 
const Registry = require('../Registry'); 

class LocalPollingImplementation extends ITriggerImplementation {
    constructor() {
        super();
        this.triggerCallback = null;
        this.config = null;
    }

    startListening(callback, config) { 
        this.triggerCallback = callback; 
        this.config = config; 
    }

    stopListening() { 
        this.triggerCallback = null; 
        this.config = null; 
    }
}

// 이 모듈이 로드될 때 자체적으로 레지스트리에 등록
Registry.registerImplementation('local', () => new LocalPollingImplementation()); //

module.exports = LocalPollingImplementation; //