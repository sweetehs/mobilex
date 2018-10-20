export default (Component, datas) => {
  return {
    render: (createElement) => {
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
