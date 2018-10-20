export default (Component, datas) => {
  return {
    render: (createElement) => {
      debugger
      return createElement(Component, {
        props: {
          // dataChange: datas,
          ...datas.controls.props
        },
        style: datas.controls.style,
      })
    }
  }
}
