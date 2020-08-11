
const states = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};

const isThenable = promise => promise && typeof promise.then === 'function';

class PromiseV1 {
    constructor(executor) {
        this.state = states.PENDING;

        this.value = undefined;
        this.reason = undefined;

        this.thenQueue = [];
        this.finallyQueue = [];

        if (typeof executor === 'function') {
            executor(this.onFulfilled.bind(this), this.onRejected.bind(this));
        }
    }

    then(fulfilled, rejected) {
        const promise = new PromiseV1();
        this.thenQueue.push([promise, fulfilled, rejected]);

        if (this.state === states.FULFILLED) {
            this.fullfilled();
        } else if (this.state === states.REJECTED) {
            this.rejected();
        }

        return promise;
    }

    catch(rejected) {
        return this.then(undefined, rejected);
    }

    finally(sideEffect) {
        const promise = new PromiseV1()
        this.finallyQueue.push([promise, sideEffect]);

        return promise;
    }

    static resolve(value) {
        return new PromiseV1((resolve) => resolve(value));
    }

    static reject(reason) {
        return new PromiseV1((resolve, reject) => reject(reason))
    }

    static all(iterable) {
        return new PromiseV1((resolve, reject) => {
            let iterableSize = 0;
            const values = [];

            const add = (value, index) => {
                values[index] = value;
                if (values.filter(() => true).length === iterableSize) {
                    resolve(values);
                }
            };

            for (let item of iterable) {
                ((entry, index) => {
                    entry.then((value) => add(value, index), reject);
                })(item, iterableSize++);
            }
        });
    }

    static race(iterable) {
        return new PromiseV1((resolve, reject) => {

            for (let entry of iterable) {
                entry.then((value) => resolve(value));
            }
        });
    }

    /* private methods */
    fullfilled() {
        this.thenQueue.forEach(([promise, fulfilled]) => {
            if (typeof fulfilled === 'function') {
                const next = fulfilled(this.value);

                if (isThenable(next)) {
                    next.then(
                        value => promise.onFulfilled(value),
                        reason => promise.onRejected(reason)
                    );
                } else {
                    promise.onFulfilled(next);
                }
            } else {
                return promise.onFulfilled(this.value);
            }
        });

        this.finallyQueue.forEach(([promise, sideEffect]) => {
            sideEffect();
            promise.onFulfilled(this.value);
        });

        this.thenQueue = [];
        this.finallyQueue = [];
    }

    rejected() {
        this.thenQueue.forEach(([promise, fulfilled, rejected]) => {
            if (typeof rejected === 'function') {
                const next = rejected(this.reason);

                if (isThenable(next)) {
                    next.then(
                        value => promise.onFulfilled(value),
                        reason => promise.onRejected(reason)
                    );
                } else {
                    promise.onFulfilled(next);
                }
            } else {
                return promise.onRejected(this.reason);
            }
        });

        this.finallyQueue.forEach(([promise, sideEffect]) => {
            sideEffect();
            promise.onRejected(this.value);
        });

        this.thenQueue = [];
        this.finallyQueue = [];
    }

    onFulfilled(value) {
        if (this.state === states.PENDING) {
            this.state = states.FULFILLED;
            this.value = value;
            this.fullfilled();
        }
    }

    onRejected(reason) {
        if (this.state === states.PENDING) {
            this.state = states.REJECTED;
            this.reason = reason;
            this.rejected();
        }
    }
}

const promise = new PromiseV1((resolve, reject) => {
    setTimeout(() => {
        resolve('hey');
    }, 3000);
});

promise
    .then((response) => response)
    .then((response) => console.log(`${response}, i am rajiv.`))
    .finally(() => console.log('i am done'));

PromiseV1.resolve(100).then(x => console.log(x));

var p1 = new PromiseV1((resolve, rej) => setTimeout(() => resolve(1), 1000));
var p2 = new PromiseV1((resolve, rej) => setTimeout(() => resolve(2), 2000));
var p3 = new PromiseV1((resolve, rej) => setTimeout(() => resolve(3), 3000));

PromiseV1.all([p1, p2, p3]).then((x) => console.log(x));
PromiseV1.race([p1, p2, p3]).then((x) => console.log(x));