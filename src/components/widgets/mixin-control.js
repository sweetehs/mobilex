import {
  clone,
  extendDeep,
  getObjectLength
} from "@/util/util"
export default {
  props: ["bdata"],
  watch: {
    bdata: {
      deep: true,
      handler() {
        let parseData = clone(this.bdata)
        if (this.$parseData) {
          parseData = this.$parseData(clone(this.bdata))
        }
        if (
          JSON.stringify(parseData) == JSON.stringify(this.props) ||
          !this.bdata
        ) {
          return
        }
        console.warn('controls mixin bdata change')
        this.preventAutoChange()
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
          // 把change的数据传给外面，不在watch里面修改，防止死循环，在外部在通过props传进来来
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
    if (getObjectLength(this.bdata)) {
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
  methods: {
    preventAutoChange() {
      // 当代码变化props时，防止多次触发props watch 引起多次执行
      this.autoChange = true
      setTimeout(() => {
        this.autoChange = false
      }, 500)
    }
  }
}
