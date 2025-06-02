// src/factory/slack/SlackFeatureFactory.js

const SendMessageFactory = require('./SendMessageFactory');
const ReadMessageFactory = require('./ReadMessageFactory');

class SlackFeatureFactory {
  constructor() {
    // 사용할 수 있는 기능 팩토리들을 등록
    this.features = {
      sendMessage: new SendMessageFactory(),
      readMessage: new ReadMessageFactory(),
    };
  }

  /**
   * 기능 키 목록 반환 (예: ['sendMessage', 'readMessage'])
   */
  getAvailableFeatures() {
    return Object.keys(this.features);
  }

  /**
   * 기능 키를 기반으로 팩토리 반환
   * @param {string} featureName
   * @returns {AbstractActionFactory}
   */
  getFactoryByName(featureName) {
    const factory = this.features[featureName];
    if (!factory) {
      throw new Error(`기능 "${featureName}"은 존재하지 않습니다.`);
    }
    return factory;
  }
}

module.exports = SlackFeatureFactory;
