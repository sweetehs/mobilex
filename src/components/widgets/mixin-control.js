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
        let parseData = clone(this.bdata)
        if (this.$parseData) {
          parseData = this.$parseData(clone(this.bdata))
        }
        if (
          !this.bdata ||
          !getObjectLength(this.bdata)
        ) {
          return
        }
        console.warn('controls mixin bdata change')
        this.props = parseData
        this.autoChange = true
        this.preventAutoChange()
      }
    },
    props: {
      deep: true,
      handler(newData, oldData) {
        if (this.autoChange) {
          return
        }
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          console.warn('controls mixin props change')
          this.$change && this.$change()
          if (this.$reverseData) {
            this.$emit("change", this.$reverseData(clone(this.props)))
          } else {
            this.$emit("change", clone(this.props))
          }
        }, 200)
      }
    }
  },
  created() {
    this.preventAutoChange()
    this.$change && this.$change()
    if (getObjectLength(this.bdata)) {
      if (this.$parseData) {
        this.props = this.$parseData(clone(this.bdata))
      } else {
        this.props = clone(this.bdata)
        // 如果bdata为空 则不进行赋值
      }
    }
  },
  methods: {
    preventAutoChange() {
      // 当tdata和created变化时，不触发watch props
      this.autoChange = true
      setTimeout(() => {
        this.autoChange = false
      }, 1000)
    }
  }
}
