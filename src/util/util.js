export function clone(data) {
  return JSON.parse(JSON.stringify(data))
}
export function randomId() {
  return "id" + parseInt(Math.random() * 100000)
}
