import { document } from './global.js'

const getScrollTop = function () {
  return document.documentElement.scrollTop || document.body.scrollTop
}

const debounce = function (func, wait, immediate) {
  let timeout;
  let result;
  let context
  return function (...args) {
    context = this;
    const later = function () {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
}

const throttle = function (func, wait) {
  let context
  let args
  let timeout;
  let result;
  let previous = 0;
  const later = function () {
    previous = new Date();
    timeout = null;
    result = func.apply(context, args);
  };
  return function (...args) {
    const now = new Date();
    const remaining = wait - (now - previous);
    context = this;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  }
}

export {
  getScrollTop,
  debounce,
  throttle
}