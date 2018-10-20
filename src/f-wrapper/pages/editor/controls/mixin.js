import { clone } from "@/util/util"
export default {
  props: ["bdata"],
  watch: {
    bdata: {
      deep: true,
      handler() {
        this.$parseData && this.$parseData(clone(this.bdata))
      }
    },
    list: {
      deep: true,
      handler() {
        this.$emit("change", this.$reverseData())
      }
    }
  },
  created(){
    this.$parseData && this.$parseData(this.bdata)
  }
}
