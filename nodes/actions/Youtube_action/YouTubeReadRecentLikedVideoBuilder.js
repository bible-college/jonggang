const YouTubeReadRecentLikedVideoNode = require('./YouTubeReadRecentLikedVideoNode');

class YouTubeReadRecentLikedVideoBuilder {
    constructor() {
    }

    build() {
        return new YouTubeReadRecentLikedVideoNode();
    }
}

module.exports = YouTubeReadRecentLikedVideoBuilder;