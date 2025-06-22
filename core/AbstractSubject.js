// src/core/AbstractSubject.js 또는 src/patterns/observable/AbstractSubject.js
class AbstractSubject {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}
module.exports = AbstractSubject;