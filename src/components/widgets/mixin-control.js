import { clone } from "@/util/util"
export default {
  props: ["bdata"],
  watch: {
    bdata: {
      deep: true,
      handler() {
        if(!this.$parseData){
          this.list = clone(this.bdata)
        }else{
          this.$parseData(clone(this.bdata))
        }
      }
    },
    props: {
      deep: true,
      handler() {
        debugger
        if(this.$reverseData){
          this.$emit("change", this.$reverseData(clone(this.props)))
        }else{
          this.$emit("change", clone(this.props))
        }
      }
    }
  },
  created(){
    this.$parseData && this.$parseData(this.bdata)
  }
}
