
/**
 * @interface ITriggerImplementation
 */
class ITriggerImplementation {
    constructor() {
        if (new.target === ITriggerImplementation) {
            throw new TypeError("Interface 'ITriggerImplementation' cannot be instantiated directly.");
        }
    }

    startListening(callback) {
        throw new Error("Method 'startListening()' must be implemented.");
    }

    stopListening() {
        throw new Error("Method 'stopListening()' must be implemented.");
    }
}

module.exports = ITriggerImplementation;