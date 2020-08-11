
function async(generator) {
    const iterator = generator();
    const iteration = iterator.next();

    function iterate(iteration){
        if(iteration.done)
            return iteration.value;

        const promise = iteration.value;

        promise.then((response) => {
            iterate(iterator.next(response));
        });
    }

    iterate(iteration);
}

console.log('Program started!!!');
async(function* () {
    console.log('Running....');

    const res1 = yield new Promise((resolve, reject) => {
        setTimeout(() => resolve(100), 5000);
    });

    console.log('Response1', res1);

    const res2 = yield new Promise((resolve, reject) => {
        setTimeout(() => resolve(res1 * 10), 5000);
    });

    console.log('Response2', res2);
});
console.log('Program finished!!!')