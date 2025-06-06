// src/nodes/triggers/strategies/index.js
const ITriggerStrategy = require('./ITriggerStrategy');
const TimeTriggerStrategy = require('./TimeTriggerStrategy');
const FileTriggerStrategy = require('./FileTriggerStrategy'); // 아래에 추가될 파일

module.exports = {
    ITriggerStrategy,
    TimeTriggerStrategy,
    FileTriggerStrategy
};