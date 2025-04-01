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
    let lastTime = 0;
    let timer;
    return function (...args) {

        let context = this;
        let now = Date.now();

        if (!lastTime) {
            fn.apply(context, args);
        } else {

            clearTimeout(timer);
            const diff = now - lastTime;
            timer = setTimeout(() => {
                if (diff >= delay) {
                    fn.apply(context, args);
                }
            }, delay - timer)

        }

        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        }

    }
}

window.addEventListener('scroll', throttle(() => {
    console.log('Scroll event triggered!');
}, 1000));
