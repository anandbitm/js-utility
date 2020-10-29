const curry = (a) => (b) => (c) => a + b + c;

function uncurry(fn) {
    // implement 
    return function (...props) {
        return props.reduce((fn, item) => fn(item), fn);
    }
}

let sum = uncurry(curry);
console.log(sum(1, 2, 3));