// src/main.js

const WorkflowEngine = require('./facade/WorkflowEngine');

// 트리거 및 액션 팩토리들
const TimeTriggerFactory = require('./factory/trigger/TimeTriggerFactory');

const SendMessageFactory = require('./factory/slack/SendMessageFactory');
const ReadMessageFactory = require('./factory/slack/ReadMessageFactory');
const CreatePageFactory = require('./factory/notion/CreatePageFactory');

function main() {
  const triggerFactory = new TimeTriggerFactory();

  const actionFactories = [
    new SendMessageFactory(),
    new ReadMessageFactory(),
    new CreatePageFactory(),
  ];

  const engine = new WorkflowEngine(triggerFactory, actionFactories);
  engine.run();
}

main();
