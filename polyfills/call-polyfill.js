// es6
Function.prototype.callFn = function (context, ...args) {
    const fn = Symbol();

    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};

//es5
Function.prototype.callFx = function () {
    var context = arguments[0];
    var fn = Math.random();

    context[fn] = this;

    var args = [];

    // arguments are saved in strings, using args
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push("arguments[" + i + "]");
    }

    // strings are reparsed into statements in the eval method
    var result = eval("context[fn](" + args + ")");
    delete context[fn];
    return result;
};

function display(a, b) {
    console.log(a, b, this.name);
}

const context = {
    name: "Rajiv Ranjan"
};

display.callFn(context, 'hi', 'iam');
display.callFx(context, 'hi', 'i\am');