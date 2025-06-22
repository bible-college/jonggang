const Node = require('./Node'); 

class NodeDecorator extends Node {
    constructor(component) {
        super();
        this.wrappedComponent = component;
    }
    execute(context = {}) {
        return this.wrappedComponent.execute(context); 
    }
    add(component) {
        return this.wrappedComponent.add(component);
    }

    remove(component) {
        return this.wrappedComponent.remove(component);
    }
}

module.exports = NodeDecorator;