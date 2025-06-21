
class Registry {
    static implementations = {}; 
    static strategies = {};    

    static registerImplementation(type, creator) {
        if (Registry.implementations[type]) {
            console.warn(`[Registry] 구현체 타입 '${type}'가 이미 등록되어 있습니다. 덮어씁니다.`);
        }
        Registry.implementations[type] = creator;
        console.log(`[Registry] 구현체 타입 '${type}' 등록됨.`);
    }

    static createImplementation(type, ...args) {
        const creator = Registry.implementations[type];
        if (!creator) {
            throw new Error(`[Registry] 구현체 타입 '${type}'는 등록되지 않았습니다.`);
        }
        console.log(`[Registry] 구현체 타입 '${type}' 생성.`);
        return creator(...args);
    }


    static registerStrategy(type, creator) {
        if (Registry.strategies[type]) {
            console.warn(`[Registry] 전략 타입 '${type}'가 이미 등록되어 있습니다. 덮어씁니다.`);
        }
        Registry.strategies[type] = creator;
        console.log(`[Registry] 전략 타입 '${type}' 등록됨.`);
    }

    static createStrategy(type, ...args) {
        const creator = Registry.strategies[type];
        if (!creator) {
            throw new Error(`[Registry] 전략 타입 '${type}'는 등록되지 않았습니다.`);
        }
        console.log(`[Registry] 전략 타입 '${type}' 생성.`);
        return creator(...args);
    }
}

module.exports = Registry;