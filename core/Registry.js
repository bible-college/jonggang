class Registry {
    static implementations = {}; // 구현체(ITriggerImplementation) 팩토리 함수를 저장
    static strategies = {};      // 전략(ITriggerStrategy) 팩토리 함수를 저장

    static registerImplementation(type, creator) {
        Registry.implementations[type] = creator;
    }

    static createImplementation(type, ...args) {
        const creator = Registry.implementations[type];
        return creator(...args);
    }

    static registerStrategy(type, creator) {
        Registry.strategies[type] = creator;
    }
    static createStrategy(type, ...args) {
        const creator = Registry.strategies[type];
        return creator(...args);
    }
}

module.exports = Registry;