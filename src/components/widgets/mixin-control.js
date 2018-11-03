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
        if (this.$parseData) {
          this.$parseData(clone(this.bdata))
        } else {
          this.props = clone(this.bdata)
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
    debugger
    if(this.$parseData){
      this.$parseData(clone(this.bdata))
    }else{
      // 如果bdata为空 则不进行赋值
      if(getObjectLength(this.bdata)){
        this.props = clone(this.bdata)
      }
    }
  }
}
