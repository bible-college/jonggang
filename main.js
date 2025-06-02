// src/main.js

const SlackFeatureFactory = require('./factory/slack/SlackFeatureFactory');
const TimeTriggerFactory = require('./factory/abstract/TimeTriggerFactory');
const WorkflowEngine = require('./facade/WorkflowEngine');

// 1️⃣ 사용자: Slack 플랫폼 선택
const platformFactory = new SlackFeatureFactory();

// 2️⃣ 사용자: Slack에서 사용할 기능 선택
const selectedFeatures = ['sendMessage']; // 또는 ['sendMessage', 'readMessage']

// 3️⃣ 사용자: 트리거 선택 (시간 기반)
const triggerFactory = new TimeTriggerFactory();

// 4️⃣ 워크플로우 실행
const engine = new WorkflowEngine(triggerFactory, platformFactory, selectedFeatures);
engine.run();
