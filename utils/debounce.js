var debounce = function (func, delay) {
    var inDebounce;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(function () {
            func.apply(context, args)
        }, delay);
    }
}

var sum = function (a, b) {
    console.log(a + ' + ' + b + ' = ' + (a + b));
}

var debounceHandler = debounce(sum, 1000);

debounceHandler(10, 20);
debounceHandler(30, 50);
debounceHandler(100, 200);
debounceHandler(300, 200);