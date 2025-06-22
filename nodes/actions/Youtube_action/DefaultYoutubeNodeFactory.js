
const AbstractNodeFactory = require('../../../core/AbstractNodeFactory'); // AbstractNodeFactory를 require
const YouTubeReadRecentLikedVideoBuilder = require('./YouTubeReadRecentLikedVideoBuilder');

class DefaultYoutubeNodeFactory extends AbstractNodeFactory { 
    constructor() {
        super('youtube'); 
    }

    createYouTubeReadRecentLikedVideoBuilder() {
        return new YouTubeReadRecentLikedVideoBuilder();
    }
}

module.exports = DefaultYoutubeNodeFactory;