import {
  clone
} from "@/util/util"
export default {
  props: ["bdata"],
  watch: {
    bdata: {
      deep: true,
      handler() {
        debugger
        if (!this.$parseData) {
          this.props = clone(this.bdata)
        } else {
          this.$parseData(clone(this.bdata))
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
    if(this.$parseData){
      this.$parseData(clone(this.bdata))
    }else{
      this.props = clone(this.bdata)
    }
  }
}
