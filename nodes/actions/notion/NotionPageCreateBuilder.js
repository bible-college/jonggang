
const NotionPageCreateNode = require('../../actions/notion/NotionPageCreateNode');

class NotionPageCreateNodeBuilder {
    constructor() {
        this.title = '';
        this.content = '';
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setContent(content) {
        this.content = content;
        return this;
    }

    build() {
        return new NotionPageCreateNode(this.title, this.content);
    }
}

module.exports = NotionPageCreateNodeBuilder;