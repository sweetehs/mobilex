export function clone(data) {
  return data ? JSON.parse(JSON.stringify(data)) : {}
}
export function randomId() {
  return "id" + parseInt(Math.random() * 100000000000)
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]"
}
export function compare(data1, data2) {
  var flag = true
  for (var i in data1) {
    if (isObject(data1[i]) && flag) {
      flag = compare(data1[i], data2[i] || {})
    } else {
      if (data1[i] !== data2[i]) {
        flag = false
      }
    }
  }
  return flag
}
export function extendDeep(data1, data2) {
  for (var i in data1) {
    if (!data2[i]) {
      data2[i] = {}
    }
    if (isObject(data1[i])) {
      extendDeep(data1[i], data2[i])
    } else {
      data2[i] = data1[i]
    }
  }
}
export function loop(arr, judge, callback, parent) {
  if (!arr) {
    return
  }
  arr.forEach((data, index) => {
    var flag = true
    if (judge(data)) {
      if(callback){
        flag = callback(data, index, arr, parent)
      }
    }
    if (isArray(data.children) && flag !== false) {
      loop(data.children, judge, callback, data)
    }
  })
}
export function getComputedStyle($el) {
  return document.defaultView.getComputedStyle($el)
}
export function parseToRem(arr) {
  arr.forEach((data) => {
    if (data.children) {
      parseToRem(data.children)
    }
    if (data.style) {
      for (var i in data.style) {
        let _style = data.style[i]
        data.style[i] = _style.replace(/(\d.*?)(px)/g, (a, b, c) => {
          return (parseInt(b) / 100) + "rem"
        })
      }
    }
  })
}
export function getObjectLength(obj){
  let l = 0
  for(let i in obj){
    l ++ 
  }
  return l
}
export function handelCssData(css){
  if(!css){
    return 
  }
  if(css["background-image"]){
    css["background-image"] = `url(${css["background-image"]})`
  }
  return clone(css)
}