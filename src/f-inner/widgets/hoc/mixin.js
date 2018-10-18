export default {
  props: ["dataChange"],
  watch: {
    dataChange: {
      deep: true,
      handler(){
        this.$change && this.$change()
      }
    }
  }
}
