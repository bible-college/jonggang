// src/nodes/builders/notion/NotionPageCreateNodeBuilder.js (수정)
const NotionPageCreateNode = require('../../actions/notion/NotionPageCreateNode');
// const { v4: uuidv4 } = require('uuid'); // uuid 라이브러리 제거

class NotionPageCreateNodeBuilder {
    constructor() {
        // this.id = uuidv4(); // id 속성 제거
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