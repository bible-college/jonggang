
const AbstractNodeFactory = require('../../../core/AbstractNodeFactory');
const NotionPageCreateBuilder = require('./NotionPageCreateBuilder');

class DefaultNotionNodeFactory extends AbstractNodeFactory {
    constructor() {
        super('Notion'); 
    }

    createPageCreateBuilder() {
        return new NotionPageCreateBuilder();
    }
}

module.exports = DefaultNotionNodeFactory;