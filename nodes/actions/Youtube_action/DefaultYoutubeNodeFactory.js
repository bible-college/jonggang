
const AbstractNodeFactory = require('../../../core/AbstractNodeFactory'); // AbstractNodeFactory를 require
const YouTubeReadRecentLikedVideoBuilder = require('./YouTubeReadRecentLikedVideoBuilder');

/**
 * @class DefaultSlackNodeFactory
 * Slack 서비스와 관련된 노드 빌더를 생성하는 구체적인 팩토리.
 */
class DefaultYoutubeNodeFactory extends AbstractNodeFactory { 
    constructor() {
        super('youtube'); // 서비스 이름 전달
    }

    createYouTubeReadRecentLikedVideoBuilder() {
        return new YouTubeReadRecentLikedVideoBuilder();
    }
}

module.exports = DefaultYoutubeNodeFactory;