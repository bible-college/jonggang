// src/factory/notion/CreatePageFactory.js

const NotionFeatureFactory = require('./NotionFeatureFactory');
const CreatePageCommand = require('../../command/CreatePageCommand');
const NotionSchema = require('../../schema/NotionSchema');
const JSONFormatter = require('../../formatter/JSONFormatter');

class CreatePageFactory extends NotionFeatureFactory {
  createCommand() {
    return new CreatePageCommand();
  }

  getDisplayName() {
    return 'Notion 페이지 생성';
  }
}

module.exports = CreatePageFactory;
