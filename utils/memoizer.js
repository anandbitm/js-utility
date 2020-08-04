function memoizer(fun) {
    let cache = {};
    return function (...n) {
        if (cache[n] != undefined) {
            return cache[n];
        } else {
            let result = fun.apply(this, arguments);
            cache[n] = result;
            return result;
        }
    }
}

// fibonacci memorize
const fibonacci = memoizer(function (n) {
    if (n <= 1) {
        console.log(1);
        return 1;
    }
    else {
        var res = fibonacci(n - 2) + fibonacci(n - 1);
        console.log(res);
        return res;
    }
});

fibonacci(10);

// sum memorize
const sum = memoizer(function (a, b) {
    return a + b
});

console.log(sum(10, 20));
console.log(sum(10, 20));
console.log(sum(10, 30));

// factorial memorize
const factorial = memoizer(function (n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
});

console.log(factorial(5));
console.log(factorial(5));
console.log(factorial(10));