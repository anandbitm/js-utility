let range = {
    from: 1,
    to: 10
};

range[Symbol.iterator] = function () {
    return {
        current: this.from,
        end: this.to,
        next: function () {
            if (this.current <= this.end) {
                this.current += 2;
                return { value: this.current, done: false };
            }
            else {
                return { done: true };
            }
        }
    }
}

for (let item of range) {
    console.log(item);
}

let collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
collection[Symbol.iterator] = function () {
    return {
        current: 0,
        items: this,
        next: function () {
            if (this.current + 2 <= this.items.length - 1) {
                this.current += 2;
                return { value: this.items[this.current], done: false };
            }
            else {
                return { done: true };
            }
        }
    }
}

for (let item of collection) {
    console.log(item);
}

function* fib(n) {
    const isInfinite = n === undefined;
    let current = 0;
    let next = 1;

    while (isInfinite || n--) {
        yield current;
        [current, next] = [next, current + next];
    }
}

var start = 0;
var iterator = fib();
while (start <= 10) {
    console.log(iterator.next());
    start++;
}