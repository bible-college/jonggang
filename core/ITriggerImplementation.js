
class ITriggerImplementation {
    constructor() {
    }

    startListening(callback) {
        throw new Error("Method 'startListening()' must be implemented.");
    }

    stopListening() {
        throw new Error("Method 'stopListening()' must be implemented.");
    }
}

module.exports = ITriggerImplementation;