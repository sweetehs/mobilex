import layout from "./common/layout"
import xtext from "./common/xtext"
import xbutton from "./common/xbutton"
export default [{
  name: "布局",
  wid: "layout",
  component: layout
}, {
  name: "文字",
  wid: "xtext",
  component: xtext
}, {
  name: "按钮",
  wid: "xbutton",
  controls:{
    style: {
      "background-color": "#eee",
      "color": "red"
    }
  },
  component: xbutton
}]
