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
        let temp = ""
        if(!getObjectLength(this.bdata)){
          temp = clone(this.defaultData)
        }else{
          temp = clone(this.bdata)
        }
        if(this.$parseData){
          this.$parseData(temp)
        }else{
          this.props = clone(temp)
        }
      }
    },
    props: {
      deep: true,
      handler() {
        if (this.$reverseData) {
          this.$emit("change", this.$reverseData(clone(this.props)))
        } else {
          this.$emit("change", clone(this.props))
        }
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
