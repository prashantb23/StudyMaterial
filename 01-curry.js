function sumFn(a){
  return function(b){
    if(b !== undefined){
      return sumFn(a +b);
    }
    return a;
  }
}
console.log(sumFn(10)(20)(30)()); // Output: 60



function sumFn(...args) {
    const sum = args.reduce((acc, val) => acc + val, 0); // Sum all current arguments
    return function (...nextArgs) {
        return nextArgs.length ? sumFn(sum, ...nextArgs) : sum; // Recursively call if arguments exist
    };
}

// Examples:
console.log(sumFn(10)(20)(30)());         // Output: 60
console.log(sumFn(5, 10)(15)(20, 30)());  // Output: 80
console.log(sumFn(100, 200, 300)());      // Output: 600
