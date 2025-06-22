
class WorkflowMemento {
    constructor(nodesState) {
        this._nodesState = nodesState;
    }
    getSavedState() {
        return this._nodesState;
    }
}

module.exports = WorkflowMemento;