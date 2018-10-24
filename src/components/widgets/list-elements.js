import layout from "./elements/layout"
import xtext from "./elements/xtext"
import xbutton from "./elements/xbutton"
/*
  默认一定要写的属性
  style: {
    display: ""
  }
*/
export default [{
  name: "布局",
  wid: "layout",
  isWrapper: true,
  children: [],
  controls: {
    style: {
      "display": "block",
      "padding": "10px 10px 10px 10px",
    }
  },
  component: layout
}, {
  name: "文字",
  wid: "xtext",
  component: xtext,
  controls: {
    style: {
      "display": "block"
    }
  }
}, {
  name: "按钮",
  wid: "xbutton",
  controls: {
    style: {
      "display": "inline-block"
    }
  },
  component: xbutton
}]
