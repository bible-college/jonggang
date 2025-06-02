class MultiActionNode {
  constructor() {
    this.nodes = [];
  }

  add(node) {
    this.nodes.push(node);
  }

  execute(input) {
    const results = [];
    for (const node of this.nodes) {
      if (typeof node.execute === 'function') {
        const result = node.execute(input);
        results.push(result);
      }
    }
    return results;
  }

  getType() {
    return 'multi-action';
  }
}

module.exports = MultiActionNode;
