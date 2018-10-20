export function clone(data) {
  return JSON.parse(JSON.stringify(data))
}
export function randomId() {
  return "id" + parseInt(Math.random() * 100000)
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}
export function compare(data1, data2) {
  var flag = true
  for (var i in data1) {
    if (isObject(data1[i])) {
      flag = compare(data1[i], data2[i])
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
    if (isObject(data1[i])) {
      extendDeep(data1[i], data2[i])
    } else {
      data2[i] = data1[i]
    }
  }
}
