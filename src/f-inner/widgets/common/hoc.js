export default (Component, datas) => {
  return {
    render: (createElement) => {
      return createElement(Component, {
        props: {
          dataChange: datas
        },
        style: datas.controls.style
      })
    }
  }
}
