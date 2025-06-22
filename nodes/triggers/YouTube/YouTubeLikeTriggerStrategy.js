
const ITriggerStrategy = require('../strategies/ITriggerStrategy');
const ITriggerImplementation = require('../../../core/ITriggerImplementation');

class YouTubeLikeTriggerStrategy extends ITriggerStrategy {

    constructor(implementation, videoId) {
        super();
        this.implementation = implementation; 
        this.videoId = videoId; 
        this.boundHandleImplementationEvent = this.processEvent.bind(this);
    }

    startMonitoring() {
        this.implementation.startListening(this.boundHandleImplementationEvent, { service: 'youtube', videoId: this.videoId });
    }

    stopMonitoring() {
        this.implementation.stopListening();
    }

    processEvent(payload) {
        super.notify(payload);
    }
}

module.exports = YouTubeLikeTriggerStrategy;