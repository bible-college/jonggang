
class AbstractNodeFactory {
    constructor(serviceName) {
        if (new.target === AbstractNodeFactory) {
            throw new TypeError("Abstract class 'AbstractNodeFactory' cannot be instantiated directly.");
        }
        this.serviceName = serviceName;
    }

    getServiceName() {
        return this.serviceName;
    }
}

module.exports = AbstractNodeFactory;