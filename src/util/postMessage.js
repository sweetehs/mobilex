function postMessage(s, w) {
  this.callbacks = {}
  this.$source = s
  this.$window = w
  this.isReceive = false
  this.receive()
}
postMessage.prototype = {
  receive(type, callback) {
    if (type && !this.callbacks[type]) {
      this.callbacks[type] = callback
    }
    if (!this.isReceive) {
      var that = this
      this.$window.addEventListener("message", (event) => {
        if (!that.$source) {
          that.$source = event.source
        }
        if (event && event.data && event.data.type && event.data.type.indexOf('mobilex') !== -1) {
          let callbackName = event.data.type.replace("mobilex-", "")
          that.callbacks[callbackName] && that.callbacks[callbackName](event.data.data)
        }
      })
      this.isReceive = true
    }
  },
  send(type, data) {
    this.$source.postMessage({
      type: "mobilex-" + type,
      data: data
    }, "*")
  }
}
export default postMessage
