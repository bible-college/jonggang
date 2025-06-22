// src/nodes/factories/DefaultNotionNodeFactory.js
const AbstractNodeFactory = require('../../../core/AbstractNodeFactory');
const NotionPageCreateBuilder = require('./NotionPageCreateBuilder');

class DefaultNotionNodeFactory extends AbstractNodeFactory {
    constructor() {
        super('Notion'); // 부모 클래스(AbstractNodeFactory)의 생성자에 서비스 이름 전달
    }

    createPageCreateBuilder() {
        return new NotionPageCreateBuilder();
    }
}

module.exports = DefaultNotionNodeFactory;