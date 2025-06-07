// src/nodes/factories/DefaultNotionNodeFactory.js
const AbstractNodeFactory = require('./AbstractNodeFactory');
const NotionPageCreateBuilder = require('../builders/NotionPageCreateBuilder');

/**
 * @class DefaultNotionNodeFactory
 * Notion 서비스와 관련된 노드 빌더를 생성하는 구체적인 팩토리.
 * AbstractNodeFactory를 상속받아 서비스 이름을 명시적으로 제공합니다.
 */
class DefaultNotionNodeFactory extends AbstractNodeFactory {
    constructor() {
        super('Notion'); // 부모 클래스(AbstractNodeFactory)의 생성자에 서비스 이름 전달
    }

    createPageCreateBuilder() {
        return new NotionPageCreateBuilder();
    }
}

module.exports = DefaultNotionNodeFactory;