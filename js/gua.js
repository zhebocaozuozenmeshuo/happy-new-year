const log = function() {
  console.log.apply(console, arguments)
}
const e = function(sel) {
  return document.querySelector(sel)
}
// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}
