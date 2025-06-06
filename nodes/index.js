// src/nodes/index.js
const AbstractNodeFactory = require('./AbstractNodeFactory');
const builders = require('./builders');
const composites = require('./composites');
const actions = require('./actions');
const factories = require('./factories');
const triggers = require('./triggers'); // 트리거 모듈 추가

module.exports = {
    AbstractNodeFactory,
    builders,
    composites,
    actions,
    factories,
    triggers // 트리거 모듈 내보내기
};