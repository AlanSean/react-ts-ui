/*
 * @Author: Alan
 * @LastEditors: Alan
 */
export default function singleton(fn) {
  var result;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return result || (result = fn.apply(this, args));
  };
}