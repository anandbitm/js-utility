var throttle = function (func, limit) {
    var inThrottle;
    return function () {
        var args = arguments;
        var context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function () {
                inThrottle = false;
            }, limit);
        }
    }
}

var sum = function (a, b) {
    console.log(a + ' + ' + b + ' = ' + (a + b));
}

var throttleHandler = throttle(sum, 1000);

setTimeout(throttleHandler.bind(this, 10, 20), 300);
setTimeout(throttleHandler.bind(this, 20, 20), 800);
setTimeout(throttleHandler.bind(this, 30, 20), 2000);
setTimeout(throttleHandler.bind(this, 40, 20), 2200);
setTimeout(throttleHandler.bind(this, 50, 20), 2500);
setTimeout(throttleHandler.bind(this, 60, 20), 3000);
setTimeout(throttleHandler.bind(this, 70, 200), 4000);