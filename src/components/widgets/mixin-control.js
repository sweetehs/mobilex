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
        if (JSON.stringify(this.props) === JSON.stringify(this.bdata)) {
          return
        }
        console.warn('controls mixin bdata change')
        let temp = ""
        if (!getObjectLength(this.bdata)) {
          temp = clone(this.defaultData)
        } else {
          temp = clone(this.bdata)
        }
        if (this.$parseData) {
          this.$parseData(temp)
        } else {
          // 会造成执行watch props
          this.props = clone(temp)
        }
      }
    },
    props: {
      deep: true,
      handler(newData, oldData) {
        if (!getObjectLength(oldData)) {
          return
        }
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          console.warn('controls mixin props change')
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
    //暂存一下默认数据
    this.defaultData = clone(this.props)
    if (this.$parseData) {
      this.$parseData(clone(this.bdata))
    } else {
      // 如果bdata为空 则不进行赋值
      if (getObjectLength(this.bdata)) {
        this.props = clone(this.bdata)
      }
    }
  }
}
