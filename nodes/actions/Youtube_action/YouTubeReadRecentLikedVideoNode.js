// src/nodes/actions/youtube/YouTubeReadRecentLikedVideoNode.js
const Node = require('../../../core/Node');
const ICommand = require('../../../core/ICommand'); // ICommand 인터페이스 임포트

// --- YouTubeReadRecentLikedVideoReceiver 정의 (노드 파일 내부에 포함) ---
/**
 * @class YouTubeReadRecentLikedVideoNode.YouTubeReadRecentLikedVideoReceiver
 * YouTube API를 통해 '최신 좋아요 받은 영상 목록'을 읽어오는 수신자 역할.
 * 실제 API 호출은 없으며, 개념적인 처리를 수행합니다.
 */
class YouTubeReadRecentLikedVideoReceiver {
    readRecentLikedVideos(likedVideoInfoFromContext) {
        console.log(`[YouTubeAPI - Receiver] YouTube 최신 좋아요 받은 영상 목록 읽기 요청.`);
        console.log(`[YouTubeAPI - Receiver] Context로부터 받은 좋아요 정보:`, likedVideoInfoFromContext);
        
        if (likedVideoInfoFromContext && likedVideoInfoFromContext.id) {
            return `[Mock Data] 최근 좋아요 받은 영상 (ID: ${likedVideoInfoFromContext.id})의 상세 정보: 비디오 제목 - '트렌디한 댄스', 좋아요 수 - '1500', 채널 - '댄스 스튜디오'`;
        } else {
            return `[Mock Data] 최근 좋아요 받은 영상 정보 없음 또는 불충분.`;
        }
    }
}

// --- YouTubeReadRecentLikedVideoCommand 정의 (노드 파일 내부에 포함) ---
/**
 * @class YouTubeReadRecentLikedVideoNode.YouTubeReadRecentLikedVideoCommand
 * YouTube 최신 좋아요 받은 영상 목록을 읽는 작업을 캡슐화하는 구체적인 커맨드 (Concrete Command).
 * ICommand 인터페이스를 구현하며, 이 노드 파일 내부에 정의됩니다.
 */
class YouTubeReadRecentLikedVideoCommand extends ICommand {
    /**
     * @param {YouTubeReadRecentLikedVideoReceiver} receiver - 실제 작업을 수행할 수신자 인스턴스.
     */
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }

    /**
     * 커맨드를 실행하여 수신자에게 좋아요 받은 영상 목록 읽기 작업을 지시합니다.
     * execute 시점에 context에서 받은 좋아요 정보를 receiver에 전달합니다.
     * @param {Object} likedVideoInfoFromContext - 워크플로우 컨텍스트에서 추출된 좋아요 관련 정보 (예: { id: 'videoId' })
     * @returns {string} 좋아요 받은 영상 정보.
     */
    execute(likedVideoInfoFromContext) {
        console.log(`[YouTubeReadRecentLikedVideoCommand] 커맨드 실행: YouTube 최신 좋아요 받은 영상 읽기 준비`);
        const result = this.receiver.readRecentLikedVideos(likedVideoInfoFromContext); // 수신자의 실제 작업 호출
        console.log(`[YouTubeReadRecentLikedVideoCommand] 커맨드 실행 완료. 결과: ${result}`);
        return result; // 읽어온 데이터를 반환
    }
}

/**
 * @class YouTubeReadRecentLikedVideoNode
 * YouTube 트리거에서 받은 '최신 좋아요' 정보를 기반으로
 * 해당 영상의 상세 정보를 읽어오는 워크플로우 노드.
 * Receiver와 Command 클래스가 이 파일 내부에 정의되어 있습니다.
 */
class YouTubeReadRecentLikedVideoNode extends Node {
    /**
     * YouTubeReadRecentLikedVideoNode의 생성자.
     * 이 노드는 특정 초기 설정 인자가 필요 없습니다.
     * execute 시점에 context로부터 필요한 정보를 가져옵니다.
     */
    constructor() {
        super(); // WorkflowComponent 생성자 호출

        this.receiver = new YouTubeReadRecentLikedVideoReceiver();
        this.command = new YouTubeReadRecentLikedVideoCommand(this.receiver);
    }

    /**
     * WorkflowComponent의 execute() 메서드 구현.
     * 이 노드가 워크플로우에서 실행될 때 호출됩니다.
     * `context`에서 트리거가 제공한 좋아요 정보를 읽습니다.
     * @param {Object} context - 워크플로우 실행 컨텍스트.
     * @returns {Object} 업데이트된 워크플로우 컨텍스트 (youtubeRecentLikedVideoDetails 포함).
     */
    execute(context = {}) {
        console.log(`[YouTubeReadRecentLikedVideoNode] 노드 실행: 내부 커맨드 호출 준비.`);

        // YouTubeLikeTriggerNode에서 context에 추가한 'id', 'service', 'message'를 활용합니다.
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