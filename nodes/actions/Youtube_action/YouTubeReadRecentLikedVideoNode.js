
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand'); 

class YouTubeReadRecentLikedVideoReceiver {
    readRecentLikedVideos() {
    return `최근 좋아요 받은 영상: ai의 트랜드에 관하여`;
    }
}

class YouTubeReadRecentLikedVideoCommand extends ICommand {

    constructor(receiver) {
        super();
        this.receiver = receiver;
    }

    execute() {
        const result = this.receiver.readRecentLikedVideos(); // 수신자의 실제 작업 호출
        return result; // 읽어온 데이터를 반환
    }
}

class YouTubeReadRecentLikedVideoNode extends Node {

    constructor() {
        super(); 
        this.receiver = new YouTubeReadRecentLikedVideoReceiver();
        this.command = new YouTubeReadRecentLikedVideoCommand(this.receiver);
    }

    execute(context = {}) {
        const recentLikedVideoDetails = this.command.execute();

        return { ...context, youtubeRecentLikedVideoDetails: recentLikedVideoDetails };
    }
}

module.exports = YouTubeReadRecentLikedVideoNode;