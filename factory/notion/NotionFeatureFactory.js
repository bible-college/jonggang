// src/factory/notion/NotionFeatureFactory.js

const CreatePageFactory = require('./CreatePageFactory');
// 필요한 다른 기능 팩토리도 여기에 import 가능

class NotionFeatureFactory {
  constructor() {
    this.features = {
      createPage: new CreatePageFactory(),
      // ex: updatePage, readDatabase 등도 나중에 추가 가능
    };
  }

  /**
   * 사용 가능한 기능 목록을 반환
   */
  getAvailableFeatures() {
    return Object.keys(this.features);
  }

  /**
   * 기능 이름으로 팩토리 객체 반환
   * @param {string} featureName
   */
  getFactoryByName(featureName) {
    const factory = this.features[featureName];
    if (!factory) {
      throw new Error(`기능 "${featureName}"은 존재하지 않습니다.`);
    }
    return factory;
  }
}

module.exports = NotionFeatureFactory;
