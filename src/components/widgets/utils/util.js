export function clone(data) {
  return data ? JSON.parse(JSON.stringify(data)) : {}
}
export function randomId() {
  return "id" + parseInt(Math.random() * 100000000000)
}