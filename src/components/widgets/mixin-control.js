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
        this.setProps()
      }
    },
    props: {
      deep: true,
      handler(newData, oldData) {
        this.$change && this.$change()
      }
    }
  },
  created() {
    this.setProps()
  },
  methods: {
    setProps(){
      if(this.$options.name == "control-action"){
        if(getObjectLength(this.bdata)){
          this.props = clone(this.bdata)
        }
      }else{
        this.props = clone(this.bdata)
      }
      this.$change && this.$change()
    },
    $send() {
      this.$emit("change", clone(this.props))
    }
  }
}
