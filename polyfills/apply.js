// es6
Function.prototype.applyFn = function (context, ...args) {
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...arguments[1]);
    delete context[fn];
    return result;
};

//es5
Function.prototype.applyFx = function (context, params) {
    var fn = Math.random();

    context[fn] = this;
    var args = [];
    // arguments are saved in strings, using args
    for (var i = 0, len = params.length; i < len; i++) {
        args.push("params[" + i + "]");
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

display.applyFn(context, ['hi', 'iam']);
display.applyFx(context, ['hi', 'i\am']);