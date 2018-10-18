import Vue from "vue"
export default (Component, datas) => {
  return {
    render: (h) => {
      return h(Component, {
        props: {
          dataChange: datas
        }
      })
    }
  }
}
