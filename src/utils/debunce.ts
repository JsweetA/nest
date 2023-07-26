export function debounce(fun, wait = 1500) {
  //ES6语法 wait=1500 设置参数默认值，如果没有输入wait就会使用1500
  let timeout = null;
  return function () {
    if (timeout) {
      //如果存在定时器就清空
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      fun();
    }, wait);
  };
}
