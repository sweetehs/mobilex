import layout from "./elements/layout"
import xtext from "./elements/xtext"
import xbutton from "./elements/xbutton"
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
  controls: {
    style: {
      "background-color": "#eee",
      "color": "red"
    }
  },
  component: xbutton
}]
