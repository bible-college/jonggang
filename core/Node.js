class Node {
    
    execute(context = {}) {
        throw new Error('execute() must be implemented by concrete components.');
    }

    add(component) {
        throw new Error(`add() is not supported by ${this.constructor.name}.`);
    }

    remove(component) {
        throw new Error(`remove() is not supported by ${this.constructor.name}.`);
    }
}

module.exports = Node;