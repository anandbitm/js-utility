Function.prototype.bindFn = function (...args) {
    let fn = this,
        context = args[0],
        params = args.slice(1);
        
    return function (...args) {
        fn.apply(context, [...params, ...args]);
    }
}

function display(a, b) {
    console.log(a, b, this.name);
}

const context = {
    name: "Rajiv Ranjan"
};

let displayFn = display.bindFn(context, "i", "am");
displayFn();