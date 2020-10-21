// Curry 

const add = (a) => (b) => (c) => (d) => (e) => a + b + c + d + e;
const res = add(1)(2)(3)(4)(5);

// infinite curry
const curry = function (x) {
  return function (y) {
    if (y) {
      return curry( x+ y);
    }
    return x;
  }
};

const result = curry(1)(2)(3)(4)();
console.log(result);