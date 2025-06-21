
const WorkflowComponent = require('./WorkflowComponent');
const EventStore = require('./EventStore');

class NodeExecutionDecorator extends WorkflowComponent {
    static idCounter = 0;

    constructor(workflowComponent) {
        super();
        this.wrappedComponent = workflowComponent;
        
        this.nodeId = NodeExecutionDecorator.idCounter++; 
        
        this.nodeName = this.wrappedComponent.constructor.name;

        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                return Reflect.get(target.wrappedComponent, prop, receiver);
            }
        });
    }

    execute() {
        EventStore.logEvent({
            nodeId: this.nodeId,
            nodeName: this.nodeName,
            timestamp: new Date().toISOString(),
            status: 'STARTED',
            message: `[${this.nodeName}] 실행 시작 (ID: ${this.nodeId})`
        });

        let result;
        try {
            result = this.wrappedComponent.execute();

            EventStore.logEvent({
                nodeId: this.nodeId, 
                nodeName: this.nodeName,
                timestamp: new Date().toISOString(),
                status: 'SUCCESS',
                message: `[${this.nodeName}] 실행 성공 (ID: ${this.nodeId})`
            });
        } catch (error) {
            EventStore.logEvent({
                nodeId: this.nodeId,
                nodeName: this.nodeName,
                timestamp: new Date().toISOString(),
                status: 'FAILURE',
                message: `[${this.nodeName}] 실행 실패 (ID: ${this.nodeId}) - ${error.message}`
            });
            throw error;
        }

        return result;
    }

    add(component) {
        this.wrappedComponent.add(component);
    }

    remove(component) {
        this.wrappedComponent.remove(component);
    }
}

module.exports = NodeExecutionDecorator;