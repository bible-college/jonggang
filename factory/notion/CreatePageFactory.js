// src/factory/notion/CreatePageFactory.js

const AbstractFeatureFactory = require('../../core/AbstractFeatureFactory');
const CreatePageCommand = require('../../command/CreatePageCommand');

class CreatePageFactory extends AbstractFeatureFactory {
  createCommand() {
    return new CreatePageCommand();
  }

  getDisplayName() {
    return 'Notion 페이지 생성';
  }

  // ✅ Notion 전용으로 추가 가능
  getPageTemplateOptions() {
    return ['회의록', '업무 보고서', '할 일 리스트'];
  }
}

module.exports = CreatePageFactory;
