// throttle js file

function throttle {
 let isThrottle = false;

  return function(...args) {
    if(!isThrottle) { 
      fn.apply(this, args);
      isThrottle =  true;
     }
    setTimeout(() => isThrottle = false, delay);
  }
}




// approach 1

function throttle(fn, delay) {
    let lastTime = 0; // Stores the last execution time
    let timer; // Stores timeout ID for delayed execution

    return function (...args) {
        let context = this; // Preserve `this` reference
        let now = Date.now(); // Get current timestamp

        // If enough time has passed, execute immediately
        if (now - lastTime >= delay) {
            fn.apply(context, args);
            lastTime = now; // Update last execution time
        } else {
            // Otherwise, schedule execution after remaining time
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
                lastTime = Date.now(); // Update last execution time after execution
            }, delay - (now - lastTime)); // Correct delay calculation
        }
    };
}


window.addEventListener('scroll', throttle(() => {
    console.log('Scroll event triggered!');
}, 1000));
