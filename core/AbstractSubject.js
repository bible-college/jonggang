
class AbstractSubject {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer);
        console.log(`[AbstractSubject] 옵저버 ${observer.constructor.name} 등록됨.`);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
        console.log(`[AbstractSubject] 옵저버 ${observer.constructor.name} 해지됨.`);
    }

    notify(data) {
        console.log(`[AbstractSubject] 모든 옵저버에게 알림: ${JSON.stringify(data)}`);
        this.observers.forEach(observer => observer.update(data));
    }
}
module.exports = AbstractSubject;