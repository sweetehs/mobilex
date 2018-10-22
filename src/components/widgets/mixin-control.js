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
    list: {
      deep: true,
      handler() {
        if(this.$reverseData){
          this.$emit("change", this.$reverseData())
        }else{
          this.$emit("change", clone(this.list))
        }
      }
    }
  },
  created(){
    this.$parseData && this.$parseData(this.bdata)
  }
}
