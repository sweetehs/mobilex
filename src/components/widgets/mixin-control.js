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
        if(this.$parseData){
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
        setTimeout(()=>{
          this.autoChange = false
        },1000)
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
    //暂存一下默认数据
    this.defaultData = clone(this.props)
    if (this.$parseData) {
      this.props = this.$parseData(clone(this.bdata))
    } else {
      // 如果bdata为空 则不进行赋值
      if (getObjectLength(this.bdata)) {
        this.props = clone(this.bdata)
      }
    }
  }
}
