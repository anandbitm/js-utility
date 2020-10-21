const compute = (collection, business, initial) => {
    let result = initial;
    for(let i=0; i< collection.length; i++){
      result = business(collection[i], result);
    }
  
    return result;
  }
  
  let result = compute([1,2,3,4,5,6,7,8,9,10], function(val, result){
    return val + result;
  }, 0);
  
  let result1 = compute([1,2,3,4,5,6,7,8,9,10], function(val, result){
    return val * result;
  }, 1);
  
  console.log('Added - ', result);
  console.log('Multiply - ', result1);