// src/nodes/actions/index.js
const slackActions = require('./slack');
const notionActions = require('./notion');

module.exports = {
    ...slackActions,
    ...notionActions,
    // 다른 서비스의 액션 노드들도 여기에 추가하여 통합합니다.
};