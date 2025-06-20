// src/core/Registry.js
/**
 * @class Registry
 * 디자인 패턴 컴포넌트(구현체, 전략)를 등록하고 생성하는 중앙 레지스트리.
 * 개방/폐쇄 원칙(OCP)을 강화하기 위해 사용됩니다.
 */
class Registry {
    static implementations = {}; // 구현체(ITriggerImplementation) 팩토리 함수를 저장
    static strategies = {};      // 전략(ITriggerStrategy) 팩토리 함수를 저장

    /**
     * 특정 타입의 트리거 구현체를 레지스트리에 등록합니다.
     * @param {string} type - 구현체를 식별하는 고유 문자열 (예: 'local', 'cloud').
     * @param {function} creator - 해당 구현체의 인스턴스를 생성하는 팩토리 함수.
     * 이 함수는 구현체 생성에 필요한 인자들을 받을 수 있습니다.
     */
    static registerImplementation(type, creator) {
        if (Registry.implementations[type]) {
            console.warn(`[Registry] 구현체 타입 '${type}'가 이미 등록되어 있습니다. 덮어씁니다.`);
        }
        Registry.implementations[type] = creator;
        console.log(`[Registry] 구현체 타입 '${type}' 등록됨.`);
    }

    /**
     * 등록된 타입의 트리거 구현체 인스턴스를 생성합니다.
     * @param {string} type - 생성할 구현체의 타입.
     * @param {...any} args - 구현체 팩토리 함수에 전달할 인자들.
     * @returns {ITriggerImplementation} - 생성된 구현체 인스턴스.
     * @throws {Error} 해당 타입의 구현체가 등록되지 않은 경우.
     */
    static createImplementation(type, ...args) {
        const creator = Registry.implementations[type];
        if (!creator) {
            throw new Error(`[Registry] 구현체 타입 '${type}'는 등록되지 않았습니다.`);
        }
        console.log(`[Registry] 구현체 타입 '${type}' 생성.`);
        return creator(...args);
    }

    /**
     * 특정 타입의 트리거 전략을 레지스트리에 등록합니다.
     * @param {string} type - 전략을 식별하는 고유 문자열 (예: 'immediate', 'batch', 'threshold').
     * @param {function} creator - 해당 전략의 인스턴스를 생성하는 팩토리 함수.
     * 팩토리 함수는 전략 생성에 필요한 인자(예: implementation, threshold)를 받을 수 있습니다.
     */
    static registerStrategy(type, creator) {
        if (Registry.strategies[type]) {
            console.warn(`[Registry] 전략 타입 '${type}'가 이미 등록되어 있습니다. 덮어씁니다.`);
        }
        Registry.strategies[type] = creator;
        console.log(`[Registry] 전략 타입 '${type}' 등록됨.`);
    }

    /**
     * 등록된 타입의 트리거 전략 인스턴스를 생성합니다.
     * @param {string} type - 생성할 전략의 타입.
     * @param {...any} args - 전략 팩토리 함수에 전달할 인자.
     * @returns {ITriggerStrategy} - 생성된 전략 인스턴스.
     * @throws {Error} 해당 타입의 전략이 등록되지 않은 경우.
     */
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