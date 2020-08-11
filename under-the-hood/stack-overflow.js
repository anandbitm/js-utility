// count stack frame

var counter = 0;
try {
  function foo() {
    counter += 1;
    foo();
  }
  foo();
} catch (e) {
  console.error(e);
  console.log('counter =', counter);
}