// src/nodes/builders/youtube/YouTubeReadRecentLikedVideoBuilder.js
// 빌더는 자신이 빌드할 노드를 임포트합니다.
// 경로 수정: actions/youtube 폴더로 바로 이동합니다.
const YouTubeReadRecentLikedVideoNode = require('../../actions/YoutubeLike/YouTubeReadRecentLikedVideoNode');

/**
 * @class YouTubeReadRecentLikedVideoBuilder
 * YouTubeReadRecentLikedVideoNode를 생성하는 빌더.
 */
class YouTubeReadRecentLikedVideoBuilder {
    constructor() {
        // 현재 YouTubeReadRecentLikedVideoNode는 생성자 인자를 받지 않으므로,
        // 이 빌더에 특별히 저장하거나 설정할 속성은 없습니다.
    }

    /**
     * YouTubeReadRecentLikedVideoNode의 새 인스턴스를 빌드하고 반환합니다.
     * @returns {YouTubeReadRecentLikedVideoNode} 새로 생성된 YouTubeReadRecentLikedVideoNode 인스턴스.
     */
    build() {
        return new YouTubeReadRecentLikedVideoNode();
    }
}

module.exports = YouTubeReadRecentLikedVideoBuilder;