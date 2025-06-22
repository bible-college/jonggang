// src/core/WorkflowComponentDecorator.js
const Node = require('./Node'); //

/**
 * @class WorkflowComponentDecorator
 * 데코레이터 패턴의 추상 데코레이터 역할을 합니다.
 * 모든 구체적인 데코레이터가 상속받아야 할 기본 구조를 정의합니다.
 * 내부적으로 래핑할 WorkflowComponent를 가집니다.
 */
class NodeDecorator extends Node {
    constructor(component) {
        super();
        if (new.target === NodeDecorator) {
            throw new TypeError("Abstract class 'WorkflowComponentDecorator' cannot be instantiated directly.");
        }
        if (!(component instanceof Node)) { //
            throw new Error("데코레이터는 WorkflowComponent 인스턴스를 감싸야 합니다.");
        }
        this.wrappedComponent = component;
    }

    /**
     * 래핑된 컴포넌트의 execute 메서드를 호출합니다.
     * 구체적인 데코레이터는 이 메서드를 오버라이드하여 전/후 로직을 추가합니다.
     * @param {Object} context - 워크플로우 컨텍스트
     * @returns {Object} 업데이트된 컨텍스트
     */
    execute(context = {}) {
        // 기본적으로는 래핑된 컴포넌트의 execute를 위임합니다.
        return this.wrappedComponent.execute(context); //
    }

    // add, remove 메서드도 필요에 따라 위임하거나 구현할 수 있습니다.
    // 현재 예시에서는 execute에만 초점을 맞춥니다.
    add(component) {
        return this.wrappedComponent.add(component);
    }

    remove(component) {
        return this.wrappedComponent.remove(component);
    }
}

module.exports = NodeDecorator;