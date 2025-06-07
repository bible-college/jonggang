// src/nodes/builders/notion/NotionPageCreateNodeBuilder.js

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
        // NotionPageCreateNode 생성자에 title, content만 전달합니다.
        const node = new NotionPageCreateNode(this.title, this.content);
        return node;
    }
}

module.exports = NotionPageCreateNodeBuilder;