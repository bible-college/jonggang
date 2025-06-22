
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand'); 

class YouTubeReadRecentLikedVideoReceiver {
    readRecentLikedVideos(likedVideoInfoFromContext) {
    return `[Mock Data] 최근 좋아요 받은 영상 (ID: ${likedVideoInfoFromContext.id})의 상세 정보: 비디오 제목 - '트렌디한 댄스', 좋아요 수 - '1500', 채널 - '댄스 스튜디오'`;
    }
}

class YouTubeReadRecentLikedVideoCommand extends ICommand {

    constructor(receiver) {
        super();
        this.receiver = receiver;
    }

    execute(likedVideoInfoFromContext) {
        console.log(`[YouTubeReadRecentLikedVideoCommand] 커맨드 실행: YouTube 최신 좋아요 받은 영상 읽기 준비`);
        const result = this.receiver.readRecentLikedVideos(likedVideoInfoFromContext); // 수신자의 실제 작업 호출
        console.log(`[YouTubeReadRecentLikedVideoCommand] 커맨드 실행 완료. 결과: ${result}`);
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
        console.log(`[YouTubeReadRecentLikedVideoNode] 노드 실행: 내부 커맨드 호출 준비.`);

        const likedVideoInfoFromTrigger = {
            id: context.id,
            service: context.service,
            message: context.message
        };

        const recentLikedVideoDetails = this.command.execute(likedVideoInfoFromTrigger);
        console.log(`[YouTubeReadRecentLikedVideoNode] 노드 실행 완료.`);

        return { ...context, youtubeRecentLikedVideoDetails: recentLikedVideoDetails };
    }
}

module.exports = YouTubeReadRecentLikedVideoNode;