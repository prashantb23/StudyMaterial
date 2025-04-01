function debounce(fn, delay, context){

  let timer;

  return function(...args) {

    if(timer) {
      clearTimeout(timer);
    }
    
    context = this ?? context;
    timer = setTimeout(()=> {
      fn.apply(context, args);
    }, delay);
    
  }
  
}
