import {
  clone,
  getObjectLength
} from "@/util/util"
export default {
  props: ["bdata"],
  watch: {
    bdata: {
      deep: true,
      handler() {
        debugger
        if (
          !this.bdata ||
          !getObjectLength(this.bdata)
        ) {
          return
        }
        console.warn('controls mixin bdata change')
        this.preventAutoChange()
        let parseData = clone(this.bdata)
        if (this.$parseData) {
          parseData = this.$parseData(clone(this.bdata))
        }
        if (this.$change) {
          this.$change(parseData)
        }
        this.props = parseData
      }
    },
    props: {
      deep: true,
      handler(newData, oldData) {
        if (this.autoChange) {
          return
        }
        console.warn('controls mixin props change')
        let tempData = clone(this.props)
        if (this.$change) {
          this.$change(tempData)
        }
        if (this.$reverseData) {
          this.$emit("change", this.$reverseData(tempData))
        } else {
          this.$emit("change", tempData)
        }
      }
    }
  },
  created() {
    this.preventAutoChange()
    let parseData = clone(this.bdata)
    if (this.$parseData) {
      parseData = this.$parseData(clone(this.bdata))
    }
    if (this.$change) {
      this.$change(parseData)
    }
    if (getObjectLength(this.bdata)) {
      this.props = parseData
    }
  },
  methods: {
    preventAutoChange() {
      // 当手动变化props时，防止多次触发pros watch 引起多次执行
      this.autoChange = true
      setTimeout(() => {
        this.autoChange = false
      }, 500)
    }
  }
}
